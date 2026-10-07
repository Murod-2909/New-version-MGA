import React, { useEffect } from "react";
import "./pession.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";
import Link from "../LocaleLink";

// variant "full" (About page) shows the story as three short paragraphs; the default
// (home page) keeps the compact single text.
export default function Pession({ headingLevel = "h2", variant = "compact" }) {
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

                <span className="aboutCompany__bar" aria-hidden="true"></span>
                {(variant === "full" ? ["p1", "p2", "p3"] : ["p1", "p2"]).map((key) => (
                  <p key={key} className="aboutCompany__p">
                    {t(`aboutPage.${key}`)}
                  </p>
                ))}

                {variant !== "full" && (
                  <>
                    <ul className="aboutCompany__chips">
                      {["chipSince", "chipFactory", "chipCycle"].map((key) => (
                        <li key={key}>{t(`aboutPage.${key}`)}</li>
                      ))}
                    </ul>
                    <Link to="/about" className="aboutCompany__more">
                      {t("aboutPage.more")}
                      <FaArrowRight aria-hidden="true" />
                    </Link>
                  </>
                )}

              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
