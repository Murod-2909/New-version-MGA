import React from "react";
import { useTranslation } from "react-i18next";
import Link from "../../LocaleLink";
import logo from "../../../assests/images/white-logo.png";
import serviceSlugs from "../../../data/services-content";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

// Keep the contact details in sync with the Contact page and the LocalBusiness data
// in public/index.html.
const PHONE = { href: "tel:+998770124004", label: "+998 77 012 40 04" };
const EMAIL = "info@mgareklama.com";
const SOCIALS = [
  { href: "https://www.youtube.com/@mgareklama", label: "YouTube", Icon: FaYoutube },
  { href: "https://www.facebook.com/mgareklama/", label: "Facebook", Icon: FaFacebookF },
  { href: "https://www.instagram.com/mgareklama/", label: "Instagram", Icon: FaInstagram },
];
const FOOTER_SERVICES = serviceSlugs.slice(0, 6);

const Footer = () => {
  const { t } = useTranslation();

  const menu = [
    { to: "/", label: t("main") },
    { to: "/about", label: t("about") },
    { to: "/serves", label: t("serves") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/gallery", label: t("gallery") },
    { to: "/contact", label: t("contact") },
  ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo">
              <img src={logo} alt="MGA Reklama logo" />
            </Link>
            <p className="site-footer__about">{t("footerText")}</p>
            <div className="site-footer__social">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav className="site-footer__col" aria-label={t("footMenu")}>
            <h2 className="site-footer__title">{t("footMenu")}</h2>
            <ul>
              {menu.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__col" aria-label={t("serves")}>
            <h2 className="site-footer__title">{t("serves")}</h2>
            <ul>
              {FOOTER_SERVICES.map((slug) => (
                <li key={slug}>
                  <Link to={`/services/${slug}`}>{t(`services.items.${slug}.h1`)}</Link>
                </li>
              ))}
              <li className="site-footer__all">
                <Link to="/serves">{t("services.menuAll")}</Link>
              </li>
            </ul>
          </nav>

          <div className="site-footer__col">
            <h2 className="site-footer__title">{t("contact")}</h2>
            <ul className="site-footer__contacts">
              <li>
                <span className="site-footer__icon" aria-hidden="true">
                  <FaPhoneAlt />
                </span>
                <div>
                  <span className="site-footer__label">{t("call")}</span>
                  <a href={PHONE.href}>{PHONE.label}</a>
                </div>
              </li>
              <li>
                <span className="site-footer__icon" aria-hidden="true">
                  <FaEnvelope />
                </span>
                <div>
                  <span className="site-footer__label">{t("send")}</span>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </li>
              <li>
                <span className="site-footer__icon" aria-hidden="true">
                  <FaMapMarkerAlt />
                </span>
                <div>
                  <span className="site-footer__label">{t("contactPage.addressLabel")}</span>
                  <span className="site-footer__value">{t("address")}</span>
                </div>
              </li>
              <li>
                <span className="site-footer__icon" aria-hidden="true">
                  <FaClock />
                </span>
                <div>
                  <span className="site-footer__label">{t("contactPage.hoursLabel")}</span>
                  <span className="site-footer__value">{t("contactPage.hoursValue")}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>
            © {new Date().getFullYear()} MGA Reklama. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
