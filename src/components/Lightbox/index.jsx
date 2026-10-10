import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import EmbedFrame from "../EmbedFrame";
import { embedOf, isVideo } from "../../data/media";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.scss";

// Shared lightbox (Gallery, project pages, "our work" slider). Deliberately has
// no autoplay: someone studying a photo shouldn't have it swapped out from
// under them. Closes on Esc, on a click outside the photo/controls, and locks
// page scroll while open.
// Plays the video of the slide that is showing and pauses every other one.
const syncVideos = (swiper) => {
  swiper.slides.forEach((slide, i) => {
    const video = slide.querySelector("video");
    if (!video) return;
    if (i === swiper.activeIndex) {
      // Try with sound first (the lightbox was opened by a click); fall back to muted
      // if the browser's autoplay policy refuses.
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    } else {
      video.pause();
    }
  });
};

const ModalCarousel = ({ onClose, galleryImages = [], initialSlide = 0 }) => {
  const { t } = useTranslation();
  const closeRef = useRef(null);
  // Instagram/YouTube players are only mounted for the slide that is showing.
  const [activeIndex, setActiveIndex] = useState(initialSlide);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    const onControl = e.target.closest(
      "img, video, iframe, a, button, .swiper-pagination, .swiper-button-prev, .swiper-button-next"
    );
    if (!onControl) onClose();
  };

  return (
    <div
      className="modal-gallery"
      role="dialog"
      aria-modal="true"
      aria-label={t("galleryImageAlt")}
      onClick={handleBackdropClick}
    >
      <div className="modal-gallery__content">
        <button
          type="button"
          ref={closeRef}
          className="modal-gallery__close"
          onClick={onClose}
          aria-label={t("galleryPage.close")}
        >
          <FaTimes />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          spaceBetween={30}
          slidesPerView={1}
          initialSlide={initialSlide}
          navigation
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          rewind
          className="custom-swiper"
          onSwiper={syncVideos}
          onSlideChange={(swiper) => {
            syncVideos(swiper);
            setActiveIndex(swiper.activeIndex);
          }}
        >
          {galleryImages.map((img, index) => {
            const embed = embedOf(img);
            return (
              <SwiperSlide key={`${index}-${img.image}-${img.video_url ?? ""}`}>
                {embed ? (
                  index === activeIndex && (
                    <EmbedFrame link={embed} title={`${t("galleryPage.video")} ${index + 1}`} />
                  )
                ) : isVideo(img) && img.video ? (
                  <video
                    src={img.video}
                    poster={img.image}
                    controls
                    playsInline
                    preload={index === initialSlide ? "auto" : "none"}
                    aria-label={`${t("galleryPage.video")} ${index + 1}`}
                  />
                ) : (
                  <img
                    src={img.image}
                    alt={`${t("galleryImageAlt")} ${index + 1}`}
                    loading={index === initialSlide ? "eager" : "lazy"}
                    decoding="async"
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ModalCarousel;
