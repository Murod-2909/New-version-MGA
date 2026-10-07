// Team members shown in the "Our team" block on the About page.
//
// Add real people here, e.g.:
//   {
//     name: "Ali Valiyev",
//     role: { en: "Production manager", ru: "Руководитель производства", uz: "Ishlab chiqarish rahbari" },
//     photo: require("../assests/images/team/ali.jpg"),   // or a full URL
//   },
// Photos: square or portrait, at least 600x600 px.
//
// While this list is empty the block is hidden on the live site. In development
// (npm start) it shows clearly marked placeholders so the layout can be reviewed.
export const TEAM = [];

export const PLACEHOLDER_TEAM = [1, 2, 3, 4].map((n) => ({ id: `placeholder-${n}`, placeholder: true }));

export const getTeam = () =>
  TEAM.length > 0 ? TEAM : process.env.NODE_ENV !== "production" ? PLACEHOLDER_TEAM : [];
