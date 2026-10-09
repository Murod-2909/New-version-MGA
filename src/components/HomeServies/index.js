import React, { useEffect } from "react";
import "./homeServies.scss";
import {
  FaPrint,
  FaImage,
  FaExpandArrowsAlt,
  FaBolt,
  FaCogs,
  FaCut,
  FaFont,
  FaFire,
  FaDrawPolygon,
  FaIndustry,
} from "react-icons/fa";
import Aos from "aos";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ServiceCardBase } from "../ServiceCard";
import { getItemSlug, getProductionSlug } from "../../data/production-content";

// One icon per production capability so the cards don't all look the same;
// items added later in the admin panel get the generic factory icon.
const PRODUCTION_ICONS = {
  "uv-printing": FaPrint,
  "interior-printing": FaImage,
  "outdoor-printing": FaExpandArrowsAlt,
  "metal-laser-cutting-machine": FaBolt,
  "cnc-cutting": FaCogs,
  "laser-plexiglass-machine": FaCut,
  "letter-bending-machine": FaFont,
  "laser-welding": FaFire,
  "plotter-cutting": FaDrawPolygon,
};

function HomeServices({ servicesData }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div className="services">
      <header className="services__head container">
        <span className="services__eyebrow">{t("services.productionEyebrow")}</span>
        <h2 className="services__title">{t("services.productionTitle")}</h2>
        <p className="services__subtitle">{t("services.productionSubtitle")}</p>
      </header>

      <div className="services_bad">
        <div className="container">
          {servicesData?.map((item, index) => {
            if (!item.image || !item.title) return null;

            const curatedSlug = getProductionSlug(item);
            const hasCurated =
              curatedSlug && i18n.exists(`production.items.${curatedSlug}.short`);
            // Backend description (from the admin panel) wins; the hand-written
            // text only fills in while the admin hasn't entered one yet.
            const description =
              item.description?.trim() ||
              (hasCurated
                ? t(`production.items.${curatedSlug}.short`)
                : t("services.contactAboutItem"));
            const slug = getItemSlug(item);

            return (
              <motion.div
                key={item.title + index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCardBase
                  image={item.thumbnail || item.image}
                  title={item.title}
                  description={description}
                  icon={PRODUCTION_ICONS[curatedSlug] || FaIndustry}
                  ctaLabel={t("services.moreAboutService")}
                  ctaTo={slug ? `/production/${slug}` : "/contact"}
                  ctaState={slug ? undefined : { subject: item.title }}
                  reverse={index % 2 === 1}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeServices;
