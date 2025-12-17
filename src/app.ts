import { debounce } from "./debounce.function.js";
import { mockCheckUrl } from "./mock.service.js";
import { isValidUrl } from "./url-format-checker.function.js";

const urlInput = document.getElementById("urlInput") as HTMLInputElement;
const errorText = document.getElementById("errorText") as HTMLParagraphElement;
const successText = document.getElementById(
  "successText"
) as HTMLParagraphElement;

urlInput.addEventListener("input", () => {
  const inputValue = urlInput.value.trim();

  if (!isValidUrl(inputValue)) {
    errorText.textContent = "Invalid URL.";
    successText.textContent = "";
    return;
  }

  checkUrlWithDebounce(inputValue);
});

const checkUrlWithDebounce = debounce(async (urlInput: string) => {
  const checkResult = await mockCheckUrl(urlInput);

  if (checkResult.exists) {
    successText.textContent = `It's a ${
      checkResult.urlType == "file" ? "file" : "fodler"
    } URL.`;
    errorText.textContent = "";
  } else {
    errorText.textContent = "URL doesn't exist.";
    successText.textContent = "";
    return;
  }
}, 300);
