import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(element, submitForm) {
    super(element);
    this._element = element;
    this._submitForm = submitForm;
    this._form = element.querySelector("form");
  }

  _getInputValues() {
    const data = {};
    const inputs = this._element.querySelectorAll("input");
    inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = this._getInputValues();
      this._submitForm(data["name-new-mesto"], data["link-new-mesto"]).then(
        () => this.close()
      );
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
