// src/components/Language/Language.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import i18next from "i18next";
import { languageChange } from "../../reduxToolkit/languageSlice";
import "./style.scss";

const Language = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

    const handleChangeLanguage = (lang) => {
        if (lang === language) return;

        i18next.changeLanguage(lang)
            .then(() => {
                localStorage.setItem("language", lang); // 🔥 localStorage ga shu yerda yozamiz
                dispatch(languageChange(lang));
                window.location.reload(); // (Agar API tilga bog‘liq bo‘lsa, bu ham kerak bo'lishi mumkin)
            })
            .catch((err) => console.error("Language change error:", err));
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
