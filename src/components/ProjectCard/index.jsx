import React, { useEffect, useRef, useState } from "react";
import Link from "../LocaleLink";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { categoryLabel } from "../../pages/Projects/categories";
import "./style.scss";

export const ProjectCardSkeleton = () => (
  <div className="project-card project-card--skeleton" aria-hidden="true">
    <div className="project-card__media" />
    <div className="project-card__body">
      <span className="project-card__bar" />
      <span className="project-card__bar project-card__bar--short" />
    </div>
  </div>
);

const ProjectCard = ({ project }) => {
  const { t, i18n } = useTranslation();
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const cover = project.cover_thumbnail || project.cover;
  const category = categoryLabel(t, i18n, project.category);
  const meta = [project.location, project.year].filter(Boolean).join(" · ");

  // A cached image can finish loading before React attaches onLoad.
  useEffect(() => {
    const img = imgRef.current;
    if (!img || (img.complete && img.naturalWidth > 0)) setLoaded(true);
  }, []);

  return (
    <Link to={`/projects/${project.slug ?? project.id}`} className="project-card">
      <div className={`project-card__media${loaded ? " is-loaded" : ""}`}>
        {cover && (
          <img
            ref={imgRef}
            src={cover}
            alt={project.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
          />
        )}
        {category && <span className="project-card__chip">{category}</span>}
        {project.has_video && (
          <span className="project-card__video">
            <FaPlay aria-hidden="true" />
            {t("galleryPage.video")}
          </span>
        )}
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        {meta && <p className="project-card__meta">{meta}</p>}
        <span className="project-card__cta">
          {t("projects.view")}
          <FaArrowRight aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
