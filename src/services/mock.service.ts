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
 * Mocked API method that checks URL existence.
 * Simulates a real backend API with variable response times.
 * Assumes, ending with "/" as folder, contains ".{file_extensions}" as file, and
 * contains known domain endings as a valid URL
 * @param {string} urlInput - URL value to check
 * @returns {Promise<UrlCheckResult>} - A promise with check result
 */
export function mockCheckUrl(urlInput: string): Promise<UrlCheckResult> {
  // Simulate variable network latency (500ms - 2000ms)
  // earlier requests might resolve after later ones
  const randomDelay = Math.floor(Math.random() * 1500) + 500;

  return new Promise((resolve) => {
    setTimeout(() => {
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
    }, randomDelay);
  });
}