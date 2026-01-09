import { mockCheckUrl } from "../src/services/mock.service";

describe("mockCheckUrl", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns valid for URLs ending with known domain extensions", async () => {
    const promise = mockCheckUrl("https://example.com");
    // Advance by max possible delay (2000ms) to ensure resolution
    jest.advanceTimersByTime(2000);
    await expect(promise).resolves.toEqual({ exists: true });
  });

  it("returns file for URLs ending with known file extensions", async () => {
    const promise = mockCheckUrl("https://example.com/file.txt");
    jest.advanceTimersByTime(2000);
    await expect(promise).resolves.toEqual({ exists: true, urlType: "file" });
  });

  it("returns folder for URLs ending with /", async () => {
    const promise = mockCheckUrl("https://example.com/folder/");
    jest.advanceTimersByTime(2000);
    await expect(promise).resolves.toEqual({ exists: true, urlType: "folder" });
  });

  it("returns not exists for URLs without known extensions", async () => {
    const promise = mockCheckUrl("https://example.com/unknown");
    jest.advanceTimersByTime(2000);
    await expect(promise).resolves.toEqual({ exists: false });
  });
});