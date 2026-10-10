import { embedOf, formatDuration, isVideo, mediaPoster, parseVideoLink } from "./media";

describe("media helpers", () => {
  test("isVideo detects videos by type or by a video url", () => {
    expect(isVideo({ media_type: "video" })).toBe(true);
    expect(isVideo({ video: "https://x/y.mp4" })).toBe(true);
    expect(isVideo({ media_type: "image", image: "a.webp" })).toBe(false);
    expect(isVideo({ image: "a.webp" })).toBe(false);
    expect(isVideo(null)).toBe(false);
  });

  test("mediaPoster prefers the thumbnail", () => {
    expect(mediaPoster({ thumbnail: "t.webp", image: "i.webp" })).toBe("t.webp");
    expect(mediaPoster({ image: "i.webp" })).toBe("i.webp");
    expect(mediaPoster(undefined)).toBe("");
  });

  test("formatDuration", () => {
    expect(formatDuration(75)).toBe("1:15");
    expect(formatDuration(8)).toBe("0:08");
    expect(formatDuration("12.4")).toBe("0:12");
    expect(formatDuration(0)).toBeNull();
    expect(formatDuration(null)).toBeNull();
    expect(formatDuration("abc")).toBeNull();
  });

  test("parseVideoLink understands Instagram links", () => {
    const expected = {
      provider: "instagram",
      id: "DAbC123xyz",
      embedUrl: "https://www.instagram.com/reel/DAbC123xyz/embed",
      watchUrl: "https://www.instagram.com/reel/DAbC123xyz/",
    };
    expect(parseVideoLink("https://www.instagram.com/reel/DAbC123xyz/?igsh=abc")).toEqual(expected);
    expect(parseVideoLink("instagram.com/mgareklama/reel/DAbC123xyz")).toEqual(expected);
    expect(parseVideoLink("https://instagram.com/reels/DAbC123xyz/")).toEqual(expected);
    expect(parseVideoLink("https://www.instagram.com/p/DAbC123xyz/").embedUrl).toBe(
      "https://www.instagram.com/p/DAbC123xyz/embed"
    );
    expect(parseVideoLink("https://www.instagram.com/mgareklama/")).toBeNull();
  });

  test("parseVideoLink understands YouTube links", () => {
    const id = "dQw4w9WgXcQ";
    ["https://www.youtube.com/watch?v=" + id, "https://youtu.be/" + id + "?t=4",
      "https://www.youtube.com/shorts/" + id, "https://m.youtube.com/embed/" + id].forEach((link) => {
      const parsed = parseVideoLink(link);
      expect(parsed.provider).toBe("youtube");
      expect(parsed.embedUrl).toBe("https://www.youtube-nocookie.com/embed/" + id);
    });
    expect(parseVideoLink("https://www.youtube.com/watch?v=short")).toBeNull();
  });

  test("parseVideoLink rejects everything else", () => {
    expect(parseVideoLink("https://evil.example/reel/abcdef")).toBeNull();
    expect(parseVideoLink("https://instagram.com.evil.example/reel/abcdef")).toBeNull();
    expect(parseVideoLink("javascript:alert(1)")).toBeNull(); // eslint-disable-line no-script-url
    expect(parseVideoLink("")).toBeNull();
    expect(parseVideoLink(null)).toBeNull();
  });

  test("items with a pasted link count as videos", () => {
    const item = { image: "poster.webp", video_url: "https://www.instagram.com/reel/DAbC123xyz/" };
    expect(isVideo(item)).toBe(true);
    expect(embedOf(item).provider).toBe("instagram");
    // an uploaded file wins over a link
    expect(embedOf({ ...item, video: "https://x/y.mp4" })).toBeNull();
    expect(isVideo({ image: "a.webp", video_url: "https://example.com/x" })).toBe(false);
  });

  test("mediaPoster falls back to the YouTube thumbnail only", () => {
    expect(mediaPoster({ video_url: "https://youtu.be/dQw4w9WgXcQ" })).toBe(
      "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    );
    expect(mediaPoster({ video_url: "https://www.instagram.com/reel/DAbC123xyz/" })).toBe("");
  });
});
