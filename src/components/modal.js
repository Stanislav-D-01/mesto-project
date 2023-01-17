import { resetError } from "./utils";
const listPopup = document.querySelectorAll(".popup");

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", checkKeyEscape);
  resetError(popup);
}

export function closePopup() {
  const openPopup = document.querySelector(".popup_opened");

  openPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", checkKeyEscape);
}

export function addListenerPopup() {
  listPopup.forEach((popupEl) => {
    popupEl.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        closePopup();
      }
    });
  });
}

export function checkKeyEscape(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

export function removeClosePopupEscape() {}
