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
      showInputErr(
        formEl,
        inputEl,
        inputEl.validationMessage,
        validationVar.errorClass,
        validationVar.inputErrorClass
      );
    } else {
      hideInputErr(
        formEl,
        inputEl,
        validationVar.errorClass,
        validationVar.inputErrorClass
      );
    }
  }

  function findInvalidInput(inputList) {
    return inputList.some((inputEl) => !inputEl.validity.valid);
  }

  function toggleButton(inputList, buttonEl) {
    if (findInvalidInput(inputList)) {
      disableSubmitButton(buttonEl);
      buttonEl.classList.add(validationVar.inactiveButtonClass);
    } else {
      buttonEl.disabled = false;
      buttonEl.classList.remove(validationVar.inactiveButtonClass);
    }
  }
}

function showInputErr(
  formEl,
  inputEl,
  ErrMessage,
  classErrorActive,
  classInputError
) {
  const errElement = formEl.querySelector(`.${inputEl.id}-error`);
  errElement.textContent = ErrMessage;
  errElement.classList.add(classErrorActive);
  inputEl.classList.add(classInputError);
}

function hideInputErr(formEl, inputEl, classErrorActive, classInputError) {
  const errElement = formEl.querySelector(`.${inputEl.id}-error`);
  errElement.textContent = "";
  errElement.classList.remove(classErrorActive);
  inputEl.classList.remove(classInputError);
}

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

function disableSubmitButton(buttonElement) {
  buttonElement.disabled = true;
}
