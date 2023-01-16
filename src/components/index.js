import '../pages/index.css';
import {enableValidation, validationVar } from './validate.js';
import {handleProfileFormSubmit} from "./utils.js";
import {openPopup, closePopup, addListenerPopup, addClosePopupEscape} from "./modal.js";
import {initialCards, pastNewMesto, handleAddMestoFormSubmit, nameMestoInput, linkMestoInput, popupAddMesto} from "./card.js";
import {popupEditProfile, profileUserName, profileUserAbout,nameInput, aboutInput} from "./utils.js";


const formAddMesto = document.querySelector('form[name="add-new-mesto"');
const buttonAddMesto = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonsClose = document.querySelectorAll('.popup__icon-close');
const formElement = document.querySelector('form[name="edit-user"]');


enableValidation (validationVar);
addClosePopupEscape ()
addListenerPopup ();

formElement.addEventListener('submit', handleProfileFormSubmit);


buttonsClose.forEach((button)=>{
  const popup = button.closest('.popup');
  button.addEventListener('click', closePopup);
})

buttonEditProfile.addEventListener('click', () =>{
  nameInput.value = profileUserName.textContent;
  aboutInput.value = profileUserAbout.textContent;
  openPopup (popupEditProfile)

});

buttonAddMesto.addEventListener('click', () =>{
  nameMestoInput.value = '';
  linkMestoInput.value ='';
  openPopup (popupAddMesto)
});

initialCards.forEach((elem)=>{pastNewMesto(elem.name, elem.link)});

formAddMesto.addEventListener('submit', handleAddMestoFormSubmit);//слушатель отправки формы добавления нового места


