import "../pages/index.css";
import { UserInfo } from "./userInfo.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section";
import { Card } from "./card.js";
import { Api } from "./api.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage";
import { validationVar, config } from "./constants.js";
import { renderLoading } from "./utils.js";

const popupAddMesto = document.querySelector(".add-mesto-popup");
const nameMestoInput = document.querySelector("input[name=name-new-mesto]");
const linkMestoInput = document.querySelector("input[name=link-new-mesto]");

const formElements = document.querySelectorAll(validationVar.formSelector);

const buttonAddMesto = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");

const formEditUser = document.querySelector('form[name="edit-user"]');

const profileUserName = document.querySelector(".profile__user-name");
const profileUserAbout = document.querySelector(".profile__user-about");
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

const buttonSaveProfile = formEditUser.querySelector(".popup__button-save");
const buttonSaveAvatar = popupEditAvatar.querySelector(".popup__button-save");
const buttonSaveMesto = popupAddMesto.querySelector(".popup__button-save");

const formValidator = {};
const popupViewImg = document.querySelector(".popup-views-img");
const cardsSelector = ".cards";

formElements.forEach((formElement) => {
  formValidator[`${formElement.name}`] = new FormValidator(
    validationVar,
    formElement
  );
  formValidator[`${formElement.name}`].enableValidation();
});

const api = new Api(config);

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

const popupWithImage = new PopupWithImage(popupViewImg);
popupWithImage.setEventListeners();
const cardsContainer = new Section({}, cardsSelector);

api
  .getCards()
  .then((data) => {
    data.reverse();
    let arrCards = [];
    for (let i = 0; i < data.length; i++) {
      arrCards[i] = new Card(
        data[i],
        "newMesto",
        userInfo._userId,
        (openViewer) => {
          popupWithImage.open(arrCards[i]._linkMesto, arrCards[i]._nameCard);
        }
      );
      cardsContainer.addItem(
        arrCards[i].getFinishCard(
          (addLike) => {
            return api.addLike(data[i]._id);
          },
          (delLike) => {
            return api.deleteLike(data[i]._id);
          },
          (delCard) => {
            return api.deleteCard(data[i]._id);
          }
        )
      );
    }
  })
  .catch((err) => console.log(err));

const popupEdit = new PopupWithForm(popupEditProfile, (data) => {
  renderLoading("Сохранение...", "Сохранить", true, buttonSaveProfile);
  api
    .editProfile(data["name-user"], data["about-user"])
    .then((data) => {
      profileUserName.textContent = data.name;
      profileUserAbout.textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEdit.close();
      renderLoading("Сохранение...", "Сохранить", false, buttonSaveProfile);
    });
});
popupEdit.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileUserName.textContent;
  aboutInput.value = profileUserAbout.textContent;
  formValidator["edit-user"].resetError();
  popupEdit.open();
});

const popupAddCard = new PopupWithForm(popupAddMesto, (data) => {
  renderLoading("Создание...", "Создать", true, buttonSaveMesto);
  api
    .postNewCard(data["name-new-mesto"], data["link-new-mesto"])
    .then((data) => {
      const newCard = new Card(
        data,
        "newMesto",
        userInfo._userId,
        (openViewer) => {
          popupWithImage.open(data.link, data.name);
        }
      );
      cardsContainer.addItem(
        newCard.getFinishCard(
          (addLike) => {
            return api.addLike(data._id);
          },
          (delLike) => {
            return api.deleteLike(data._id);
          },
          (delCard) => {
            return api.deleteCard(data._id);
          }
        )
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading("Создание...", "Создать", false, buttonSaveMesto);
      popupAddCard.close();
    });
});
popupAddCard.setEventListeners();
buttonAddMesto.addEventListener("click", () => {
  nameMestoInput.value = "";
  linkMestoInput.value = "";
  formValidator["add-new-mesto"].resetError();
  popupAddCard.open();
});

const popupEditAva = new PopupWithForm(popupEditAvatar, (data) => {
  renderLoading("Сохранение...", "Сохранить", true, buttonSaveAvatar);
  api
    .reloadNewAvatar(data["input-link-avatar"])
    .then((data) => {
      avatarImg.src = data.avatar;
      popupEditAva.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading("Сохранение...", "Сохранить", false, buttonSaveAvatar);
      popupEditAva.close();
    });
});
popupEditAva.setEventListeners();
buttonNewAvatar.addEventListener("click", () => {
  newAvatarInput.value = "";
  formValidator["edit-avatar"].resetError();
  popupEditAva.open();
});
