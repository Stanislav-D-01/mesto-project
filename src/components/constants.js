export const validationVar = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-field",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_type_disable",
  inputErrorClass: "input-field_type_error",
  errorClass: "input-error_active",
};

export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-19/users/me",
  cardsUrl: "https://nomoreparties.co/v1/plus-cohort-19/cards",
  likesUrl: "https://nomoreparties.co/v1/plus-cohort-19/cards/likes",
  avatarUrl: "https://nomoreparties.co/v1/plus-cohort-19/users/me/avatar",
  headers: {
    authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
  },
};
export const popupAddMesto = document.querySelector(".add-mesto-popup");
export const nameMestoInput = document.querySelector(
  "input[name=name-new-mesto]"
);
export const linkMestoInput = document.querySelector(
  "input[name=link-new-mesto]"
);

export const formElements = document.querySelectorAll(
  validationVar.formSelector
);

export const buttonAddMesto = document.querySelector(".profile__add-button");
export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);

const formEditUser = document.querySelector('form[name="edit-user"]');

export const profileUserName = document.querySelector(".profile__user-name");
export const profileUserAbout = document.querySelector(".profile__user-about");
export const popupEditProfile = document.querySelector(".profile-popup");
export const nameInput = document.querySelector("input[name=name-user]");
export const aboutInput = document.querySelector("input[name=about-user]");
export const popupEditAvatar = document.querySelector(".avatar-popup");
const formEditAvatar = document.querySelector("form[name=edit-avatar]");
export const newAvatarInput = formEditAvatar.querySelector(
  "input[name=input-link-avatar]"
);
export const avatarImg = document.querySelector(".profile__avatar");
export const buttonNewAvatar = document.querySelector(
  ".profile__button-avatar-edit"
);

export const buttonSaveProfile = formEditUser.querySelector(
  ".popup__button-save"
);
export const buttonSaveAvatar = popupEditAvatar.querySelector(
  ".popup__button-save"
);
export const buttonSaveMesto = popupAddMesto.querySelector(
  ".popup__button-save"
);

export const formValidator = {};
export const popupViewImg = document.querySelector(".popup-views-img");
