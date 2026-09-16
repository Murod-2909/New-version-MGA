import React from "react";
import "./contact.scss";
import PageHero from "../../components/pageHero";
import InquiryForm from "../../components/InquiryForm";
import contactImg from "../../assests/images/contact-page-shape-1.png";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const title = t("contact");

  return (
    <div className="contact">
      <PageHero title={title} />
      <div className="contact-page">
        <div className="contact-page-shape-1 float-bob-x">
          <img src={contactImg} alt="contact img" />
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
                  <InquiryForm />
                </div>
              </div>
            </div>

            {/* Right contact info */}
            <div className="col-xl-4">
              <div className="col-xl-4_cont-right">
                <div className="col-xl-4_cont-right_details">
                  <ul className="col-xl-4_cont-right_details_list">
                    <li>
                      <span>{t("call")}</span>
                      <p className="col-xl-4_cont-right_details_list_phone">
                        <a href="tel:+998770124004">+998 77 012 40 04</a>

                      </p>
                    </li>
                    <li>
                      <span>{t("send")}</span>
                      <p className="col-xl-4_cont-right_details_list_phone">
                        <a href="mailto:info@mgareklama.com">
                          info@mgareklama.com
                        </a>
                      </p>
                    </li>
                    <li>
                      <span>Uzbekistan</span>
                      <p className="col-xl-4_cont-right_details_list_phone">
                        {t("address")}
                      </p>
                    </li>
                  </ul>
                </div>
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
          title="Our location"
          allowFullScreen
          style={{ position: "relative" }}
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
