import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANGS, DEFAULT_LANG, withLang } from "../../serves/locale";

const SITE_URL = "https://mgareklama.com";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;
const OG_LOCALES = { en: "en_US", ru: "ru_RU", uz: "uz_UZ" };

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// One <link rel="alternate" hreflang> per language (plus x-default) so search
// engines serve each language version to the right audience. `urls` maps
// hreflang -> absolute URL; passing null removes them (e.g. on error pages).
function syncAlternates(urls) {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());
  if (!urls) return;
  Object.entries(urls).forEach(([hreflang, href]) => {
    const el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    el.setAttribute("href", href);
    document.head.appendChild(el);
  });
}

// Updates document.title and <head> meta tags directly on every render.
// Deliberately does NOT use react-helmet-async: that library fails to
// re-apply tags reliably across repeated client-side route changes with
// React 18 (verified while building this) — a plain useEffect here is a
// few lines and behaves correctly every time.
const Seo = ({ title, description, path = "/", image = DEFAULT_IMAGE, noindex = false }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const url = `${SITE_URL}${withLang(path, i18n.language)}`;

    if (title) document.title = title;
    document.documentElement.lang = i18n.language;

    upsertMeta("name", "description", description);
    upsertCanonical(url);
    syncAlternates(
      noindex
        ? null
        : {
            ...Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}${withLang(path, l)}`])),
            "x-default": `${SITE_URL}${withLang(path, DEFAULT_LANG)}`,
          }
    );
    // Error / not-found pages must not be indexed (the host answers them with 200).
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:locale", OG_LOCALES[i18n.language] || i18n.language);

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
  }, [title, description, path, image, noindex, i18n.language]);

  return null;
};

export default Seo;
