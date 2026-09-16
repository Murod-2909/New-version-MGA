import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./serves.scss";
import PageHero from "../../components/pageHero";

import NewLetter from "../../components/newLetter";
import HomeServices from "../../components/HomeServies";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../reduxToolkit/servesSlice";
import serviceSlugs from "../../data/services-content";

const Serves = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const services = useSelector(
    (state) => state.servicesSlider?.servicesData);

  const title = t("serves");
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <section className="section-serves">
      <PageHero title={title} />
      <HomeServices servicesData={services}  />

      <div className="section-serves__specialized container">
        <h2 className="section-serves__specialized-title">
          {t("services.sectionTitle")}
        </h2>
        <ul className="section-serves__specialized-list">
          {serviceSlugs.map((slug) => (
            <li key={slug}>
              <Link to={`/services/${slug}`}>
                {t(`services.items.${slug}.h1`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <NewLetter />
    </section>
  );
};

export default Serves;
