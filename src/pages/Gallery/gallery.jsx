import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./gallery.scss";
import PageHero from "../../components/pageHero";
import NewLetter from "../../components/newLetter";
import ModalCarousel from "./ModalImg/modalImg";
import GalleryCard from "./GalleryCard";
import { getGallery } from "../../reduxToolkit/gallerySlice";

const SKELETON_COUNT = 6;

const Gallery = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { galleryData, loading, error } = useSelector((state) => state.gallerySlice);
  const [openGroup, setOpenGroup] = useState(null);

  useEffect(() => {
    dispatch(getGallery());
  }, [dispatch]);

  const items = Array.isArray(galleryData) ? galleryData : [];
  const showSkeleton = loading && items.length === 0;

  // A gallery entry opens as one lightbox: its cover followed by its extra photos.
  const openItem = (item) => setOpenGroup([item, ...(item.same_images || [])]);
  const closeLightbox = useCallback(() => setOpenGroup(null), []);

  return (
    <div className="gallery">
      <PageHero title={t("gallery")} />

      <section className="gallery-section">
        <div className="container">
          {error && items.length === 0 && (
            <p className="gallery-state">{t("galleryPage.error")}</p>
          )}

          {!error && !loading && items.length === 0 && (
            <p className="gallery-state">{t("galleryPage.empty")}</p>
          )}

          <div className="gallery-grid">
            {showSkeleton &&
              Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <div key={i} className="gallery-card gallery-card--skeleton" aria-hidden="true" />
              ))}

            {items.map((item, index) => (
              <GalleryCard key={item.id ?? index} item={item} index={index} onOpen={openItem} />
            ))}
          </div>

          <p className="gallery__projects-link">
            <Link to="/projects">{t("projects.listTitle")}</Link>
          </p>
        </div>
      </section>

      {openGroup && <ModalCarousel onClose={closeLightbox} galleryImages={openGroup} />}

      <NewLetter />
    </div>
  );
};

export default Gallery;
