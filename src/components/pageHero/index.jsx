import React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import Link from "../LocaleLink";

const PageHero = ({ title, subtitle, breadcrumbLabel }) => {
   const { t } = useTranslation();
  return (
    <div className="page-header">
      <div className="page-hero"></div>
      <div className="container">
          <div className="page-header_innerHead">
              <ul className="bread-crumb">
                <li className="li-pull">
                  <Link to="/" className="breads">
                    {t("main")}
                  </Link>
                </li>
                <li>
                    <span>/</span>
                </li>
                <li className="li-pull">{breadcrumbLabel || title}</li>
              </ul>
              <h1 className="title-pages">{title}</h1>
              {subtitle && <p className="subtitle-pages">{subtitle}</p>}
          </div>
        </div>
    </div>
  );
};

export default PageHero;
