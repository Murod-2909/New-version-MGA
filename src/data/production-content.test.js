import { getItemSlug, getProductionSlug } from "./production-content";

describe("production slug lookup", () => {
  const base = "https://api.mgareklama.com/media/services-icon/2025/07/19/";

  test("matches the original PNG filename", () => {
    expect(getProductionSlug(`${base}UV_PECHAT.png`)).toBe("uv-printing");
  });

  test("survives WebP conversion and Django's collision suffix", () => {
    expect(getProductionSlug(`${base}UV_PECHAT.webp`)).toBe("uv-printing");
    expect(getProductionSlug(`${base}UV_PECHAT_aB3dE9x.webp`)).toBe("uv-printing");
    expect(getProductionSlug(`${base}CNC_rover_Qw12ErT.webp?x=1`)).toBe("cnc-cutting");
  });

  test("a backend slug wins over the filename", () => {
    expect(getItemSlug({ id: 4, slug: "custom-slug", image: `${base}UV_PECHAT.png` })).toBe("custom-slug");
  });

  test("falls back to the id, then null", () => {
    expect(getItemSlug({ id: 42, image: `${base}something-new.webp` })).toBe("42");
    expect(getItemSlug({ image: null })).toBeNull();
  });
});
