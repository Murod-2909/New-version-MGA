// Gallery photos, service "works" and project photos can also be short videos.
// A video item from the backend looks like a photo item plus a few fields:
//   { id, media_type: "video", video: "<mp4 url>", image: "<poster>", thumbnail: "<small poster>", duration?: seconds }
// so everything that only knows photos keeps working (it just shows the poster).
export const isVideo = (item) => !!item && (item.media_type === "video" || !!item.video);

// Image to show for an item in a grid/slider: small poster/thumbnail first.
export const mediaPoster = (item) => item?.thumbnail || item?.image || "";

// 75 -> "1:15", 8 -> "0:08"; null for missing/invalid values.
export const formatDuration = (seconds) => {
  const total = Math.round(Number(seconds));
  if (!Number.isFinite(total) || total <= 0) return null;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};
