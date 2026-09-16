import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Seo from "./index";
import seoConfig from "./seoConfig";

// Renders once for the app's lifetime (mounted outside the <Suspense>/lazy route
// boundary) and just updates its props on navigation, instead of a fresh <Seo>
// mounting/unmounting per page — see seoConfig.js for why that matters.
const RouteSeo = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const key = seoConfig[pathname];

  if (!key) return null;

  return (
    <Seo
      title={t(`seo.${key}.title`)}
      description={t(`seo.${key}.description`)}
      path={pathname}
    />
  );
};

export default RouteSeo;
