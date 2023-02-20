export function resetError(
  formEl,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass
) {
  const inputList = Array.from(formEl.querySelectorAll(inputSelector));
  const buttonEl = formEl.querySelector(submitButtonSelector);
  inputList.forEach((inputEl) => {
    hideInputErr(
      formEl,
      inputEl,
      validationVar.errorClass,
      validationVar.inputErrorClass
    );
  });
  disableSubmitButton(buttonEl);
  buttonEl.classList.add(inactiveButtonClass);
}

export class FormValidator {
  constructor(data, formElement) {
    this._formEl = formElement;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
  }

  _checkValid(inputEl) {
    if (inputEl.validity.patternMismatch) {
      inputEl.setCustomValidity(inputEl.dataset.errorMessage);
    } else {
      inputEl.setCustomValidity("");
    }
    if (inputEl.validity.valid === false) {
      this._showInputErr(inputEl);
    } else {
      this._hideInputErr(inputEl);
    }
  }

  _showInputErr(inputEl) {
    const errElement = this._formEl.querySelector(`.${inputEl.id}-error`);
    errElement.textContent = inputEl.validationMessage;
    errElement.classList.add(this._errorClass);
    inputEl.classList.add(this._inputErrorClass);
  }

  _hideInputErr(inputEl) {
    const errElement = this._formEl.querySelector(`.${inputEl.id}-error`);
    errElement.textContent = "";
    errElement.classList.remove(this._errorClass);
    inputEl.classList.remove(this._inputErrorClass);
  }

  _findInvalidInput(inputList) {
    return inputList.some((inputEl) => !inputEl.validity.valid);
  }

  _toggleButton(inputList, buttonEl) {
    if (this._findInvalidInput(inputList)) {
      this._disableSubmitButton(buttonEl);
      buttonEl.classList.add(this._inactiveButtonClass);
    } else {
      buttonEl.disabled = false;
      buttonEl.classList.remove(this._inactiveButtonClass);
    }
  }

  _disableSubmitButton(buttonElement) {
    buttonElement.disabled = true;
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    const buttonEl = this._formEl.querySelector(this._submitButtonSelector);
    this._toggleButton(inputList, buttonEl);
    inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkValid(inputEl);
        this._toggleButton(inputList, buttonEl);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
