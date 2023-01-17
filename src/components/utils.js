import { validationVar } from "./validate";
export function showInputErr(formEl, inputEl, ErrMessage) {
  const errElement = formEl.querySelector(`.${inputEl.id}-error`);
  errElement.textContent = ErrMessage;
  errElement.classList.add(validationVar.errorClass);
  inputEl.classList.add(validationVar.inputErrorClass);
}

export function hideInputErr(formEl, inputEl) {
  const errElement = formEl.querySelector(`.${inputEl.id}-error`);
  errElement.textContent = "";
  errElement.classList.remove(validationVar.errorClass);
  inputEl.classList.remove(validationVar.inputErrorClass);
}

export function resetError(formEl) {
  const inputList = Array.from(
    formEl.querySelectorAll(validationVar.inputSelector)
  );
  const buttonEl = formEl.querySelector(validationVar.submitButtonSelector);
  inputList.forEach((inputEl) => {
    hideInputErr(formEl, inputEl);
  });
  buttonEl.disabled = true;
  buttonEl.classList.add(validationVar.inactiveButtonClass);
}
