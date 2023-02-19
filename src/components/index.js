import "../pages/index.css";
import { UserInfo } from "./userInfo.js";
import { enableValidation, validationVar, resetError } from "./validate.js";
import { openPopup, closePopup, addListenerPopup } from "./modal.js";
import { checkResponse } from "./utils";

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
enableValidation(validationVar);
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
      arrCards[i] = new Cards(
        data[i],
        "newMesto",
        userInfo.getUserInfo._id,
        "cards"
      );

      arrCards[i].getFinishCard(api.addLike, api.deleteLike);
    }
  })
  .catch((err) => console.log(err));

console.log(api._likesUrl);

/**
Promise.all([getUserInfo(), loadAvatar(), getCards()])
  .then(([userInfo, avatar, cards]) => {
    profileUserName.textContent = userInfo.name;
    profileUserAbout.textContent = userInfo.about;
    idUser = userInfo._id;
    avatarImg.src = avatar.avatar;
    initialCards = cards;
    for (let i = 0; i < initialCards.length; i++) {
      pastNewMesto(
        initialCards[initialCards.length - i - 1].name,
        initialCards[initialCards.length - i - 1].link,
        cardsContainer,
        initialCards[initialCards.length - i - 1]._id,
        initialCards[initialCards.length - i - 1].likes,
        initialCards[initialCards.length - i - 1].owner._id
      );
    }
  })
  .catch((err) => console.log(err));

formEditUser.addEventListener("submit", (evt) => {

  userInfo.setUserInfo({
    name: nameInput,
    about: aboutInput,
  }, api.editProfile)


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

export function toggleLike(status, cardId, evt, numLikes) {
  if (status == "del") {
    deleteLike(cardId)
      .then((data) => {
        numLikes.textContent = data.likes.length;
        evt.target.classList.remove("cards__like_active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (status == "add") {
    addLike(cardId)
      .then((data) => {
        numLikes.textContent = data.likes.length;
        evt.target.classList.add("cards__like_active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
*/
