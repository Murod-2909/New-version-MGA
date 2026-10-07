import React, { useEffect } from "react";
import "./homeServies.scss";
import { FaTools } from "react-icons/fa";
import Aos from "aos";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ServiceCardBase } from "../ServiceCard";
import { getItemSlug, getProductionSlug } from "../../data/production-content";

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
                  icon={FaTools}
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
