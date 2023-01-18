import "../pages/index.css";
import { enableValidation, validationVar, resetError } from "./validate.js";
import { openPopup, closePopup, addListenerPopup } from "./modal.js";
import {
  pastNewMesto,
  handleAddMestoFormSubmit,
  nameMestoInput,
  linkMestoInput,
  popupAddMesto,
  cardsContainer,
} from "./card.js";

import { initialCards } from "./initial-cards";

const formAddMesto = document.querySelector("form[name=add-new-mesto]");
const buttonAddMesto = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonsClose = document.querySelectorAll(".popup__icon-close");
const formEditUser = document.querySelector('form[name="edit-user"]');
const buttonSaveMesto = popupAddMesto.querySelector(".popup__button-save");
const profileUserName = document.querySelector(".profile__user-name");
const profileUserAbout = document.querySelector(".profile__user-about");
const popupEditProfile = document.querySelector(".profile-popup");
const nameInput = document.querySelector("input[name=name-user]");
const aboutInput = document.querySelector("input[name=about-user]");

enableValidation(validationVar);
addListenerPopup();

function handleProfileFormSubmit(evt) {
  //функция заменяющая стандартную отправку формы
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserAbout.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

formEditUser.addEventListener("submit", handleProfileFormSubmit);

buttonsClose.forEach((button) => {
  button.addEventListener("click", closePopup);
});

buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileUserName.textContent;
  aboutInput.value = profileUserAbout.textContent;
  openPopup(popupEditProfile);
  resetError(
    popupEditProfile,
    validationVar.inputSelector,
    validationVar.submitButtonSelector,
    validationVar.inactiveButtonClass
  );
});

buttonAddMesto.addEventListener("click", () => {
  nameMestoInput.value = "";
  linkMestoInput.value = "";
  openPopup(popupAddMesto);
  resetError(
    popupAddMesto,
    validationVar.inputSelector,
    validationVar.submitButtonSelector,
    validationVar.inactiveButtonClass
  );
});

initialCards.forEach((elem) => {
  pastNewMesto(elem.name, elem.link, cardsContainer);
});

formAddMesto.addEventListener("submit", handleAddMestoFormSubmit); //слушатель отправки формы добавления нового места
