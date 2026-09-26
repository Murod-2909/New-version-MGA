import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaArrowRight,
  FaMapSigns,
  FaHotel,
  FaBuilding,
  FaAd,
  FaMapMarkerAlt,
  FaFont,
  FaPrint,
  FaLandmark,
  FaCity,
  FaTools,
} from "react-icons/fa";
// No real per-service photos exist yet — this is a shared placeholder until
// each service page gets its own photo (see src/data/services-content.js).
import placeholderImg from "../../assests/images/page-header-bg.jpg";
import "./style.scss";

// One representative icon per service slug, shown as the badge on the image
// (stand-in for a real photo carousel until actual project photos exist).
const ICONS = {
  "wayfinding-signage": FaMapSigns,
  "hotel-signage": FaHotel,
  "interior-signage": FaBuilding,
  "outdoor-signage": FaAd,
  "totem-pylon-signs": FaMapMarkerAlt,
  "channel-letters": FaFont,
  "large-format-printing": FaPrint,
  "museum-signage": FaLandmark,
  "facade-signage": FaCity,
  "fit-out-interior-works": FaTools,
};

// Presentational shell shared by the 10 curated service pages (ServiceCard
// below) and the raw backend-driven service list (see HomeServies), which
// has no i18n slug to look up — just whatever {image, title} the API returns.
export const ServiceCardBase = ({
  image,
  title,
  description,
  icon: Icon,
  ctaLabel,
  ctaTo,
  ctaState,
  reverse = false,
}) => (
  <div className={`service-card${reverse ? " service-card--reverse" : ""}`}>
    <div className="service-card__image">
      <img src={image} alt={title} />
      {Icon && (
        <span className="service-card__badge">
          <Icon />
        </span>
      )}
    </div>
    <div className="service-card__content">
      <h3 className="service-card__title">{title}</h3>
      {description && <p className="service-card__text">{description}</p>}
      {ctaTo && (
        <Link to={ctaTo} state={ctaState} className="service-card__btn">
          {ctaLabel}
          <FaArrowRight />
        </Link>
      )}
    </div>
  </div>
);

const ServiceCard = ({ slug, reverse = false }) => {
  const { t } = useTranslation();
  const base = `services.items.${slug}`;

  return (
    <ServiceCardBase
      image={placeholderImg}
      title={t(`${base}.h1`)}
      description={t(`${base}.intro`)}
      icon={ICONS[slug] || FaBuilding}
      ctaLabel={t("services.moreAboutService")}
      ctaTo={`/services/${slug}`}
      reverse={reverse}
    />
  );
};

export default ServiceCard;
