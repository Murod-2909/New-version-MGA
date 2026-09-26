import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import PageHero from "../../components/pageHero";
import InquiryForm from "../../components/InquiryForm";
import NewLetter from "../../components/newLetter";
import Seo from "../../components/Seo";
import Spinner from "../../components/Spinner";
import { getServices } from "../../reduxToolkit/servesSlice";
import { getProductionSlug } from "../../data/production-content";
import "../ServicePage/servicePage.scss";

// Detail page for the backend-driven "production capability" items (UV Printing,
// Laser Cutting, etc.) shown in HomeServices. The backend gives no id/slug — see
// src/data/production-content.js for how the slug is derived from the image
// filename, which stays stable across languages while the title text does not.
const ProductionDetail = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const servicesData = useSelector((state) => state.servicesSlider?.servicesData);
  const loading = useSelector((state) => state.servicesSlider?.loading);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const item = servicesData?.find((i) => getProductionSlug(i.image) === slug);

  if (!item) {
    if (loading) {
      return <Spinner />;
    }

    return (
      <div className="service-page">
        <Seo title="MGA Reklama" path={`/production/${slug}`} />
        <PageHero title={t("services.sectionTitle")} />
        <div className="container service-page__notfound">
          <p>
            <Link to="/serves">{t("serves")}</Link>
          </p>
        </div>
      </div>
    );
  }

  const base = `production.items.${slug}`;
  const hasContent = i18n.exists(`${base}.intro`);
  const intro = hasContent ? t(`${base}.intro`) : t("services.contactAboutItem");
  const capability = hasContent ? t(`${base}.capability`) : "";

  const otherItems = (servicesData || []).filter(
    (i) => i !== item && i.image && i.title
  );

  return (
    <div className="service-page">
      <Seo title={`${item.title} | MGA Reklama`} description={intro} path={`/production/${slug}`} />
      <PageHero title={item.title} />

      <section className="service-page__body">
        <div className="container">
          <div className="service-page__row">
            <div className="service-page__content">
              <img src={item.image} alt={item.title} className="service-page__photo" />
              <p className="service-page__intro">{intro}</p>

              {capability && (
                <div className="service-page__block">
                  <h3>{t("services.capabilityLabel")}</h3>
                  <p>{capability}</p>
                </div>
              )}
            </div>

            <div className="service-page__form">
              <h3>{t("services.requestQuote")}</h3>
              <InquiryForm presetSubject={item.title} />
            </div>
          </div>

          {otherItems.length > 0 && (
            <div className="service-page__related">
              <h3>{t("servies")}</h3>
              <ul>
                {otherItems.map((i) => {
                  const otherSlug = getProductionSlug(i.image);
                  return (
                    <li key={i.title}>
                      {otherSlug ? (
                        <Link to={`/production/${otherSlug}`}>{i.title}</Link>
                      ) : (
                        <Link to="/contact" state={{ subject: i.title }}>
                          {i.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      <NewLetter />
    </div>
  );
};

export default ProductionDetail;
