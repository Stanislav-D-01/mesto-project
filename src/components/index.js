import "../pages/index.css";
import { enableValidation, validationVar, resetError } from "./validate.js";
import { openPopup, closePopup, addListenerPopup } from "./modal.js";
import {
  handleAddMestoFormSubmit,
  nameMestoInput,
  linkMestoInput,
  popupAddMesto,
  loadCards,
} from "./card.js";

import { loadName, loadAbout, loadAvatar } from "./loadInfoData";

const formAddMesto = document.querySelector("form[name=add-new-mesto]");
const buttonAddMesto = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonsClose = document.querySelectorAll(".popup__icon-close");
const formEditUser = document.querySelector('form[name="edit-user"]');
const buttonSaveMesto = popupAddMesto.querySelector(".popup__button-save");
export const profileUserName = document.querySelector(".profile__user-name");
export const profileUserAbout = document.querySelector(".profile__user-about");
const popupEditProfile = document.querySelector(".profile-popup");
const nameInput = document.querySelector("input[name=name-user]");
const aboutInput = document.querySelector("input[name=about-user]");
const popupEditAvatar = document.querySelector(".avatar-popup");
const formEditAvatar = document.querySelector("form[name=edit-avatar]");
const newAvatarInput = formEditAvatar.querySelector(
  "input[name=input-link-avatar]"
);
const avatarImg = document.querySelector(".profile__avatar");
const buttonNewAvatar = document.querySelector(".profile__button-avatar-edit");

enableValidation(validationVar);
addListenerPopup();
loadName();
loadAbout();
loadAvatar();
loadCards();
function handleProfileFormSubmit(evt) {
  //функция заменяющая стандартную отправку формы
  const button = formEditUser.querySelector(".popup__button-save");
  evt.preventDefault();
  button.textContent = "Сохранение...";
  fetch("https://nomoreparties.co/v1/plus-cohort-19/users/me", {
    method: "PATCH",
    headers: {
      authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: aboutInput.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profileUserName.textContent = data.name;
      profileUserAbout.textContent = data.about;
      closePopup(popupEditProfile);
      button.textContent = "Сохранить";
    });
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

formAddMesto.addEventListener("submit", handleAddMestoFormSubmit); //слушатель отправки формы добавления нового места

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

formEditAvatar.addEventListener("submit", reloadAvatar);

function reloadAvatar(evt) {
  const button = formEditAvatar.querySelector(".popup__button-save");
  evt.preventDefault();
  button.textContent = "Сохранение...";

  fetch("https://nomoreparties.co/v1/plus-cohort-19/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: newAvatarInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      avatarImg.src = data.avatar;
      closePopup(popupEditAvatar);
      button.textContent = "Сохранить";
    });
}
