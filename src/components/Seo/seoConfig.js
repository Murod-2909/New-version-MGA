// Maps a route path to the i18n key under "seo.<key>.title" / "seo.<key>.description".
// Used by RouteSeo so there is a single, persistent <Seo> instance for the whole app
// (react-helmet-async does not reliably update when a per-page <Seo> mounts/unmounts
// on every client-side route change inside a lazy/Suspense boundary).
const seoConfig = {
  "/": "home",
  "/about": "about",
  "/serves": "serves",
  "/gallery": "gallery",
  "/contact": "contact",
};

export default seoConfig;
