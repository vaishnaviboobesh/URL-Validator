import { mockCheckUrl } from "../src/services/mock.service";

describe("mockCheckUrl", () => {
  jest.useFakeTimers();

  it("returns file for URLs ending with known extensions", async () => {
    const promise = mockCheckUrl("https://example.com/file.txt");
    jest.advanceTimersByTime(1000);
    await expect(promise).resolves.toEqual({ exists: true, urlType: "file" });
  });

  it("returns folder for URLs ending with /", async () => {
    const promise = mockCheckUrl("https://example.com/folder/");
    jest.advanceTimersByTime(1000);
    await expect(promise).resolves.toEqual({ exists: true, urlType: "folder" });
  });

  it("returns not exists for other URLs", async () => {
    const promise = mockCheckUrl("https://example.com/unknown");
    jest.advanceTimersByTime(1000);
    await expect(promise).resolves.toEqual({ exists: false });
  });

  it("rejects with AbortError if aborted", async () => {
    const controller = new AbortController();
    const promise = mockCheckUrl("https://example.com/file.txt", controller.signal);
    controller.abort();
    await expect(promise).rejects.toThrow("Aborted");
  });
});
