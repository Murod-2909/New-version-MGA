// The backend sends `category` as a short key (e.g. "hotel"). Show the translated
// label when we have one, otherwise whatever text the backend sent, so a category
// added later in the admin panel still renders instead of disappearing.
export const categoryLabel = (t, i18n, value) => {
  if (!value) return "";
  const key = `projects.categories.${value}`;
  return i18n.exists(key) ? t(key) : value;
};
