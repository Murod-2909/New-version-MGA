// Language lives in the URL: English is the default and has no prefix
// (/about), Russian and Uzbek are prefixed (/ru/about, /uz/about). This keeps the
// existing English URLs unchanged and gives every language its own indexable URL.
export const LANGS = ["en", "ru", "uz"];
export const DEFAULT_LANG = "en";

const PREFIXED = LANGS.filter((l) => l !== DEFAULT_LANG);

// "/ru/about" -> "ru", "/about" -> null
export const langFromPath = (pathname = "") => {
  const first = pathname.split("/")[1];
  return PREFIXED.includes(first) ? first : null;
};

// "/ru/about" -> "/about", "/ru" -> "/", "/about" -> "/about"
export const stripLang = (pathname = "/") => {
  const lang = langFromPath(pathname);
  if (!lang) return pathname || "/";
  return pathname.slice(lang.length + 1) || "/";
};

// ("/about", "ru") -> "/ru/about", ("/", "uz") -> "/uz", ("/about", "en") -> "/about"
export const withLang = (path = "/", lang = DEFAULT_LANG) => {
  if (!PREFIXED.includes(lang)) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
};

let initialLanguage;

// Decides the language once at startup. The URL wins; an unprefixed URL is English,
// except that a visitor who earlier picked ru/uz is sent to the matching prefixed
// URL. The result is mirrored into localStorage because the API thunks read it there.
export const resolveInitialLanguage = () => {
  if (initialLanguage) return initialLanguage;
  if (typeof window === "undefined") return DEFAULT_LANG;

  const { pathname, search, hash } = window.location;
  let stored = null;
  try {
    stored = localStorage.getItem("language");
  } catch (e) {
    /* storage unavailable */
  }

  let lang = langFromPath(pathname);
  if (!lang) {
    lang = DEFAULT_LANG;
    if (PREFIXED.includes(stored)) {
      window.location.replace(withLang(pathname, stored) + search + hash);
      lang = stored;
    }
  }

  try {
    localStorage.setItem("language", lang);
  } catch (e) {
    /* storage unavailable */
  }
  initialLanguage = lang;
  return lang;
};
