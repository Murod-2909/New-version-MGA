// Maps the backend /services/ API's image filename to a stable, language-independent
// slug used for the /production/:slug detail page and for looking up curated content
// under "production.items.<slug>" in src/Ing/*.json.
//
// Why by image filename and not by title: the API's `title` field is translated
// per `?lang=` and has no separate id field, so it changes text across languages
// (e.g. "UV Printing" vs "УФ печать") — but the image filename stays identical
// regardless of language, making it the only reliable stable key available.
//
// Items added later in the admin panel aren't listed here — getItemSlug falls
// back to the backend `id` for them, so they get a detail page (title, image and
// description straight from the API) without any frontend change. Only if the
// API gives neither a known image nor an id does the item fall back to the
// generic "contact us" flow — see HomeServices and ProductionDetail.
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

// "UV_PECHAT.png", "UV_PECHAT.webp" and Django's collision-renamed "UV_PECHAT_aB3dE9x.webp"
// all normalise to "uv_pechat", so the mapping survives the backend converting
// uploads to WebP.
const normalizeFilename = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .replace(/_[A-Za-z0-9]{7}$/, "")
    .toLowerCase();

const NORMALIZED_IMAGE_TO_SLUG = Object.fromEntries(
  Object.entries(IMAGE_TO_SLUG).map(([file, slug]) => [normalizeFilename(file), slug])
);

// Accepts a backend item ({slug?, image}) or a bare image URL.
export function getProductionSlug(itemOrImageUrl) {
  if (!itemOrImageUrl) return null;
  const item = typeof itemOrImageUrl === "string" ? { image: itemOrImageUrl } : itemOrImageUrl;
  // A stable slug from the backend wins over the filename lookup.
  if (item.slug) return String(item.slug);
  if (!item.image) return null;
  const filename = item.image.split("/").pop().split("?")[0];
  return IMAGE_TO_SLUG[filename] || NORMALIZED_IMAGE_TO_SLUG[normalizeFilename(filename)] || null;
}

// URL segment for an API item: the readable curated slug when we know the item,
// otherwise the backend id (as a string), otherwise null.
export function getItemSlug(item) {
  const known = getProductionSlug(item);
  if (known) return known;
  if (item?.id !== undefined && item?.id !== null) return String(item.id);
  return null;
}

export default IMAGE_TO_SLUG;
