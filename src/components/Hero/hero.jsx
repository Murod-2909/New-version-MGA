import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";
import Link from "../LocaleLink";
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

  return (
    <section className="hero">
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
            aria-hidden="true"
          />
        ) : (
          <img src="/heroPoster.jpg" alt="" fetchpriority="high" decoding="async" />
        )}
      </div>
      <div className="hero__shade" aria-hidden="true"></div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">{t("hero.tagline")}</p>
          <h1 className="hero__title">{t("hero.title")}</h1>
          <p className="hero__lead">{t("hero.subline")}</p>
          <div className="hero__actions">
            <Link to="/contact" className="hero__btn hero__btn--primary">
              {t("services.requestQuote")}
              <FaArrowRight aria-hidden="true" />
            </Link>
            <Link to="/projects" className="hero__btn hero__btn--ghost">
              {t("projects.listTitle")}
            </Link>
          </div>
          <p className="hero__facts">{t("hero.facility")}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
