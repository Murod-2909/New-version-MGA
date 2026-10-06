import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./modalImg.scss";

// Shared lightbox (Gallery, project pages, "our work" slider). Deliberately has
// no autoplay: someone studying a photo shouldn't have it swapped out from
// under them. Closes on Esc, on a click outside the photo/controls, and locks
// page scroll while open.
const ModalCarousel = ({ onClose, galleryImages = [], initialSlide = 0 }) => {
  const { t } = useTranslation();
  const closeRef = useRef(null);

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
      "img, button, .swiper-pagination, .swiper-button-prev, .swiper-button-next"
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
        >
          {galleryImages.map((img, index) => (
            <SwiperSlide key={`${index}-${img.image}`}>
              <img
                src={img.image}
                alt={`${t("galleryImageAlt")} ${index + 1}`}
                loading={index === initialSlide ? "eager" : "lazy"}
                decoding="async"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ModalCarousel;
