import { langFromPath, stripLang, withLang } from "./locale";

describe("locale helpers", () => {
  test("langFromPath detects only ru/uz prefixes", () => {
    expect(langFromPath("/ru/about")).toBe("ru");
    expect(langFromPath("/uz")).toBe("uz");
    expect(langFromPath("/about")).toBeNull();
    expect(langFromPath("/russia")).toBeNull();
    expect(langFromPath("/en/about")).toBeNull();
  });

  test("stripLang removes the prefix", () => {
    expect(stripLang("/ru/about")).toBe("/about");
    expect(stripLang("/uz")).toBe("/");
    expect(stripLang("/about")).toBe("/about");
    expect(stripLang("/")).toBe("/");
  });

  test("withLang adds the prefix except for English", () => {
    expect(withLang("/about", "ru")).toBe("/ru/about");
    expect(withLang("/", "uz")).toBe("/uz");
    expect(withLang("/about", "en")).toBe("/about");
    expect(withLang("/", "en")).toBe("/");
  });

  test("stripLang and withLang round-trip", () => {
    ["/", "/about", "/services/hotel-signage"].forEach((p) =>
      ["en", "ru", "uz"].forEach((l) => expect(stripLang(withLang(p, l))).toBe(p))
    );
  });
});
