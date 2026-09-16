import React, { useEffect } from "react";
import "./pession.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

export default function Pession({ headingLevel = "h2" }) {
  const { t } = useTranslation();
  const Heading = headingLevel;

  useEffect(() => {
    AOS.init({
      duration: 1000, // animatsiya davomiyligi (ms)
      once: true, // faqat bir marta animatsiya bajariladi
      offset: 120,
    });
  }, []);
  return (
    <div className="pession">
      <div className="container">
        <div className="pession_rows">
          <div className="pession_rows_lefts">
            <div className="col-2">
              <div
                className="m"
                data-aos="fade-right"
                data-aos-delay="100"
                data-aos-duration="1000"
              ></div>
            </div>
            <div className="col-2">
              <div
                className="g"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="1000"
              ></div>
            </div>
            <div className="col-2">
              <div
                className="a"
                data-aos="fade-left"
                data-aos-delay="500"
                data-aos-duration="1000"
              ></div>
            </div>
          </div>
          <div className="pession_rows_rights">
            <section className="aboutCompany" data-aos="zoom-in">
              <div className="aboutCompany__content" data-aos="fade-up">
                <Heading className="aboutCompany__title">
                  {t("aboutUs")}
                </Heading>

                  <p  className="text-base leading-7 text-gray-700">
                    {t("desAbout")}
                  </p>

              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
