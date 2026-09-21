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

const ServiceCard = ({ slug, reverse = false }) => {
  const { t } = useTranslation();
  const base = `services.items.${slug}`;
  const Icon = ICONS[slug] || FaBuilding;

  return (
    <div className={`service-card${reverse ? " service-card--reverse" : ""}`}>
      <div className="service-card__image">
        <img src={placeholderImg} alt={t(`${base}.h1`)} />
        <span className="service-card__badge">
          <Icon />
        </span>
      </div>
      <div className="service-card__content">
        <h3 className="service-card__title">{t(`${base}.h1`)}</h3>
        <p className="service-card__text">{t(`${base}.intro`)}</p>
        <Link to={`/services/${slug}`} className="service-card__btn">
          {t("services.moreAboutService")}
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
