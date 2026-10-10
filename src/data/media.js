// Gallery photos, service "works" and project photos can also be short videos.
// A video item from the backend looks like a photo item plus a few fields:
//   { id, media_type: "video", video: "<mp4 url>", image: "<poster>", thumbnail: "<small poster>", duration?: seconds }
// or, when the admin pastes a link instead of uploading a file:
//   { id, media_type: "video", video_url: "https://www.instagram.com/reel/XXXX/", image: "<poster>" }
// so everything that only knows photos keeps working (it just shows the poster).

const YOUTUBE_ID = /^[\w-]{11}$/;
const INSTAGRAM_CODE = /^[\w-]{5,}$/;

// Turns a pasted Instagram or YouTube link into what the lightbox needs, or null for
// anything else. Only the validated id ends up in the embed URL, so a hand-edited
// value in the admin can't inject an arbitrary iframe address.
export const parseVideoLink = (link) => {
  if (typeof link !== "string" || !link.trim()) return null;
  let url;
  try {
    url = new URL(/^https?:\/\//i.test(link.trim()) ? link.trim() : `https://${link.trim()}`);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^(www|m)\./i, "").toLowerCase();
  const parts = url.pathname.split("/").filter(Boolean);

  if (host === "instagram.com") {
    // /reel/CODE, /p/CODE, /tv/CODE, /reels/CODE and /username/reel/CODE
    const at = parts.findIndex((part) => ["p", "reel", "reels", "tv"].includes(part));
    const code = at >= 0 ? parts[at + 1] : null;
    if (!code || !INSTAGRAM_CODE.test(code)) return null;
    const kind = parts[at] === "p" || parts[at] === "tv" ? parts[at] : "reel";
    return {
      provider: "instagram",
      id: code,
      embedUrl: `https://www.instagram.com/${kind}/${code}/embed`,
      watchUrl: `https://www.instagram.com/${kind}/${code}/`,
    };
  }

  let youtubeId = null;
  if (host === "youtu.be") youtubeId = parts[0];
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (parts[0] === "watch") youtubeId = url.searchParams.get("v");
    else if (["shorts", "embed", "live", "v"].includes(parts[0])) youtubeId = parts[1];
  }
  if (youtubeId && YOUTUBE_ID.test(youtubeId)) {
    return {
      provider: "youtube",
      id: youtubeId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
      watchUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
      poster: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    };
  }
  return null;
};

// The embeddable link of an item (when it has no uploaded file), or null.
export const embedOf = (item) => (item && !item.video ? parseVideoLink(item.video_url) : null);

export const isVideo = (item) =>
  !!item && (item.media_type === "video" || !!item.video || !!embedOf(item));

// Image to show for an item in a grid/slider: small poster/thumbnail first. A pasted
// YouTube link gets its own thumbnail when no poster was uploaded; Instagram has no
// public thumbnail, so those items need a poster (otherwise "" and callers show a placeholder).
export const mediaPoster = (item) =>
  item?.thumbnail || item?.image || embedOf(item)?.poster || "";

// 75 -> "1:15", 8 -> "0:08"; null for missing/invalid values.
export const formatDuration = (seconds) => {
  const total = Math.round(Number(seconds));
  if (!Number.isFinite(total) || total <= 0) return null;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};
