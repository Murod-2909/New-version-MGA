import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "./partner.scss";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getPartner } from "../../reduxToolkit/partnerSlice";

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
                  spaceBetween={100}
                  slidesPerView={5}
                  loop={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    375: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    575: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    767: {
                      slidesPerView: 4,
                      spaceBetween: 40,
                    },
                    991: {
                      slidesPerView: 5,
                      spaceBetween: 50,
                    },
                    1199: {
                      slidesPerView: 6,
                      spaceBetween: 60,
                    },
                    1440: {
                      slidesPerView: 7,
                      spaceBetween: 70,
                    },
                    1600: {
                      slidesPerView: 8,
                      spaceBetween: 80,
                    },
                    1920: {
                      slidesPerView: 9,
                      spaceBetween: 90,
                    },
                    2560: {
                      slidesPerView: 10,
                      spaceBetween: 100,
                    },
                  }}
                  className="brand-swiper"
                >
                  {brandImages?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="imgH">
                        <a
                          href={img.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={img?.image} alt={`${t("partnerLogoAlt")} ${index + 1}`} />
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
