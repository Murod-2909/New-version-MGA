import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./about.scss";
import PageHero from "../../components/pageHero";
import Partner from "../../components/Partner";
import NewLetter from "../../components/newLetter";
import Pession from "../../components/Pession";
import YouTubeFacade from "../../components/YouTubeFacade";
import Link from "../../components/LocaleLink";
import { useTranslation } from "react-i18next";
import { FaPencilRuler, FaIndustry, FaTools, FaArrowRight } from "react-icons/fa";
import useAboutStats from "../../hooks/useAboutStats";
import { getProjects } from "../../reduxToolkit/projectsSlice";

const VIDEO_ID = "55_3tE4tNno";

const PHOTO_COUNT = 5;

const STEPS = [
  { Icon: FaPencilRuler, title: "aboutPage.stepDesign", text: "aboutPage.stepDesignText" },
  { Icon: FaIndustry, title: "aboutPage.stepMake", text: "aboutPage.stepMakeText" },
  { Icon: FaTools, title: "aboutPage.stepInstall", text: "aboutPage.stepInstallText" },
];

const About = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectsSlice?.list);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const stats = useAboutStats();

  // Real photos of finished work: the covers of the first projects, falling back to
  // the factory shot used on the home page.
  const photos = (Array.isArray(projects) ? projects : [])
    .map((project) => project.cover_thumbnail || project.cover)
    .filter(Boolean)
    .slice(0, PHOTO_COUNT);
  if (photos.length === 0) photos.push("/heroPoster.jpg");

  return (
    <div className="about-page">
      <PageHero title={t("about")} />
      <Pession variant="full" />

      <section className="about-stats">
        <div className="container">
          <ul className="about-stats__grid">
            {stats.map(({ value, label }) => (
              <li key={label} className="about-stats__item">
                <span className="about-stats__value">{value}</span>
                <span className="about-stats__label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-photos">
        <div className="container">
          <h2 className="about-section-title">{t("aboutPage.photosTitle")}</h2>
          <div className={`about-photos__grid about-photos__grid--${Math.min(photos.length, 5)}`}>
            {photos.map((src, index) => (
              <img
                key={`${src}-${index}`}
                src={src}
                alt={`${t("aboutPage.photosTitle")} ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <p className="about-photos__more">
            <Link to="/projects">
              {t("projects.listTitle")}
              <FaArrowRight aria-hidden="true" />
            </Link>
          </p>
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
