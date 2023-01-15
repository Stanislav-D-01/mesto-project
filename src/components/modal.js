import {checkValid, toggleButton} from './validate.js';


export function openPopup (popup) {

  const inputList = Array.from(popup.querySelectorAll('.popup__input-field'));
  const buttonEl = popup.querySelector('.popup__button-save');
  inputList.forEach(function (inputEl){
   checkValid (popup, inputEl);
   toggleButton (inputList, buttonEl);
 });
popup.classList.add ('popup_opened');
};

export function closePopup () {
  const openPopup = document.querySelector('.popup_opened')
  openPopup.classList.remove('popup_opened');
  //popup.classList.remove ('popup_opened');
};

export function addListenerPopup () {
  const listPopup = document.querySelectorAll('.popup');
  listPopup.forEach((PopupEl) =>{
    PopupEl.addEventListener('click', (evt)=>{
      if (evt.target.classList.contains('popup')){
        closePopup();
      };
    });

  });
};

