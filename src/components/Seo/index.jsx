import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SITE_URL = "https://mgareklama.com";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

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

// Updates document.title and <head> meta tags directly on every render.
// Deliberately does NOT use react-helmet-async: that library fails to
// re-apply tags reliably across repeated client-side route changes with
// React 18 (verified while building this) — a plain useEffect here is a
// few lines and behaves correctly every time.
const Seo = ({ title, description, path = "/", image = DEFAULT_IMAGE }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    if (title) document.title = title;
    document.documentElement.lang = i18n.language;

    upsertMeta("name", "description", description);
    upsertCanonical(url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:locale", i18n.language);

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
  }, [title, description, path, image, i18n.language]);

  return null;
};

export default Seo;
