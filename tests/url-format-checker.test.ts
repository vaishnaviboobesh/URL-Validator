import { isValidUrl } from "../src/utilities/url-format-checker.function";

describe("isValidUrl", () => {
  it("returns true for valid URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://localhost:3000/test")).toBe(true);
  });

  it("returns false for invalid URLs", () => {
    expect(isValidUrl("invalid-url")).toBe(false);
    expect(isValidUrl("example")).toBe(false);
    expect(isValidUrl("ftp://")).toBe(false);
  });
});