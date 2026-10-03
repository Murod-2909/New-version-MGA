import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { withLang } from "../../serves/locale";

// Drop-in replacement for react-router's <Link> that keeps the current language
// prefix (/ru/..., /uz/...) on internal links.
const LocaleLink = ({ to, ...props }) => {
  const { i18n } = useTranslation();
  return <Link to={typeof to === "string" ? withLang(to, i18n.language) : to} {...props} />;
};

export default LocaleLink;
