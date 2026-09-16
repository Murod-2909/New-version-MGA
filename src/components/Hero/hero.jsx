import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "./hero.scss";
const Hero = () => {
  const { t } = useTranslation();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null); // Swiper instansiyani olish uchun


  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.params.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className="hero">
      <div className="sliderWrapper">


            <div className="slide">
              <div className="container">
                <div className="hero__media">
                  <video
                    src="./heroVideo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="bag"
                  />
                  <div className="hero__overlay">
                    <p className="hero__overlay-tagline">{t("hero.tagline")}</p>
                    <p className="hero__overlay-subline">{t("hero.subline")}</p>
                    <p className="hero__overlay-facility">{t("hero.facility")}</p>
                  </div>
                </div>
              </div>

            </div>
       
      </div>
    </div>
  );
};

export default Hero;
