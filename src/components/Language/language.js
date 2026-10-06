// src/components/Language/Language.jsx
import React from "react";
import { useSelector } from "react-redux";
import { stripLang, withLang } from "../../serves/locale";
import "./style.scss";

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
    <div className="lang-simple">
      <span
        className={`lang-item ${language === "en" ? "active" : ""}`}
        onClick={() => handleChangeLanguage("en")}
      >
        EN
      </span>
      <span className="divider">|</span>
      <span
        className={`lang-item ${language === "ru" ? "active" : ""}`}
        onClick={() => handleChangeLanguage("ru")}
      >
        RU
      </span>
      <span className="divider">|</span>
      <span
        className={`lang-item ${language === "uz" ? "active" : ""}`}
        onClick={() => handleChangeLanguage("uz")}
      >
        UZ
      </span>
    </div>
  );
};

export default Language;
