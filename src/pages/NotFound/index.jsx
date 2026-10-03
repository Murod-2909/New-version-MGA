import React from "react";
import Link from "../../components/LocaleLink";
import { useTranslation } from "react-i18next";
import Seo from "../../components/Seo";
import { stripLang } from "../../serves/locale";
import "./notFound.scss";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <Seo title={`404 | MGA Reklama`} noindex path={typeof window !== "undefined" ? stripLang(window.location.pathname) : "/404"} />
      <div className="container not-found__inner">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__text">{t("notFoundText")}</p>
        <Link to="/" className="not-found__link">
          {t("notFoundBackHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
