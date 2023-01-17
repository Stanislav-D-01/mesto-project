import { showInputErr, hideInputErr } from "./utils.js";

export const validationVar = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-field",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_type_disable",
  inputErrorClass: "input-field_type_error",
  errorClass: "input-error_active",
};
export function enableValidation(validationVar) {
  formValidation();

  function formValidation() {
    const formList = Array.from(
      document.querySelectorAll(validationVar.formSelector)
    );
    formList.forEach((formEl) => {
      addFormListener(formEl);
    });
  }

  function addFormListener(formEl) {
    const inputList = Array.from(
      formEl.querySelectorAll(validationVar.inputSelector)
    );
    const buttonEl = formEl.querySelector(validationVar.submitButtonSelector);
    toggleButton(inputList, buttonEl);
    inputList.forEach(function (inputEl) {
      inputEl.addEventListener("input", () => {
        checkValid(formEl, inputEl);
        toggleButton(inputList, buttonEl);
      });
    });
  }

  function checkValid(formEl, inputEl) {
    if (inputEl.validity.patternMismatch) {
      inputEl.setCustomValidity(inputEl.dataset.errorMessage);
    } else {
      inputEl.setCustomValidity("");
    }
    if (inputEl.validity.valid === false) {
      showInputErr(formEl, inputEl, inputEl.validationMessage);
    } else {
      hideInputErr(formEl, inputEl);
    }
  }

  function findInvalidInput(inputList) {
    return inputList.some((inputEl) => !inputEl.validity.valid);
  }

  function toggleButton(inputList, buttonEl) {
    if (findInvalidInput(inputList)) {
      buttonEl.disabled = true;
      buttonEl.classList.add(validationVar.inactiveButtonClass);
    } else {
      buttonEl.disabled = false;
      buttonEl.classList.remove(validationVar.inactiveButtonClass);
    }
  }

  function resetError(formEl, config) {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    // очищаем ошибки валидации
    inputList.forEach((inputElement) =>
      hideInputError(formElement, inputElement, config)
    );
    // актуализируем состояние кнопки сабмита
    toggleButtonState(formElement, inputList, config);
  }
}
