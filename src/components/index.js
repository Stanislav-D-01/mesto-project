import "../pages/index.css";
import { enableValidation, validationVar, resetError } from "./validate.js";
import { openPopup, closePopup, addListenerPopup } from "./modal.js";

import { nameMestoInput, linkMestoInput, popupAddMesto } from "./card.js";
import {
  handleProfileFormSubmit,
  handleAddMestoFormSubmit,
  loadName,
  loadAbout,
  loadAvatar,
  reloadAvatar,
} from "./api";

export const formAddMesto = document.querySelector("form[name=add-new-mesto]");
const buttonAddMesto = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonsClose = document.querySelectorAll(".popup__icon-close");
const formEditUser = document.querySelector('form[name="edit-user"]');
const buttonSaveMesto = popupAddMesto.querySelector(".popup__button-save");
export const profileUserName = document.querySelector(".profile__user-name");
export const profileUserAbout = document.querySelector(".profile__user-about");
export const popupEditProfile = document.querySelector(".profile-popup");
const nameInput = document.querySelector("input[name=name-user]");
const aboutInput = document.querySelector("input[name=about-user]");
export const popupEditAvatar = document.querySelector(".avatar-popup");
const formEditAvatar = document.querySelector("form[name=edit-avatar]");
const newAvatarInput = formEditAvatar.querySelector(
  "input[name=input-link-avatar]"
);
const avatarImg = document.querySelector(".profile__avatar");
const buttonNewAvatar = document.querySelector(".profile__button-avatar-edit");

enableValidation(validationVar);
addListenerPopup();
loadName(profileUserName);
loadAbout(profileUserAbout);
loadAvatar(avatarImg);

formEditUser.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log("ok");
  handleProfileFormSubmit(
    nameInput,
    aboutInput,
    formEditUser,
    profileUserName,
    profileUserAbout
  );
});

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

formAddMesto.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleAddMestoFormSubmit(nameMestoInput, linkMestoInput);
});

buttonNewAvatar.addEventListener("click", () => {
  newAvatarInput.value = "";
  openPopup(popupEditAvatar);
  resetError(
    popupEditAvatar,
    validationVar.inputSelector,
    validationVar.submitButtonSelector,
    validationVar.inactiveButtonClass
  );
});

formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  reloadAvatar(formEditAvatar, newAvatarInput, avatarImg);
});
