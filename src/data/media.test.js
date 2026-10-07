import { formatDuration, isVideo, mediaPoster } from "./media";

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
});
