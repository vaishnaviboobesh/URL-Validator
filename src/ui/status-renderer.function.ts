import { Status } from "./status.type";

/*
 ** Updates status text and style class based on the given status type
 */
export function setStatus(
  statusTextElement: HTMLParagraphElement,
  status: Status
) {
  statusTextElement.className = "";
  statusTextElement.textContent = "";

  switch (status.type) {
    case "loading":
      statusTextElement.textContent = status.message;
      statusTextElement.classList.add("status-loading");
      break;

    case "success":
      statusTextElement.textContent = status.message;
      statusTextElement.classList.add("status-success");
      break;

    case "error":
      statusTextElement.textContent = status.message;
      statusTextElement.classList.add("status-error");
      break;

    case "idle":
      statusTextElement.textContent = status.message;
      break;
  }
}
