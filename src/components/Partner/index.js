import React, { useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "./partner.scss";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getPartner } from "../../reduxToolkit/partnerSlice";

// Respect the OS "reduce motion" setting: show a static wall instead of the marquee.
const prefersReducedMotion =
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A looping Swiper needs more slides than fit on screen, so short lists are repeated.
const MIN_SLIDES = 12;
const fill = (list) => {
  if (list.length === 0) return list;
  const out = [];
  while (out.length < MIN_SLIDES) {
    const repeat = out.length > 0;
    list.forEach((item) => out.push({ ...item, repeat }));
  }
  return out;
};

const LogoRow = ({ brands, reverse, label }) => (
  <Swiper
    modules={[Autoplay]}
    className="brand-swiper"
    loop
    slidesPerView="auto"
    spaceBetween={16}
    breakpoints={{ 576: { spaceBetween: 22 } }}
    speed={7000}
    allowTouchMove={false}
    autoplay={
      prefersReducedMotion
        ? false
        : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true, reverseDirection: reverse }
    }
  >
    {fill(brands).map(({ brand, index, repeat }, i) => {
      const logo = (
        <img
          src={brand?.thumbnail || brand?.image}
          alt={`${label} ${index + 1}`}
          loading="lazy"
          decoding="async"
        />
      );
      return (
        <SwiperSlide
          key={`${brand.id ?? index}-${i}`}
          className={repeat ? "is-repeat" : undefined}
          aria-hidden={repeat ? "true" : undefined}
        >
          {brand.url ? (
            <a
              className="brand-card"
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={repeat ? -1 : undefined}
            >
              {logo}
            </a>
          ) : (
            <div className="brand-card">{logo}</div>
          )}
        </SwiperSlide>
      );
    })}
  </Swiper>
);

export default function Partner() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.partnerSlice.loading);
  const brandImages = useSelector((state) => state.partnerSlice?.partnerData);

  useEffect(() => {
    dispatch(getPartner());
  }, [dispatch]);

  // Two rows moving in opposite directions: even/odd logos keep the rows balanced.
  const rows = useMemo(() => {
    const all = (brandImages || []).map((brand, index) => ({ brand, index }));
    return [all.filter((_, i) => i % 2 === 0), all.filter((_, i) => i % 2 === 1)];
  }, [brandImages]);

  if (loading || !brandImages || brandImages.length === 0) {
    return null;
  }

  return (
    <section className="brand-one">
      <div className="container">
        <div className="brand-one__head">
          <h3 className="brand-one__title">{t("referencesTitle")}</h3>
          <p className="brand-one__subtitle">{t("referencesSubtitle")}</p>
        </div>
      </div>

      <div className="brand-one__rows">
        <LogoRow brands={rows[0]} label={t("partnerLogoAlt")} />
        {rows[1].length > 0 && <LogoRow brands={rows[1]} reverse label={t("partnerLogoAlt")} />}
      </div>
    </section>
  );
}
