type UrlCheckResult = {
  exists: boolean;
  urlType?: "file" | "folder";
};

const MOCK_DOMAINS = [
  ".com",
  ".net",
  ".org",
  ".de",
];

const MOCK_FILE_EXTENSIONS = [
  ".txt",
  ".json",
  ".jpg",
  ".png",
  ".pdf",
  ".csv",
  ".html",
];

/**
 * Mocked API method that checks URL existence
 * Assumes, ending with "/" as folder, contains "." as file
 * @param {string} urlInput - URL value to check
 * @returns {Promise<UrlCheckResult>} - A promise with check result
 */
export function mockCheckUrl(
  urlInput: string,
  signal?: AbortSignal
): Promise<UrlCheckResult> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (MOCK_FILE_EXTENSIONS.some((ext) => urlInput.endsWith(ext))) {
        return resolve({ exists: true, urlType: "file" });
      }
      if (urlInput.endsWith("/")) {
        return resolve({ exists: true, urlType: "folder" });
      }
      if (MOCK_DOMAINS.some((ext) => urlInput.endsWith(ext))) {
        return resolve({ exists: true });
      }
      return resolve({ exists: false });
    }, 1000);

    signal?.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}
