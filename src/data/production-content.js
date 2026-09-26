// Maps the backend /services/ API's image filename to a stable, language-independent
// slug used for the /production/:slug detail page and for looking up curated content
// under "production.items.<slug>" in src/Ing/*.json.
//
// Why by image filename and not by title: the API's `title` field is translated
// per `?lang=` and has no separate id field, so it changes text across languages
// (e.g. "UV Printing" vs "УФ печать") — but the image filename stays identical
// regardless of language, making it the only reliable stable key available.
//
// If the backend adds a new item whose image isn't listed here, getProductionSlug
// returns null and callers fall back to a generic "contact us" flow instead of a
// detail page — see HomeServices and ProductionDetail.
const IMAGE_TO_SLUG = {
  "UV_PECHAT.png": "uv-printing",
  "ECO_PECHAT.png": "interior-printing",
  "SHROKAFORMATNI_PECHAT.png": "outdoor-printing",
  "LAZER_hlUVlLl.png": "metal-laser-cutting-machine",
  "CNC_rover.png": "cnc-cutting",
  "laser_l.png": "laser-plexiglass-machine",
  "laser.png": "letter-bending-machine",
  "juyuan.png": "laser-welding",
  "PLOTER_RESKA.png": "plotter-cutting",
};

export function getProductionSlug(imageUrl) {
  if (!imageUrl) return null;
  const filename = imageUrl.split("/").pop().split("?")[0];
  return IMAGE_TO_SLUG[filename] || null;
}

export default IMAGE_TO_SLUG;
