export const validationVar = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_type_disable',
  inputErrorClass: 'input-field_type_error',
  errorClass: 'input-error_active',
};
export function enableValidation (validationVar){
formValidation ();
function checkValid (formEl, inputEl){
  if (inputEl.validity.patternMismatch){
    inputEl.setCustomValidity(inputEl.dataset.errorMessage);
  }else{
    inputEl.setCustomValidity('');
  }
  if (inputEl.validity.valid === false) {
    showInputErr(formEl, inputEl, inputEl.validationMessage);

  } else {
    hideInputErr (formEl, inputEl)
  }
};

function showInputErr (formEl, inputEl, ErrMessage){
const errElement = formEl.querySelector(`.${inputEl.id}-error`);
errElement.textContent = ErrMessage;
errElement.classList.add(validationVar.errorClass);
inputEl.classList.add(validationVar.inputErrorClass);
};

function hideInputErr (formEl, inputEl){
const errElement = formEl.querySelector(`.${inputEl.id}-error`);
errElement.textContent = '';
errElement.classList.remove(validationVar.errorClass);
inputEl.classList.remove(validationVar.inputErrorClass);
};

function addFormListener (formEl){
  const inputList = Array.from(formEl.querySelectorAll(validationVar.inputSelector));
  const buttonEl = formEl.querySelector(validationVar.submitButtonSelector);
  toggleButton (inputList, buttonEl);
  inputList.forEach(function (inputEl){
      inputEl.addEventListener('input', () => {
      checkValid (formEl, inputEl);
      toggleButton (inputList, buttonEl);
    });
  });

  };

function formValidation () {
const formList = Array.from(document.querySelectorAll(validationVar.formSelector));
formList.forEach((formEl) => {
  addFormListener (formEl)

});
};



function findInvalidInput (inputList) {
  return inputList.some ( (inputEl) =>
      !inputEl.validity.valid
   );
 };

function toggleButton (inputList, buttonEl) {
  if (findInvalidInput(inputList))  {
    buttonEl.disabled = true;
    buttonEl.classList.add(validationVar.inactiveButtonClass)
  }else{
    buttonEl.disabled = false;
    buttonEl.classList.remove(validationVar.inactiveButtonClass)
  };
};
};
