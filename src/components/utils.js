export const profileUserName = document.querySelector('.profile__user-name');
export const profileUserAbout = document.querySelector('.profile__user-about');
export const popupEditProfile = document.querySelector('.profile-popup');
export const nameInput = document.querySelector('input[name="name-user"]');
export const aboutInput = document.querySelector('input[name="about-user"]');
import {closePopup} from "./modal.js";


export function handleProfileFormSubmit(evt) { //функция заменяющая стандартную отправку формы
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserAbout.textContent = aboutInput.value;
  closePopup(popupEditProfile);
};
