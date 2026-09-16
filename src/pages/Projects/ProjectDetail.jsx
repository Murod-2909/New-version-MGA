import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import PageHero from "../../components/pageHero";
import InquiryForm from "../../components/InquiryForm";
import NewLetter from "../../components/newLetter";
import Seo from "../../components/Seo";
import ModalCarousel from "../Gallery/ModalImg/modalImg";
import projects from "../../data/projects";
import "./projects.scss";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="projects-page">
        <Seo title="MGA Reklama" path={`/projects/${slug}`} />
        <PageHero title={t("projects.listTitle")} />
        <div className="container projects-page__notfound">
          <p>
            <Link to="/projects">{t("projects.listTitle")}</Link>
          </p>
        </div>
      </div>
    );
  }

  const base = `projects.items.${slug}`;
  const name = t(`${base}.name`);
  const location = t(`${base}.location`);
  const workDone = t(`${base}.workDone`);

  return (
    <div className="projects-page">
      <Seo title={`${name} | MGA Reklama`} description={workDone} path={`/projects/${slug}`} />
      <PageHero title={name} subtitle={location} />

      <section className="projects-page__detail">
        <div className="container">
          <div className="projects-page__row">
            <div className="projects-page__content">
              <div className="projects-page__block">
                <h3>{t("projects.workDoneLabel")}</h3>
                <p>{workDone}</p>
              </div>

              <div className="projects-page__block">
                <h3>{t("services.materialsLabel")}</h3>
                <p>{t(`${base}.materials`)}</p>
              </div>

              {project.photos?.length > 0 && (
                <button
                  type="button"
                  className="projects-page__gallery-btn"
                  onClick={() => setShowModal(true)}
                >
                  <FaPlus /> {t("projects.viewPhotos")}
                </button>
              )}
            </div>

            <div className="projects-page__form">
              <h3>{t("services.requestQuote")}</h3>
              <InquiryForm presetSubject={name} />
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <ModalCarousel
          onClose={() => setShowModal(false)}
          galleryImages={project.photos.map((src) => ({ image: src }))}
        />
      )}

      <NewLetter />
    </div>
  );
};

export default ProjectDetail;
