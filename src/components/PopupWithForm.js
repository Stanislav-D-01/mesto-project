import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(element, submitForm) {
    super(element);
    this._element = element;
    this._submitForm = submitForm;
    this._form = element.querySelector("form");
    this._data = {};
    this._inputs = this._element.querySelectorAll("input");
    this._submitButton = this._element.querySelector(".popup__button-save");
  }

  _getInputValues() {
    this._inputs.forEach((input) => {
      this._data[input.name] = input.value;
    });
    return this._data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();

      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = "Сохранение...";
      this._data = this._getInputValues();
      this._submitForm(this._data)
        .then(() => this.close())

        .finally(() => {
          this._submitButton.textContent = initialText;
        });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
