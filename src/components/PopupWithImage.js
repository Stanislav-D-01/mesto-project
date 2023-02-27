import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(element) {
    super(element);
    this._element = element;
    this._popupImg = this._element.querySelector(".popup__img");
    this._popupNameImg = this._element.querySelector(".popup__name-img");
  }

  open(image, title) {
    this._popupImg.src = image;
    this._popupImg.alt = title;
    this._popupNameImg.textContent = title;

    super.open();
  }
}
