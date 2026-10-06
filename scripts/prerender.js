// Pre-renders every URL in build/sitemap.xml into static HTML (see "postbuild" in
// package.json) so crawlers that don't run JavaScript (Yandex, Telegram/WhatsApp
// link previews) get the real <title>, meta tags and page content.
//
// Output: build/<route>/index.html for each route; build/index.html becomes the
// pre-rendered home page and the untouched SPA shell is kept as build/app-shell.html
// (use it as the 404/fallback document on the host). The browser still renders the
// app client-side on top of this HTML, so behaviour for visitors is unchanged.
//
// This step never fails the build: on any problem it logs a warning and leaves the
// plain CRA output in place. Set SKIP_PRERENDER=1 to skip it.
const fs = require("fs");
const http = require("http");
const path = require("path");

const BUILD = path.join(__dirname, "..", "build");
const SHELL = path.join(BUILD, "app-shell.html");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
};

// Serves build/ and falls back to the SPA shell for unknown paths.
const serve = () =>
  new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      let file = path.join(BUILD, urlPath);
      if (!file.startsWith(BUILD) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        file = SHELL;
      }
      res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });

const routesFromSitemap = () => {
  const xml = fs.readFileSync(path.join(BUILD, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
};

const outputFile = (route) =>
  route === "/"
    ? path.join(BUILD, "index.html")
    : path.join(BUILD, decodeURIComponent(route), "index.html");

const renderRoute = async (browser, origin, route) => {
  // A fresh context per page: otherwise localStorage (the saved language) leaks from
  // /ru or /uz pages into the English ones and they get redirected/rendered wrongly.
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  try {
    await page.setViewport({ width: 1280, height: 900 });
    // Lets the app know it is being snapshotted (e.g. the hero shows its poster, not the video).
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });
    await page.setRequestInterception(true);
    // The hero video would keep the network "busy" forever and isn't needed in HTML.
    page.on("request", (req) => (req.resourceType() === "media" ? req.abort() : req.continue()));
    await page.goto(origin + route, { waitUntil: "networkidle0", timeout: 45000 });
    await page.waitForFunction(
      () => document.title && document.title !== "MGAREKLAMA" && !document.querySelector(".loading-page"),
      { timeout: 15000 }
    );
    const failed = await page.evaluate(() => !!document.querySelector(".projects-page__state"));
    if (failed) return { route, skipped: "page shows empty/error state" };

    // Sanity check: the rendered language and canonical must match the URL we asked for.
    const expectedLang = (route.match(/^\/(ru|uz)(\/|$)/) || [])[1] || "en";
    const { lang, canonical } = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
    }));
    if (lang !== expectedLang || !canonical.endsWith(route === "/" ? "mgareklama.com/" : route)) {
      return { route, skipped: `rendered as lang=${lang}, canonical=${canonical}` };
    }
    const html = "<!DOCTYPE html>" + (await page.evaluate(() => document.documentElement.outerHTML));
    const file = outputFile(route);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
    return { route };
  } catch (error) {
    return { route, skipped: error.message.split("\n")[0] };
  } finally {
    await page.close();
    await context.close();
  }
};

(async () => {
  if (process.env.SKIP_PRERENDER) return console.log("[prerender] Skipped (SKIP_PRERENDER).");
  let server;
  let browser;
  try {
    const puppeteer = require("puppeteer");
    if (!fs.existsSync(path.join(BUILD, "index.html"))) throw new Error("build/ not found");
    fs.copyFileSync(path.join(BUILD, "index.html"), SHELL);

    server = await serve();
    const origin = `http://127.0.0.1:${server.address().port}`;
    browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });

    // Render home last: build/index.html is the shell the server falls back to.
    const routes = routesFromSitemap().sort((a, b) => (a === "/") - (b === "/"));
    const results = [];
    for (const route of routes) results.push(await renderRoute(browser, origin, route));

    const done = results.filter((r) => !r.skipped).length;
    console.log(`[prerender] Rendered ${done}/${results.length} pages.`);
    results.filter((r) => r.skipped).forEach((r) => console.warn(`[prerender] Skipped ${r.route}: ${r.skipped}`));
  } catch (error) {
    console.warn(`[prerender] Skipped, build left as plain CRA output: ${error.message}`);
  } finally {
    if (browser) await browser.close();
    if (server) server.close();
  }
})();
