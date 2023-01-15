import { formValidation, addClosePopupEscape} from './validate.js';
import {handleProfileFormSubmit} from "./utils.js";
import {openPopup, closePopup, addListenerPopup} from "./modal.js";
import {initialCards, pastNewMesto, handleAddMestoFormSubmit} from "./card.js";

const popupEditProfile = document.querySelector('.profile-popup');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupAddMesto = document.querySelector('.add-mesto-popup');
const formAddMesto = document.querySelector('form[name="add-new-mesto"');
const buttonAddMesto = document.querySelector('.profile__add-button');
const buttonsClose = document.querySelectorAll('.popup__icon-close');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserAbout = document.querySelector('.profile__user-about');
const formElement = document.querySelector('form[name="edit-user"');
const nameInput = document.querySelector('input[name="name-user"');
const aboutInput = document.querySelector('input[name="about-user"');


const nameMestoInput = document.querySelector('input[name="name-new-mesto"');
const linkMestoInput = document.querySelector('input[name="link-new-mesto"');
const popupViewImg = document.querySelector('.popup-views-img');
const popupImg = document.querySelector('.popup__img');
const popupNameImg = document.querySelector('.popup__name-img');

addClosePopupEscape ()
formValidation ();
addListenerPopup ();

buttonsClose.forEach((button)=>{
  const popup = button.closest('.popup');
  //button.addEventListener('click', ()=>{closePopup(popup)});
  button.addEventListener('click', closePopup);
})

buttonEditProfile.addEventListener('click', () =>{
  nameInput.value = profileUserName.textContent;
  aboutInput.value = profileUserAbout.textContent;
  openPopup (popupEditProfile)
});

formElement.addEventListener('submit', handleProfileFormSubmit);

buttonAddMesto.addEventListener('click', () =>{
  nameMestoInput.value = '';
  linkMestoInput.value ='';
  openPopup (popupAddMesto)
});

initialCards.forEach((elem)=>{pastNewMesto(elem.name, elem.link)});

formAddMesto.addEventListener('submit', handleAddMestoFormSubmit);//слушатель отправки формы добавления нового места


