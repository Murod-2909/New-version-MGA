import React, { useEffect, useState } from "react";
import { FaChevronDown, FaPhoneAlt, FaBookOpen } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Link from "../../LocaleLink";
import { stripLang, withLang } from "../../../serves/locale";
import serviceSlugs from "../../../data/services-content";
import useProductionLinks from "../../../hooks/useProductionLinks";
import logo from "../../../assests/images/white-logo.png";
import Language from "../../Language/language";
import MobileMenu from "./mobile/MobileMenu";
import "./ServicesMenu.scss";
import "../../../assests/style/header.scss";

const PHONE = { href: "tel:+998770124004", label: "+998 77 012 40 04" };

// One slim, sticky bar: logo, menu, and the two things a visitor most often wants
// (call us / request a quote). Contact details and social links live in the footer
// and on the Contact page instead of a second header row.
const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const productionLinks = useProductionLinks();
  const rawPath = stripLang(location.pathname);
  // Service and production detail pages belong to the "Services" menu item.
  const currentPath = /^\/(services|production)\//.test(rawPath)
    ? "/serves"
    : /^\/projects\//.test(rawPath)
    ? "/projects"
    : rawPath;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = (to, label) => (
    <li className={currentPath === to ? "current" : ""}>
      <Link to={to} className="current_items" aria-current={currentPath === to ? "page" : undefined}>
        {label}
      </Link>
    </li>
  );

  return (
    <>
      <header className={`main_header${isScrolled ? " is-scrolled" : ""}`}>
        <div className="container main_header__bar">
          <Link to="/" className="main_header__logo">
            <img src={logo} alt="MGA Reklama" width="132" height="61" />
          </Link>

          <nav className="main_header__nav" aria-label="Main">
            <ul>
              {item("/", t("main"))}
              {item("/about", t("about"))}
              {item("/gallery", t("gallery"))}

              <li className={`has-dropdown${currentPath === "/serves" ? " current" : ""}`}>
                <Link
                  to="/serves"
                  className="current_items"
                  aria-current={currentPath === "/serves" ? "page" : undefined}
                >
                  {t("serves")}
                  <FaChevronDown className="has-dropdown__caret" aria-hidden="true" />
                </Link>
                <div className="nav-dropdown">
                  <div className="nav-dropdown__col">
                    <p className="nav-dropdown__heading">{t("services.sectionTitle")}</p>
                    {serviceSlugs.map((slug) => (
                      <Link
                        key={slug}
                        to={`/services/${slug}`}
                        className={rawPath === `/services/${slug}` ? "is-active" : undefined}
                      >
                        {t(`services.items.${slug}.h1`)}
                      </Link>
                    ))}
                  </div>
                  {productionLinks.length > 0 && (
                    <div className="nav-dropdown__col">
                      <p className="nav-dropdown__heading">{t("services.productionTitle")}</p>
                      {productionLinks.map(({ slug, title }) => (
                        <Link
                          key={slug}
                          to={`/production/${slug}`}
                          className={rawPath === `/production/${slug}` ? "is-active" : undefined}
                        >
                          {title}
                        </Link>
                      ))}
                    </div>
                  )}
                  <div className="nav-dropdown__all">
                    <Link to="/serves">{t("services.menuAll")}</Link>
                  </div>
                </div>
              </li>

              {item("/projects", t("nav.projects"))}
              {item("/contact", t("contact"))}
            </ul>
          </nav>

          <div className="main_header__right">
            <a className="main_header__phone" href={PHONE.href}>
              <FaPhoneAlt aria-hidden="true" />
              <span className="main_header__phone-text">{PHONE.label}</span>
              <span className="sr-only">{t("call")}</span>
            </a>
            <div className="main_header__lang">
              <Language />
            </div>
            <a
              className="main_header__catalog"
              href={withLang("/catalogBook", i18n.language)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaBookOpen aria-hidden="true" />
              E-Catalog
            </a>
            <Link to="/contact" className="main_header__cta">
              {t("services.requestQuote")}
            </Link>
            <button
              type="button"
              className="main_header__burger"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <RxHamburgerMenu />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
