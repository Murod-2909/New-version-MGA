import React from "react";
import "./about.scss";
import PageHero from "../../components/pageHero";
import Partner from "../../components/Partner";
import NewLetter from "../../components/newLetter";
import Pession from "../../components/Pession";
import YouTubeFacade from "../../components/YouTubeFacade";
import Link from "../../components/LocaleLink";
import { useTranslation } from "react-i18next";
import { FaPencilRuler, FaIndustry, FaTools, FaArrowRight } from "react-icons/fa";

const VIDEO_ID = "55_3tE4tNno";

// Only facts stated on the site: advertising since 2010, Tashkent factory opened in
// 2022, 2,000 m² production area.
const STATS = [
  { value: "aboutPage.statSinceValue", label: "aboutPage.statSince" },
  { value: "aboutPage.statFactoryValue", label: "aboutPage.statFactory" },
  { value: "aboutPage.statAreaValue", label: "aboutPage.statArea" },
];

const STEPS = [
  { Icon: FaPencilRuler, title: "aboutPage.stepDesign", text: "aboutPage.stepDesignText" },
  { Icon: FaIndustry, title: "aboutPage.stepMake", text: "aboutPage.stepMakeText" },
  { Icon: FaTools, title: "aboutPage.stepInstall", text: "aboutPage.stepInstallText" },
];

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <PageHero title={t("about")} />
      <Pession variant="full" />

      <section className="about-stats">
        <div className="container">
          <ul className="about-stats__grid">
            {STATS.map(({ value, label }) => (
              <li key={label} className="about-stats__item">
                <span className="about-stats__value">{t(value)}</span>
                <span className="about-stats__label">{t(label)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-process">
        <div className="container">
          <h2 className="about-section-title">{t("aboutPage.processTitle")}</h2>
          <ol className="about-process__grid">
            {STEPS.map(({ Icon, title, text }, index) => (
              <li key={title} className="about-process__step">
                <span className="about-process__num" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="about-process__icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="about-process__title">{t(title)}</h3>
                <p className="about-process__text">{t(text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-video">
        <div className="container">
          <h2 className="about-section-title">{t("aboutPage.videoTitle")}</h2>
          <YouTubeFacade videoId={VIDEO_ID} title={t("aboutPage.videoTitle")} />
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="about-cta__card">
            <div>
              <h2 className="about-cta__title">{t("aboutPage.ctaTitle")}</h2>
              <p className="about-cta__text">{t("aboutPage.ctaText")}</p>
            </div>
            <div className="about-cta__actions">
              <Link to="/contact" className="about-cta__btn about-cta__btn--primary">
                {t("services.requestQuote")}
                <FaArrowRight aria-hidden="true" />
              </Link>
              <Link to="/projects" className="about-cta__btn about-cta__btn--ghost">
                {t("projects.listTitle")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Partner />
      <NewLetter />
    </div>
  );
};

export default About;
