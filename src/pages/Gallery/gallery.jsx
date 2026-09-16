import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./gallery.scss";
import { FaPlus } from "react-icons/fa";
import PageHero from "../../components/pageHero";
import ModalCarousel from "./ModalImg/modalImg";
import NewLetter from "../../components/newLetter";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getGallery } from "../../reduxToolkit/gallerySlice";

const Gallery = () => {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);

  const { t } = useTranslation();
  const galleryImages = useSelector((state) => state.gallerySlice?.galleryData);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const title = t("gallery");
  useEffect(() => {
    dispatch(getGallery());
  }, [dispatch]);

  return (
    <div className="gallery">
      <PageHero title={title} />

      <section className="similar-project">
        <div className="container">
          <div className="rows">
            {galleryImages?.map((image, index) => (
              <div className="col-xl-4" key={index}>
                <div
                  className="col-xl-4__single"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="col-xl-4__imgs">
                    <img
                      src={image?.image}
                      alt={`Brand ${index + 1}`}
                      className="gallery__image"
                    />
                    {hoveredIndex === index && (
                      <div className="col-xl-4__iconGallery">
                        <button
                          className="img-group"
                          onClick={() => {
                            setSelectedImages([
                              image,
                              ...(image.same_images || []),
                            ]);
                            setShowModal(true);
                          }}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <p className="gallery__projects-link">
            <Link to="/projects">{t("projects.listTitle")}</Link>
          </p>
        </div>
      </section>

      {/* MODAL */}
      {showModal && (
        <ModalCarousel
          onClose={() => setShowModal(false)}
          galleryImages={selectedImages}
        />
      )}

      <NewLetter />
    </div>
  );
};

export default Gallery;
