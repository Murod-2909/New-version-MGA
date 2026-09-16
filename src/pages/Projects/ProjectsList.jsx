import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/pageHero";
import NewLetter from "../../components/newLetter";
import Seo from "../../components/Seo";
import projects from "../../data/projects";
import "./projects.scss";

const ProjectsList = () => {
  const { t } = useTranslation();

  return (
    <div className="projects-page">
      <Seo
        title={`${t("projects.listTitle")} | MGA Reklama`}
        description={t("projects.listIntro")}
        path="/projects"
      />
      <PageHero title={t("projects.listTitle")} subtitle={t("projects.listIntro")} />

      <section className="projects-page__grid">
        <div className="container">
          <div className="projects-page__cards">
            {projects.map((project) => (
              <Link
                to={`/projects/${project.slug}`}
                className="projects-page__card"
                key={project.slug}
              >
                <h3>{t(`projects.items.${project.slug}.name`)}</h3>
                <p>{t(`projects.items.${project.slug}.location`)}</p>
              </Link>
            ))}
          </div>

          <p className="projects-page__gallery-link">
            <Link to="/gallery">{t("projects.backToGallery")}</Link>
          </p>
        </div>
      </section>

      <NewLetter />
    </div>
  );
};

export default ProjectsList;
