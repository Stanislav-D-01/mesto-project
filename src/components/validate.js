
import { closePopup} from "./modal.js";

export function checkValid (formEl, inputEl){
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

export function showInputErr (formEl, inputEl, ErrMessage){
const errElement = formEl.querySelector(`.${inputEl.id}-error`);
errElement.textContent = ErrMessage;
errElement.classList.add('input-error_active');
inputEl.classList.add('input-field_type_error');
};

export function hideInputErr (formEl, inputEl){
const errElement = formEl.querySelector(`.${inputEl.id}-error`);
errElement.textContent = '';
errElement.classList.remove('input-error_active');
inputEl.classList.remove('input-field_type_error');
}

export function addFormListener (formEl){
  const inputList = Array.from(formEl.querySelectorAll('.popup__input-field'));
  const buttonEl = formEl.querySelector('.popup__button-save');
  toggleButton (inputList, buttonEl);
  inputList.forEach(function (inputEl){
      inputEl.addEventListener('input', () => {
      checkValid (formEl, inputEl);
      toggleButton (inputList, buttonEl);
    });
  });

  };

export function formValidation () {
const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formEl) => {
  addFormListener (formEl)

});
};

export function addClosePopupEscape () {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'){
      closePopup();
    }
  })
};

export function findInvalidInput (inputList) {
  return inputList.some ( (inputEl) =>
      !inputEl.validity.valid
   );
 };

 export function toggleButton (inputList, buttonEl) {
  if (findInvalidInput(inputList))  {
    buttonEl.disabled = true;
    buttonEl.classList.add('popup__button-save_type_disable')
  }else{
    buttonEl.disabled = false;
    buttonEl.classList.remove('popup__button-save_type_disable')
  }
}
