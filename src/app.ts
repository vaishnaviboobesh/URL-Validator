import { debounce } from "./utilities/debounce.function.js";
import { mockCheckUrl } from "./services/mock.service.js";
import { isValidUrl } from "./utilities/url-format-checker.function.js";
import { setStatus } from "./ui/status-renderer.function.js";

const urlInput = document.getElementById("urlInput") as HTMLInputElement;
const statusTextElement = document.getElementById(
  "statusText"
) as HTMLParagraphElement;

/**
 * Request sequence number to track the latest request.
 */
let currentRequestId = 0;

urlInput.addEventListener("input", () => {
  // increments request id as soon as the input changed
  ++currentRequestId;

  const inputValue = urlInput.value.trim();

  if (inputValue.length == 0) {
    setStatus(statusTextElement, { type: "idle", message: "" });
    return;
  }

  if (!isValidUrl(inputValue)) {
    setStatus(statusTextElement, { type: "error", message: "Invalid URL." });
    return;
  }
  // resetting status to loading immediately when input changed
  setStatus(statusTextElement, { type: "loading", message: "Checking..." });

  const capturedRequestId = currentRequestId;
  checkUrlWithDebounce(inputValue, capturedRequestId);
});

const checkUrlWithDebounce = debounce(
  async (url: string, thisRequestId: number) => {
    try {
      const checkResult = await mockCheckUrl(url);

      // Ignore outdated responses if requestId is not current
      if (thisRequestId !== currentRequestId) {
        return;
      }

      if (!checkResult.exists) {
        setStatus(statusTextElement, {
          type: "error",
          message: "URL doesn't exist.",
        });
        return;
      }

      setStatus(statusTextElement, {
        type: "success",
        message: `It's a ${
          checkResult.urlType === "file"
            ? "file"
            : checkResult.urlType === "folder"
            ? "folder"
            : "valid"
        } URL.`,
      });
    } catch {
      // Ignore errors from outdated requests
      if (thisRequestId !== currentRequestId) {
        return;
      }

      setStatus(statusTextElement, {
        type: "error",
        message: "Failed to check URL. Please try again.",
      });
    }
  },
  300
);
