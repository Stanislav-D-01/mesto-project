import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(element) {
    super(element);
    this._element = element;
  }

  open(image, title) {
    this._element.querySelector(".popup__img").src = image;
    this._element.querySelector(".popup__name-img").textContent = title;
    super.open();
  }
}
