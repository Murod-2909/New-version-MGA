import React from "react";
import { useLocation } from "react-router-dom";
import "./contact.scss";
import PageHero from "../../components/pageHero";
import InquiryForm from "../../components/InquiryForm";
import contactImg from "../../assests/images/contact-page-shape-1.png";
import { useTranslation } from "react-i18next";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

// Single source for the numbers/links shown on this page (keep in sync with the
// LocalBusiness data in public/index.html and the header/footer).
const PHONE = { href: "tel:+998770124004", label: "+998 77 012 40 04" };
const EMAIL = "info@mgareklama.com";
const DIRECTIONS_URL =
  "https://yandex.com/maps/?pt=69.322203,41.303646&z=17&l=map";
const SOCIALS = [
  { href: "https://www.facebook.com/mgareklama/", label: "Facebook", Icon: FaFacebookF },
  { href: "https://www.instagram.com/mgareklama/", label: "Instagram", Icon: FaInstagram },
  { href: "https://www.youtube.com/@mgareklama", label: "YouTube", Icon: FaYoutube },
];

const Contact = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const title = t("contact");

  return (
    <div className="contact">
      <PageHero title={title} />
      <div className="contact-page">
        <div className="contact-page-shape-1 float-bob-x">
          <img src={contactImg} alt="" role="presentation" />
        </div>
        <div className="container">
          <div className="contact-row">
            <div className="col-xl-8">
              <div className="col-xl-8_cont-left">
                <div className="col-xl-8_cont-left_cont-title">
                  <span className="col-xl-8_cont-left_cont-title_taglines">
                    {t("contact")}
                  </span>
                  <h2 className="col-xl-8_cont-left_cont-title_heading">
                   {t("feel")}
                  </h2>
                  <div className="title-line"></div>
                </div>
                <div className="col-xl-8_cont-left_form">
                  <InquiryForm presetSubject={location.state?.subject || ""} />
                </div>
              </div>
            </div>

            {/* Right contact info */}
            <div className="col-xl-4">
              <div className="col-xl-4_cont-right">
                <address className="contact-info">
                  <ul className="contact-info__list">
                    <li>
                      <span className="contact-info__icon" aria-hidden="true">
                        <FaPhoneAlt />
                      </span>
                      <div>
                        <span className="contact-info__label">{t("call")}</span>
                        <a className="contact-info__value" href={PHONE.href}>
                          {PHONE.label}
                        </a>
                      </div>
                    </li>
                    <li>
                      <span className="contact-info__icon" aria-hidden="true">
                        <FaEnvelope />
                      </span>
                      <div>
                        <span className="contact-info__label">{t("send")}</span>
                        <a className="contact-info__value" href={`mailto:${EMAIL}`}>
                          {EMAIL}
                        </a>
                      </div>
                    </li>
                    <li>
                      <span className="contact-info__icon" aria-hidden="true">
                        <FaMapMarkerAlt />
                      </span>
                      <div>
                        <span className="contact-info__label">{t("contactPage.addressLabel")}</span>
                        <span className="contact-info__value">{t("address")}</span>
                      </div>
                    </li>
                  </ul>

                  <a
                    className="contact-info__directions"
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("contactPage.directions")}
                  </a>

                  <div className="contact-info__social">
                    <span className="contact-info__label">{t("contactPage.follow")}</span>
                    <div className="contact-info__social-links">
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
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="contact-map">
        <iframe
          className="contact-map-iframe"
          src="https://yandex.uz/map-widget/v1/?ll=69.322203%2C41.303646&mode=whatshere&whatshere%5Bpoint%5D=69.321825%2C41.303496&whatshere%5Bzoom%5D=16&z=17.2"
          width="100%"
          height="100%"
          title={t("contactPage.mapTitle")}
          loading="lazy"
          allowFullScreen
          style={{ position: "relative" }}
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
