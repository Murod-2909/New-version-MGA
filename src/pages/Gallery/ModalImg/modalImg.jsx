import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./modalImg.scss";

const ModalCarousel = ({ onClose, galleryImages = [] }) => {
  const { t } = useTranslation();

  return (
    <div className="modal-gallery">
      <div className="modal-gallery__content">
        <button className="modal-gallery__close" onClick={onClose}>
          <FaTimes />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="custom-swiper"
        >
          {galleryImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img.image} alt={`${t("galleryImageAlt")} ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ModalCarousel;
