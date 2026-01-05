import { debounce } from "./debounce.function.js";
import { mockCheckUrl } from "./mock.service.js";
import { isValidUrl } from "./url-format-checker.function.js";

const urlInput = document.getElementById("urlInput") as HTMLInputElement;
const statusText = document.getElementById("statusText") as HTMLParagraphElement;


urlInput.addEventListener("input", () => {
  const inputValue = urlInput.value.trim();

  if (!isValidUrl(inputValue)) {
    setStatus({ type: "error", message: "Invalid URL." });
    return;
  }
  checkUrlWithDebounce(inputValue);
});

const checkUrlWithDebounce = debounce(async (urlInput: string) => {
  setStatus({ type: "loading", message: "Checking..." });
  const checkResult = await mockCheckUrl(urlInput);

  if (!checkResult.exists) {
    setStatus({ type: "error", message: "URL doesn't exist." });
    return;
  }

  setStatus({
    type: "success",
    message: `It's a ${
      checkResult.urlType === "file" ? "file" : "folder"
    } URL.`,
  });
}, 300);

type Status =
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | { type: "idle" };

/*
** Updates status text and class based on the given status type
*/
function setStatus(status: Status) {
  statusText.className = "";
  statusText.textContent = "";

  switch (status.type) {
    case "loading":
      statusText.textContent = status.message;
      statusText.classList.add("status-loading");
      break;

    case "success":
      statusText.textContent = status.message;
      statusText.classList.add("status-success");
      break;

    case "error":
      statusText.textContent = status.message;
      statusText.classList.add("status-error");
      break;
  }
}

