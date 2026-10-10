import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/pageHero";
import NewLetter from "../../components/newLetter";
import Seo from "../../components/Seo";
import ProjectCard, { ProjectCardSkeleton } from "../../components/ProjectCard";
import { getProjects } from "../../reduxToolkit/projectsSlice";
import { categoryLabel } from "./categories";
import "./projects.scss";

const SKELETON_COUNT = 6;

const ProjectsList = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { list, listLoading, listError } = useSelector((state) => state.projectsSlice);
  const [active, setActive] = useState("all");

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const categories = useMemo(
    () => [...new Set(list.map((p) => p.category).filter(Boolean))],
    [list]
  );
  const visible = active === "all" ? list : list.filter((p) => p.category === active);
  const showSkeleton = listLoading && list.length === 0;

  return (
    <div className="projects-page">
      <Seo
        title={`${t("projects.listTitle")} | MGA Reklama`}
        description={t("projects.listIntro")}
        path="/projects"
      />
      <PageHero title={t("projects.listTitle")} subtitle={t("projects.listIntro")} />

      <section className="projects-page__section">
        <div className="container">
          {categories.length > 1 && (
            <div className="projects-page__filters" role="group">
              {["all", ...categories].map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`projects-page__chip${active === key ? " is-active" : ""}`}
                  aria-pressed={active === key}
                  onClick={() => setActive(key)}
                >
                  {key === "all" ? t("projects.all") : categoryLabel(t, i18n, key)}
                </button>
              ))}
            </div>
          )}

          {listError && list.length === 0 && (
            <p className="projects-page__state">{t("projects.error")}</p>
          )}

          {!listError && !listLoading && list.length === 0 && (
            <p className="projects-page__state">{t("projects.empty")}</p>
          )}

          <div className="projects-page__grid">
            {showSkeleton &&
              Array.from({ length: SKELETON_COUNT }, (_, i) => <ProjectCardSkeleton key={i} />)}
            {visible.map((project) => (
              <ProjectCard key={project.slug ?? project.id} project={project} headingLevel={2} />
            ))}
          </div>
        </div>
      </section>

      <NewLetter />
    </div>
  );
};

export default ProjectsList;
