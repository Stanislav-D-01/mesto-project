export class Popup {
  constructor(element) {
    this._element = element;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
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
