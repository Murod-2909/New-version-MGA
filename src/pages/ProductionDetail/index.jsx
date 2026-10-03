import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Link from "../../components/LocaleLink";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import PageHero from "../../components/pageHero";
import InquiryForm from "../../components/InquiryForm";
import NewLetter from "../../components/newLetter";
import Seo from "../../components/Seo";
import Spinner from "../../components/Spinner";
import WorksSlider from "../../components/WorksSlider";
import { getServices } from "../../reduxToolkit/servesSlice";
import { getItemSlug, getProductionSlug } from "../../data/production-content";
import "../ServicePage/servicePage.scss";

// Detail page for the backend-driven items (UV Printing, Laser Cutting, …) shown
// in HomeServices. Title, image and description come from the API; the URL slug
// is the curated readable one when we know the image (see production-content.js)
// and the backend id otherwise, so items added in the admin panel get a page too.
const ProductionDetail = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const servicesData = useSelector((state) => state.servicesSlider?.servicesData);
  const loading = useSelector((state) => state.servicesSlider?.loading);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const item = servicesData?.find((i) => getItemSlug(i) === slug);

  if (!item) {
    if (loading) {
      return <Spinner />;
    }

    return (
      <div className="service-page">
        <Seo title="MGA Reklama" path={`/production/${slug}`} noindex />
        <PageHero title={t("services.sectionTitle")} />
        <div className="container service-page__notfound">
          <p>{t("notFoundText")}</p>
          <p>
            <Link to="/serves">{t("serves")}</Link>
          </p>
        </div>
      </div>
    );
  }

  const curatedSlug = getProductionSlug(item.image);
  const hasCurated = curatedSlug && i18n.exists(`production.items.${curatedSlug}.intro`);
  const backendText = item.description?.trim();

  // Backend description (admin panel) is the source of truth. Only while it is
  // empty do we show the hand-written intro + capability pair instead.
  const intro =
    backendText ||
    (hasCurated
      ? t(`production.items.${curatedSlug}.intro`)
      : t("services.contactAboutItem"));
  const capability =
    !backendText && hasCurated ? t(`production.items.${curatedSlug}.capability`) : "";

  const otherItems = (servicesData || []).filter(
    (i) => i !== item && i.image && i.title
  );

  // Prefer a real work photo over the equipment icon for link previews.
  const ogCandidate = item.works?.find((w) => w?.image)?.image || item.image || "";
  const ogImage = /^https?:\/\//.test(ogCandidate) ? ogCandidate : undefined;

  return (
    <div className="service-page">
      <Seo
        title={`${item.title} | MGA Reklama`}
        description={intro}
        path={`/production/${slug}`}
        image={ogImage}
      />
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

          <WorksSlider works={item.works} title={item.title} />

          {otherItems.length > 0 && (
            <div className="service-page__related">
              <h3>{t("servies")}</h3>
              <div className="service-page__related-grid">
                {otherItems.map((i) => {
                  const otherSlug = getItemSlug(i);
                  return (
                    <Link
                      key={otherSlug || i.title}
                      to={otherSlug ? `/production/${otherSlug}` : "/contact"}
                      state={otherSlug ? undefined : { subject: i.title }}
                      className="service-page__related-card"
                    >
                      <img src={i.image} alt={i.title} />
                      <span>{i.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <NewLetter />
    </div>
  );
};

export default ProductionDetail;
