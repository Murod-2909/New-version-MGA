import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Link from "../../components/LocaleLink";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaCalendarAlt, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import PageHero from "../../components/pageHero";
import InquiryForm from "../../components/InquiryForm";
import NewLetter from "../../components/newLetter";
import Seo from "../../components/Seo";
import Spinner from "../../components/Spinner";
import WorksSlider from "../../components/WorksSlider";
import ProjectCard from "../../components/ProjectCard";
import { getProject, getProjects } from "../../reduxToolkit/projectsSlice";
import { categoryLabel } from "./categories";
import "../ServicePage/servicePage.scss";
import "./projects.scss";

const RELATED_COUNT = 3;
const SEO_DESCRIPTION_LIMIT = 160;

const ProjectDetail = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { current, currentLoading, currentNotFound, currentError, list } = useSelector(
    (state) => state.projectsSlice
  );

  useEffect(() => {
    dispatch(getProject(slug));
    dispatch(getProjects());
  }, [dispatch, slug]);

  if (currentLoading) return <Spinner />;

  if (!current) {
    return (
      <div className="service-page">
        <Seo title="MGA Reklama" path={`/projects/${slug}`} noindex />
        <PageHero title={t("projects.listTitle")} />
        <div className="container service-page__notfound">
          <p>{currentError && !currentNotFound ? t("projects.error") : t("notFoundText")}</p>
          <p>
            <Link to="/projects">{t("projects.listTitle")}</Link>
          </p>
        </div>
      </div>
    );
  }

  const project = current;
  const category = categoryLabel(t, i18n, project.category);
  const description = project.description?.trim() || "";
  const flatDescription = description.replace(/\s+/g, " ");
  const seoDescription =
    flatDescription.length > SEO_DESCRIPTION_LIMIT
      ? `${flatDescription.slice(0, SEO_DESCRIPTION_LIMIT - 1).trimEnd()}…`
      : flatDescription;
  const related = list
    .filter((p) => (p.slug ?? p.id) !== (project.slug ?? slug))
    .slice(0, RELATED_COUNT);

  return (
    <div className="service-page project-detail">
      <Seo
        title={`${project.title} | MGA Reklama`}
        description={seoDescription || undefined}
        path={`/projects/${slug}`}
        image={project.cover || undefined}
      />
      <PageHero title={project.title} subtitle={project.location} />

      <section className="service-page__body">
        <div className="container">
          <div className="service-page__row">
            <div className="service-page__content">
              {project.cover && (
                <img
                  src={project.cover}
                  alt={project.title}
                  className="project-detail__cover"
                  decoding="async"
                />
              )}

              <ul className="project-detail__facts">
                {category && (
                  <li>
                    <FaTag aria-hidden="true" />
                    {category}
                  </li>
                )}
                {project.location && (
                  <li>
                    <FaMapMarkerAlt aria-hidden="true" />
                    {project.location}
                  </li>
                )}
                {project.year && (
                  <li>
                    <FaCalendarAlt aria-hidden="true" />
                    {project.year}
                  </li>
                )}
              </ul>

              {description && (
                <div className="service-page__block">
                  <h3>{t("projects.workDoneLabel")}</h3>
                  <p className="project-detail__text">{description}</p>
                </div>
              )}

              {project.materials?.trim() && (
                <div className="service-page__block">
                  <h3>{t("services.materialsLabel")}</h3>
                  <p className="project-detail__text">{project.materials}</p>
                </div>
              )}
            </div>

            <div className="service-page__form">
              <h3>{t("projects.requestSimilar")}</h3>
              <InquiryForm presetSubject={project.title} />
            </div>
          </div>

          <WorksSlider
            works={project.photos}
            title={project.title}
            heading={t("projects.photosTitle")}
            subheading={t("projects.photosSubtitle")}
          />

          {related.length > 0 && (
            <div className="project-detail__related">
              <h3>{t("projects.relatedTitle")}</h3>
              <div className="projects-page__grid">
                {related.map((p) => (
                  <ProjectCard key={p.slug ?? p.id} project={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <NewLetter />
    </div>
  );
};

export default ProjectDetail;
