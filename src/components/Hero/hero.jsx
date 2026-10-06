import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "./hero.scss";

// The hero video is decorative, so skip it on phones, Data Saver and
// reduced-motion setups and show the poster image instead.
const canPlayVideo = () => {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  if (window.__PRERENDER__) return false; // set by scripts/prerender.js
  const saveData = navigator.connection && navigator.connection.saveData;
  return !(
    saveData ||
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};

const Hero = () => {
  const { t } = useTranslation();
  // Start with the poster (this is also what gets pre-rendered into the static HTML,
  // so phones never download the video); desktops swap in the video after mount.
  const [playVideo, setPlayVideo] = useState(false);
  useEffect(() => {
    setPlayVideo(canPlayVideo());
  }, []);
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
                  {playVideo ? (
                    <video
                      src="/heroVideo.mp4"
                      poster="/heroPoster.jpg"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="bag"
                    />
                  ) : (
                    <img
                      src="/heroPoster.jpg"
                      alt={t("hero.tagline")}
                      className="bag"
                      fetchpriority="high"
                      decoding="async"
                    />
                  )}
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
