import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "./partner.scss";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getPartner } from "../../reduxToolkit/partnerSlice";

// Respect the OS "reduce motion" setting: show a static row instead of the marquee.
const prefersReducedMotion =
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Partner() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.partnerSlice.loading);
  const brandImages = useSelector((state) => state.partnerSlice?.partnerData);

  useEffect(() => {
    dispatch(getPartner());
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <section className="brand-one">
      <div className="container">
        <div className="brand-one_inner-partner">
          <div className="rows al">
            <div className="brand-one_inner-partner_col-3">
              <div className="brand-one_inner-partner_col-3_titles">
                <h3>{t("referencesTitle")}</h3>
              </div>
            </div>
            <div className="brand-one_inner-partner_col-9">
              <div className="brand-one_inner-partner_col-9_main-content">
                <Swiper
                  modules={[Autoplay]}
                  className="brand-swiper"
                  loop
                  slidesPerView="auto"
                  spaceBetween={28}
                  breakpoints={{ 576: { spaceBetween: 56 } }}
                  speed={6000}
                  allowTouchMove={false}
                  autoplay={
                    prefersReducedMotion
                      ? false
                      : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }
                  }
                >
                  {brandImages?.map((brand, index) => {
                    const logo = (
                      <img
                        src={brand?.thumbnail || brand?.image}
                        alt={`${t("partnerLogoAlt")} ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                      />
                    );
                    return (
                      <SwiperSlide key={brand.id ?? index}>
                        <div className="imgH">
                          {brand.url ? (
                            <a href={brand.url} target="_blank" rel="noopener noreferrer">
                              {logo}
                            </a>
                          ) : (
                            logo
                          )}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
