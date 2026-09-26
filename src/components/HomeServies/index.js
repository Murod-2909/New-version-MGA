import React, { useEffect } from "react";
import "./homeServies.scss";
import { FaTools } from "react-icons/fa";
import Aos from "aos";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ServiceCardBase } from "../ServiceCard";
import { getProductionSlug } from "../../data/production-content";

function HomeServices({ servicesData }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div className="services">
      <div className="services_iServices">
        <div
          data-aos="fade-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1500"
        >
          {t("servies")}
        </div>
      </div>

      <div className="services_bad">
        <div className="container">
          {servicesData?.map((item, index) => {
            if (!item.image || !item.title) return null;

            const slug = getProductionSlug(item.image);
            const hasContent = slug && i18n.exists(`production.items.${slug}.short`);
            const description = hasContent
              ? t(`production.items.${slug}.short`)
              : t("services.contactAboutItem");

            return (
              <motion.div
                key={item.title + index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCardBase
                  image={item.image}
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
