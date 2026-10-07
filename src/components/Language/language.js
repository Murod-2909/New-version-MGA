import React from "react";
import { useSelector } from "react-redux";
import { stripLang, withLang } from "../../serves/locale";
import "./style.scss";

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "uz", label: "UZ", name: "O'zbekcha" },
];

const Language = () => {
  const language = useSelector((state) => state.language.language);

  // The language is part of the URL, so switching means loading the same page
  // under the other prefix (/about -> /ru/about). A full load also refreshes the
  // API data that depends on the language.
  const handleChangeLanguage = (lang) => {
    if (lang === language) return;
    localStorage.setItem("language", lang);
    const { pathname, search, hash } = window.location;
    window.location.assign(withLang(stripLang(pathname), lang) + search + hash);
  };

  return (
    <div className="lang-simple" role="group" aria-label="Language">
      {LANGUAGES.map(({ code, label, name }, index) => (
        <React.Fragment key={code}>
          {index > 0 && (
            <span className="divider" aria-hidden="true">
              |
            </span>
          )}
          <button
            type="button"
            className={`lang-item ${language === code ? "active" : ""}`}
            onClick={() => handleChangeLanguage(code)}
            aria-pressed={language === code}
            lang={code}
            title={name}
          >
            {label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Language;
