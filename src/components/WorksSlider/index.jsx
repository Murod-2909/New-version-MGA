import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "swiper/css";
import ModalCarousel from "../../pages/Gallery/ModalImg/modalImg";
import PlayBadge from "../PlayBadge";
import { isVideo, mediaPoster } from "../../data/media";
import "./style.scss";

// Photos of work done with a piece of equipment (the `works` array the backend
// returns per service). Renders nothing when there are no photos, so services
// without uploads don't get an empty section.
const WorksSlider = ({ works = [], title = "", heading, subheading }) => {
  const { t } = useTranslation();
  const [swiper, setSwiper] = useState(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [openIndex, setOpenIndex] = useState(null);

  // A video counts as long as it has a poster to show in the grid.
  const photos = (works || []).filter((w) => w && (w.image || w.thumbnail));
  if (photos.length === 0) return null;

  const syncEdges = (s) => setEdges({ start: s.isBeginning, end: s.isEnd });
  const fitsOnScreen = edges.start && edges.end;

  return (
    <section className="works-slider">
      <div className="works-slider__head">
        <div>
          <h3 className="works-slider__title" aria-level={2}>{heading ?? t("production.worksTitle")}</h3>
          <p className="works-slider__subtitle">{subheading ?? t("production.worksSubtitle")}</p>
        </div>

        {!fitsOnScreen && (
          <div className="works-slider__nav">
            <button
              type="button"
              aria-label="Previous"
              disabled={edges.start}
              onClick={() => swiper?.slidePrev()}
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              aria-label="Next"
              disabled={edges.end}
              onClick={() => swiper?.slideNext()}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1.15}
        breakpoints={{
          640: { slidesPerView: 2.1 },
          992: { slidesPerView: 3 },
        }}
        onSwiper={(s) => {
          setSwiper(s);
          syncEdges(s);
        }}
        onSlideChange={syncEdges}
        onResize={syncEdges}
        onBreakpoint={syncEdges}
      >
        {photos.map((work, index) => (
          <SwiperSlide key={work.id ?? index}>
            <button
              type="button"
              className="works-slider__card"
              onClick={() => setOpenIndex(index)}
              aria-label={`${isVideo(work) ? `${t("galleryPage.playVideo")}: ` : ""}${title} — ${index + 1}`}
            >
              <img
                src={mediaPoster(work)}
                alt={`${title} — ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
              {isVideo(work) && <PlayBadge duration={work.duration} />}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {openIndex !== null && (
        <ModalCarousel
          onClose={() => setOpenIndex(null)}
          galleryImages={photos}
          initialSlide={openIndex}
        />
      )}
    </section>
  );
};

export default WorksSlider;
