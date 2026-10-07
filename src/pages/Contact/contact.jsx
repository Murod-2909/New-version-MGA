import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./contact.scss";
import PageHero from "../../components/pageHero";
import InquiryForm from "../../components/InquiryForm";
import { useTranslation } from "react-i18next";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

// Single source for the numbers/links shown on this page (keep in sync with the
// LocalBusiness data in public/index.html and the header/footer).
const PHONE = { href: "tel:+998770124004", label: "+998 77 012 40 04" };
const EMAIL = "info@mgareklama.com";
const DIRECTIONS_URL = "https://yandex.com/maps/?pt=69.322203,41.303646&z=17&l=map";
const MAP_URL =
  "https://yandex.uz/map-widget/v1/?ll=69.322203%2C41.303646&mode=whatshere&whatshere%5Bpoint%5D=69.321825%2C41.303496&whatshere%5Bzoom%5D=16&z=17.2";
const SOCIALS = [
  { href: "https://www.facebook.com/mgareklama/", label: "Facebook", Icon: FaFacebookF },
  { href: "https://www.instagram.com/mgareklama/", label: "Instagram", Icon: FaInstagram },
  { href: "https://www.youtube.com/@mgareklama", label: "YouTube", Icon: FaYoutube },
];
const TIPS = ["contactPage.tip1", "contactPage.tip2", "contactPage.tip3"];

const Contact = () => {
  const { t } = useTranslation();
  const location = useLocation();
  // The Yandex widget sets third-party cookies and weighs ~1 MB, so it only loads on request.
  const [mapOn, setMapOn] = useState(false);

  return (
    <div className="contact">
      <PageHero title={t("contact")} />

      {/* Three ways to reach us, scannable at a glance */}
      <section className="contact-quick">
        <div className="container">
          <div className="contact-quick__grid">
            <a className="contact-quick__card" href={PHONE.href}>
              <span className="contact-quick__icon" aria-hidden="true">
                <FaPhoneAlt />
              </span>
              <span className="contact-quick__label">{t("call")}</span>
              <span className="contact-quick__value">{PHONE.label}</span>
              <span className="contact-quick__more">
                {t("contactPage.callNow")}
                <FaArrowRight aria-hidden="true" />
              </span>
            </a>
            <a className="contact-quick__card" href={`mailto:${EMAIL}`}>
              <span className="contact-quick__icon" aria-hidden="true">
                <FaEnvelope />
              </span>
              <span className="contact-quick__label">{t("send")}</span>
              <span className="contact-quick__value">{EMAIL}</span>
              <span className="contact-quick__more">
                {t("contactPage.writeUs")}
                <FaArrowRight aria-hidden="true" />
              </span>
            </a>
            <a
              className="contact-quick__card"
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-quick__icon" aria-hidden="true">
                <FaMapMarkerAlt />
              </span>
              <span className="contact-quick__label">{t("contactPage.addressLabel")}</span>
              <span className="contact-quick__value">{t("address")}</span>
              <span className="contact-quick__more">
                {t("contactPage.directions")}
                <FaArrowRight aria-hidden="true" />
              </span>
            </a>
            <div className="contact-quick__card contact-quick__card--static">
              <span className="contact-quick__icon" aria-hidden="true">
                <FaClock />
              </span>
              <span className="contact-quick__label">{t("contactPage.hoursLabel")}</span>
              <span className="contact-quick__value">{t("contactPage.hoursValue")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-main__grid">
            <div className="contact-form-card">
              <span className="contact-form-card__tag">{t("contact")}</span>
              <h2 className="contact-form-card__title">{t("feel")}</h2>
              <p className="contact-form-card__intro">{t("contactPage.intro")}</p>
              <InquiryForm presetSubject={location.state?.subject || ""} />
            </div>

            <aside className="contact-side">
              <div className="contact-tips">
                <h3 className="contact-tips__title" aria-level={2}>{t("contactPage.tipsTitle")}</h3>
                <ul>
                  {TIPS.map((key) => (
                    <li key={key}>
                      <FaCheckCircle aria-hidden="true" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-map">
                {mapOn ? (
                  <iframe
                    className="contact-map-iframe"
                    src={MAP_URL}
                    width="100%"
                    height="100%"
                    title={t("contactPage.mapTitle")}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <button
                    type="button"
                    className="contact-map__facade"
                    onClick={() => setMapOn(true)}
                  >
                    <FaMapMarkerAlt aria-hidden="true" />
                    <span className="contact-map__facade-title">{t("contactPage.showMap")}</span>
                    <span className="contact-map__facade-address">{t("address")}</span>
                  </button>
                )}
              </div>

              <div className="contact-social">
                <span className="contact-social__label">{t("contactPage.follow")}</span>
                <div className="contact-social__links">
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
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
