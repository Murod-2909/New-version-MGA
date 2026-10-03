import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaImages, FaSearchPlus } from "react-icons/fa";

// One gallery tile. Uses the small `thumbnail` the backend provides when it
// exists and falls back to the full `image` otherwise; the full image is only
// fetched when the lightbox opens.
const GalleryCard = ({ item, index, onOpen }) => {
  const { t } = useTranslation();
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const count = 1 + (item.same_images?.length || 0);

  // A cached image can finish loading before React attaches onLoad.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <button
      type="button"
      className={`gallery-card${loaded ? " is-loaded" : ""}`}
      onClick={() => onOpen(item)}
      aria-label={`${t("galleryPage.open")} ${index + 1}`}
    >
      <img
        ref={imgRef}
        src={item.thumbnail || item.image}
        alt={`${t("galleryImageAlt")} ${index + 1}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      {count > 1 && (
        <span className="gallery-card__count">
          <FaImages aria-hidden="true" />
          {count}
        </span>
      )}
      <span className="gallery-card__zoom" aria-hidden="true">
        <FaSearchPlus />
      </span>
    </button>
  );
};

export default GalleryCard;
