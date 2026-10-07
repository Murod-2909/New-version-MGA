import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useProductionLinks from "./useProductionLinks";
import { getPartner } from "../reduxToolkit/partnerSlice";

const FOUNDED_YEAR = 2010; // "Since 2010, our company ..." (see aboutPage.p1)

// Company figures shown on the Home and About pages. Every one is real: years since 2010,
// the 2,000 m² factory (stated in the About text), and live counts from the same data
// that fills the equipment menu and the References strip.
const useAboutStats = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const productionLinks = useProductionLinks();
  const partners = useSelector((state) => state.partnerSlice?.partnerData);
  const hasPartners = Array.isArray(partners) && partners.length > 0;

  useEffect(() => {
    if (!hasPartners) dispatch(getPartner());
  }, [dispatch, hasPartners]);

  return [
    { value: String(new Date().getFullYear() - FOUNDED_YEAR), label: t("aboutPage.statYears") },
    { value: t("aboutPage.statAreaValue"), label: t("aboutPage.statArea") },
    productionLinks.length > 0 && {
      value: String(productionLinks.length),
      label: t("aboutPage.statLines"),
    },
    hasPartners && { value: String(partners.length), label: t("aboutPage.statPartners") },
  ].filter(Boolean);
};

export default useAboutStats;
