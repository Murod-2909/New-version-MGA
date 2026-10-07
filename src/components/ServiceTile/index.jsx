import React from "react";
import Link from "../LocaleLink";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaBuilding } from "react-icons/fa";
import { ICONS } from "../ServiceCard";
import "./style.scss";

// Compact card for one of the curated service pages (/services/:slug). Photo-less
// on purpose: until each service has its own photos, an icon tile reads as designed
// instead of repeating a placeholder picture ten times.
const ServiceTile = ({ slug }) => {
  const { t } = useTranslation();
  const base = `services.items.${slug}`;
  const Icon = ICONS[slug] || FaBuilding;

  return (
    <Link to={`/services/${slug}`} className="service-tile">
      <span className="service-tile__icon" aria-hidden="true">
        <Icon />
      </span>
      <h3 className="service-tile__title">{t(`${base}.h1`)}</h3>
      <p className="service-tile__text">{t(`${base}.subtitle`)}</p>
      <span className="service-tile__cta">
        {t("services.moreAboutService")}
        <FaArrowRight aria-hidden="true" />
      </span>
    </Link>
  );
};

export default ServiceTile;
