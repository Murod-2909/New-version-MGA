// components/MobileMenu.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Link from "../../../LocaleLink";
import { stripLang } from "../../../../serves/locale";
import { RxCross2 } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
import serviceSlugs from "../../../../data/services-content";
import useProductionLinks from "../../../../hooks/useProductionLinks";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import "./style.scss";
import logo from "../../../../assests/images/Log.png";

const MobileMenu = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const productionLinks = useProductionLinks({ load: false }); // the header already loads the data
  const rawPath = stripLang(location.pathname);
  // Service and production detail pages belong to the "Services" item.
  const currentPath = /^\/(services|production)\//.test(rawPath) ? "/serves" : rawPath;

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
              { path: "/gallery", label: t("gallery") },
              { path: "/serves", label: t("serves") },
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
        </div>
      </CSSTransition>
    </>
  );
};

export default MobileMenu;
