import {closePopup} from "./modal.js";


export function handleProfileFormSubmit(evt) { //функция заменяющая стандартную отправку формы
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserAbout.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}
