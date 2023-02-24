import "../pages/index.css";
import { UserInfo } from "./userInfo.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section";
import { Cards } from "./card.js";
import { Api } from "./api.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage";
import {
  validationVar,
  nameMestoInput,
  linkMestoInput,
  config,
  formElements,
  buttonAddMesto,
  buttonEditProfile,
  profileUserName,
  profileUserAbout,
  popupEditProfile,
  nameInput,
  aboutInput,
  popupEditAvatar,
  newAvatarInput,
  avatarImg,
  buttonNewAvatar,
  formValidator,
  popupViewImg,
  popupAddMesto,
  buttonSaveProfile,
  buttonSaveAvatar,
  buttonSaveMesto,
} from "./constants.js";
import { renderLoading } from "./utils.js";

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

const viewer = new PopupWithImage(popupViewImg);
viewer.setEventListeners();
const container = new Section({}, ".cards");

api
  .getCards()
  .then((data) => {
    data.reverse();
    let arrCards = [];
    for (let i = 0; i < data.length; i++) {
      arrCards[i] = new Cards(
        data[i],
        "newMesto",
        userInfo._userId,
        (openViewer) => {
          viewer.open(arrCards[i]._linkMesto, arrCards[i]._nameCard);
        }
      );
      container.addItem(
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
  renderLoading("Сохранение", "Сохранить", true, buttonSaveProfile);
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
  api
    .postNewCard(data["name-new-mesto"], data["link-new-mesto"])
    .then((data) => {
      const newCard = new Cards(
        data,
        "newMesto",
        userInfo._userId,
        (openViewer) => {
          viewer.open(data.link, data.name);
        }
      );
      container.addItem(
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
  api.reloadNewAvatar(data["input-link-avatar"]).then((data) => {
    avatarImg.src = data.avatar;
    popupEditAva.close();
  });
});
popupEditAva.setEventListeners();
buttonNewAvatar.addEventListener("click", () => {
  newAvatarInput.value = "";
  formValidator["edit-avatar"].resetError();
  popupEditAva.open();
});

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

/**buttonsClose.forEach((button) => {
  button.addEventListener("click", closePopup);
});*/

/**
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
*/
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
/**
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
*/
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
