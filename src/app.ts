import { debounce } from "./utilities/debounce.function.js";
import { mockCheckUrl } from "./services/mock.service.js";
import { isValidUrl } from "./utilities/url-format-checker.function.js";
import { setStatus } from "./ui/status-renderer.function.js";

const urlInput = document.getElementById("urlInput") as HTMLInputElement;
const statusTextElement = document.getElementById(
  "statusText"
) as HTMLParagraphElement;

urlInput.addEventListener("input", () => {
  const inputValue = urlInput.value.trim();

  if (!isValidUrl(inputValue)) {
    setStatus(statusTextElement, { type: "error", message: "Invalid URL." });
    return;
  }
  checkUrlWithDebounce(inputValue);
});

let currentAbortController: AbortController | null = null;

const checkUrlWithDebounce = debounce(async (urlInput: string) => {
  currentAbortController?.abort();
  currentAbortController = new AbortController();
  const signalToAbort = currentAbortController.signal;

  setStatus(statusTextElement, { type: "loading", message: "Checking..." });

  try {
    const checkResult = await mockCheckUrl(urlInput, signalToAbort);

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
  } catch (error) {
    if ((error as DOMException).name == "AbortError") {
      // Ignore outdated server responses
      return;
    }
    setStatus(statusTextElement, {
      type: "error",
      message: "URL doesn't exist.",
    });
  }
}, 300);
