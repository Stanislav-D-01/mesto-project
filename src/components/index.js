import "../pages/index.css";
import { UserInfo } from "./userInfo.js";
import { checkResponse } from "./utils";
import { resetError, FormValidator } from "./FormValidator.js";
import { openPopup, closePopup, addListenerPopup } from "./modal.js";

import {
  nameMestoInput,
  linkMestoInput,
  popupAddMesto,
  pastNewMesto,
  cardsContainer,
  Cards,
} from "./card.js";
import {
  loadAvatar,
  reloadAvatar,
  getUserInfo,
  getCards,
  postNewCard,
  patchProfile,
  addLike,
  deleteLike,
  Api,
} from "./api.js";
import { renderLoading } from "./utils";
import { validationVar } from "./constants";

import { config } from "./varibles.js";
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
export let idUser = "";
let initialCards = {};
const buttonSaveProfile = formEditUser.querySelector(".popup__button-save");
const buttonSaveAvatar = popupEditAvatar.querySelector(".popup__button-save");
const formElements = document.querySelectorAll(validationVar.formSelector);
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationVar, formElement);
  formValidator.enableValidation();
});
addListenerPopup();
//
//
const arrCards = [];
export const api = new Api(config);

const userInfo = new UserInfo(
  ".profile__user-name",
  ".profile__user-about",
  ".profile__avatar"
);

api
  .getInfo()
  .then(async (data) => {
    await userInfo.setUserInfo(data);
  })
  .catch((err) => console.log(err));

api
  .getCards()
  .then((data) => {
    data.reverse();
    let arrCards = [];

    for (let i = 0; i < data.length; i++) {
      arrCards[i] = new Cards(data[i], "newMesto", userInfo._userId, "cards");

      arrCards[i].getFinishCard(
        (addLike) => {
          return api.addLike(data[i]._id);
        },
        (delLike) => {
          return api.deleteLike(data[i]._id);
        }
      );
    }
  })
  .catch((err) => console.log(err));
/**
formEditUser.addEventListener("submit", (evt) => {
  userInfo.setUserInfo(
    {
      name: nameInput,
      about: aboutInput,
    },
    api.editProfile
  );

  evt.preventDefault();
  renderLoading("Сохранение", "Сохранить", true, buttonSaveProfile);
  patchProfile(nameInput, aboutInput)
    .then((data) => {
      profileUserName.textContent = data.name;
      profileUserAbout.textContent = data.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      renderLoading("Сохранение...", "Сохранить", false, buttonSaveProfile)
    );
});
*/

buttonsClose.forEach((button) => {
  button.addEventListener("click", closePopup);
});

buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileUserName.textContent;
  aboutInput.value = profileUserAbout.textContent;
  openPopup(popupEditProfile);
  // TODO: вынести в отдельный метод
  // resetError(
  //   popupEditProfile,
  //   validationVar.inputSelector,
  //   validationVar.submitButtonSelector,
  //   validationVar.inactiveButtonClass
  // );
});

buttonAddMesto.addEventListener("click", () => {
  nameMestoInput.value = "";
  linkMestoInput.value = "";
  openPopup(popupAddMesto);
  // TODO: вынести в отдельный метод
  // resetError(
  //   popupAddMesto,
  //   validationVar.inputSelector,
  //   validationVar.submitButtonSelector,
  //   validationVar.inactiveButtonClass
  // );
});
/**
formAddMesto.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading("Сохранение...", "Создать", true, buttonSaveMesto);
  postNewCard(nameMestoInput, linkMestoInput)
    .then((data) => {
      pastNewMesto(
        data.name,
        data.link,
        cardsContainer,
        data._id,
        [],
        data.owner._id
      );
      closePopup(popupAddMesto);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      renderLoading("Сохранение...", "Создать", false, buttonSaveMesto)
    );
});
*/
buttonNewAvatar.addEventListener("click", () => {
  newAvatarInput.value = "";
  openPopup(popupEditAvatar);
  // TODO: вынести в отдельный метод
  // resetError(
  //   popupEditAvatar,
  //   validationVar.inputSelector,
  //   validationVar.submitButtonSelector,
  //   validationVar.inactiveButtonClass
  // );
});

/**
formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading("Сохранение...", "Сохранить", true, buttonSaveAvatar);
  reloadAvatar(newAvatarInput)
    .then((data) => {
      avatarImg.src = data.avatar;
      closePopup(popupEditAvatar);
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() =>
      renderLoading("Сохранение...", "Сохранить", false, buttonSaveAvatar)
    );
});
*/
