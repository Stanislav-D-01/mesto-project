export class Popup {
  constructor(element) {
    this._element = element;
  }

  open() {
    this._element.classList.add("popup_opened");
  }

  close() {
    this._element.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this._element
      .querySelector(".popup__icon-close")
      .addEventListener("click", () => this.close());
    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
