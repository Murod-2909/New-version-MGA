// components/MobileMenu.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Link from "../../../LocaleLink";
import { stripLang, withLang } from "../../../../serves/locale";
import { RxCross2 } from "react-icons/rx";
import { FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import serviceSlugs from "../../../../data/services-content";
import useProductionLinks from "../../../../hooks/useProductionLinks";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import Language from "../../../Language/language";
import "./style.scss";
import logo from "../../../../assests/images/Log.png";

const MobileMenu = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const productionLinks = useProductionLinks({ load: false }); // the header already loads the data
  const rawPath = stripLang(location.pathname);
  // Service and production detail pages belong to the "Services" item.
  const currentPath = /^\/(services|production)\//.test(rawPath)
    ? "/serves"
    : /^\/projects\//.test(rawPath)
    ? "/projects"
    : rawPath;

  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div
          className="mobile-menu-backdrop"
          onClick={() => onClose(false)}
        />
      </CSSTransition>

      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <div className="mobile-menu-sheet">
          <div className="mobile-menu-sheet__header">
            <img src={logo} alt="MGA Reklama logo" className="logo" />
            <button className="close-btn" onClick={() => onClose(false)}>
              <RxCross2 />
            </button>
          </div>
          <ul className="mobile-menu-sheet__nav">
            {[
              { path: "/", label: t("main") },
              { path: "/about", label: t("about") },
              { path: "/serves", label: t("serves") },
              { path: "/projects", label: t("nav.projects") },
              { path: "/contact", label: t("contact") },
            ].map(({ path, label }) => (
              <li
                key={path}
                className={currentPath === path ? "active" : ""}
              >
                {path === "/serves" ? (
                  <>
                    <div className="mobile-menu-sheet__row">
                      <Link to={path} onClick={() => onClose(false)}>
                        {label}
                      </Link>
                      <button
                        type="button"
                        className={`mobile-menu-sheet__toggle${servicesOpen ? " is-open" : ""}`}
                        onClick={() => setServicesOpen((open) => !open)}
                        aria-expanded={servicesOpen}
                        aria-label={label}
                      >
                        <FaChevronDown aria-hidden="true" />
                      </button>
                    </div>
                    {servicesOpen && (
                      <div className="mobile-menu-sheet__sub">
                        {serviceSlugs.map((slug) => (
                          <Link
                            key={slug}
                            to={`/services/${slug}`}
                            onClick={() => onClose(false)}
                          >
                            {t(`services.items.${slug}.h1`)}
                          </Link>
                        ))}
                        {productionLinks.length > 0 && (
                          <>
                            <p className="mobile-menu-sheet__sub-heading">
                              {t("services.productionTitle")}
                            </p>
                            {productionLinks.map(({ slug, title }) => (
                              <Link
                                key={slug}
                                to={`/production/${slug}`}
                                onClick={() => onClose(false)}
                              >
                                {title}
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                    <hr />
                  </>
                ) : (
                  <Link to={path} onClick={() => onClose(false)}>
                    {label}
                    <hr />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mobile-menu-sheet__actions">
            <Link to="/contact" className="mobile-menu-sheet__cta" onClick={() => onClose(false)}>
              {t("services.requestQuote")}
            </Link>
            <a className="mobile-menu-sheet__phone" href="tel:+998770124004">
              <FaPhoneAlt aria-hidden="true" />
              +998 77 012 40 04
            </a>
            <a
              className="mobile-menu-sheet__catalog"
              href={withLang("/catalogBook", i18n.language)}
              target="_blank"
              rel="noopener noreferrer"
            >
              E-Catalog
            </a>
            <div className="mobile-menu-sheet__lang">
              <Language />
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default MobileMenu;
