import React from "react";
import { useParams } from "react-router-dom";
import Link from "../../components/LocaleLink";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/pageHero";
import InquiryForm from "../../components/InquiryForm";
import NewLetter from "../../components/newLetter";
import Seo from "../../components/Seo";
import serviceSlugs from "../../data/services-content";
import "./servicePage.scss";

const ServicePage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();

  if (!serviceSlugs.includes(slug)) {
    return (
      <div className="service-page">
        <Seo title="MGA Reklama" path={`/services/${slug}`} noindex />
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

  const base = `services.items.${slug}`;
  const h1 = t(`${base}.h1`);
  const subtitle = t(`${base}.subtitle`);
  const intro = t(`${base}.intro`);
  const details = t(`${base}.details`);
  const uses = t(`${base}.uses`, { returnObjects: true });

  return (
    <div className="service-page">
      <Seo
        title={`${h1} | MGA Reklama`}
        description={intro}
        path={`/services/${slug}`}
      />
      <PageHero title={h1} subtitle={subtitle} />

      <section className="service-page__body">
        <div className="container">
          <div className="service-page__row">
            <div className="service-page__content">
              <p className="service-page__intro">{intro}</p>
              {details && <p className="service-page__details">{details}</p>}

              <div className="service-page__block">
                <h3 aria-level={2}>{t("services.materialsLabel")}</h3>
                <p>{t(`${base}.materials`)}</p>
              </div>

              <div className="service-page__block">
                <h3 aria-level={2}>{t("services.capabilityLabel")}</h3>
                <p>{t(`${base}.capability`)}</p>
              </div>

              {Array.isArray(uses) && uses.length > 0 && (
                <div className="service-page__block">
                  <h3 aria-level={2}>{t("services.usesLabel")}</h3>
                  <ul className="service-page__uses">
                    {uses.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="service-page__form">
              <h3 aria-level={2}>{t("services.requestQuote")}</h3>
              <InquiryForm presetSubject={h1} />
            </div>
          </div>

          <div className="service-page__related">
            <h3 aria-level={2}>{t("services.sectionTitle")}</h3>
            <ul>
              {serviceSlugs
                .filter((s) => s !== slug)
                .map((s) => (
                  <li key={s}>
                    <Link to={`/services/${s}`}>{t(`services.items.${s}.h1`)}</Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <NewLetter />
    </div>
  );
};

export default ServicePage;
