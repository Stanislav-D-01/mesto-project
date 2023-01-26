import { closePopup } from "./modal";
import { popupEditProfile, formAddMesto, popupEditAvatar } from "./index.js";
import { pastNewMesto, popupAddMesto } from "./card";
const cardsContainer = document.querySelector(".cards");
const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-19/users/me",
  headers: {
    authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
  },
};
export let idUser = "";
export function loadName(profileUserName) {
  profileUserName.textContent = "Load...";
  fetch("https://nomoreparties.co/v1/plus-cohort-19/users/me", {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка:%{res.status}`);
      }
    })
    .then((data) => {
      profileUserName.textContent = data.name;
      idUser = data._id;
      loadCards();
    })
    .catch((err) => {
      profileUserName.textContent = `Ошибка загрузки имени ${err}`;
    });
}

export function loadAbout(profileUserAbout) {
  profileUserAbout.textContent = "Load...";
  fetch("https://nomoreparties.co/v1/plus-cohort-19/users/me", {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка:%{res.status}`);
      }
    })
    .then((data) => {
      profileUserAbout.textContent = data.about;
    })
    .catch((err) => {
      profileUserAbout.textContent = `Ошибка загрузки информации ${err}`;
    });
}

export function loadAvatar(avatarImg) {
  fetch("https://nomoreparties.co/v1/plus-cohort-19/users/me", {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка:%{res.status}`);
      }
    })
    .then((data) => {
      avatarImg.src = data.avatar;
    })
    .catch((err) => {
      console.log(`Ошибка загрузки аватара ${err}`);
    });
}

export function deleteLike(evt, numLikes, cardId) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-19/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка:%{res.status}`);
      }
    })
    .then((data) => {
      numLikes.textContent = data.likes.length;
      evt.target.classList.remove("cards__like_active");
    })
    .catch((err) => {
      console.log(err);
    });
}

export function addlike(evt, numLikes, cardId) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-19/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка:%{res.status}`);
      }
    })
    .then((data) => {
      numLikes.textContent = data.likes.length;
      evt.target.classList.add("cards__like_active");
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteCard(evt, cardId) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-19/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        evt.target.parentElement.remove();
      } else return Promise.reject(`Ошибка:%{res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function addNewCardMesto(
  nameMestoInput,
  linkMestoInput,
  cardsContainer
) {
  fetch("https://nomoreparties.co/v1/plus-cohort-19/cards", {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: nameMestoInput.value,
      link: linkMestoInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    })
    .then((data) => {
      pastNewMesto(
        data.name,
        data.link,
        cardsContainer,
        data._id,
        [],
        data.owner._id
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

export function loadCards() {
  fetch("https://nomoreparties.co/v1/plus-cohort-19/cards", {
    headers: config.headers,
  })
    .then((res) => {
      console.log("okkk");
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    })
    .then((initialCards) => {
      console.log("jr");
      const lengthInitialCards = initialCards.length;

      for (let i = 0; i < lengthInitialCards; i++) {
        pastNewMesto(
          initialCards[lengthInitialCards - i - 1].name,
          initialCards[lengthInitialCards - i - 1].link,
          cardsContainer,
          initialCards[lengthInitialCards - i - 1]._id,
          initialCards[lengthInitialCards - i - 1].likes,
          initialCards[lengthInitialCards - i - 1].owner._id
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function handleProfileFormSubmit(
  nameInput,
  aboutInput,
  formEditUser,
  profileUserName,
  profileUserAbout
) {
  const button = formEditUser.querySelector(".popup__button-save");

  button.textContent = "Сохранение...";

  fetch("https://nomoreparties.co/v1/plus-cohort-19/users/me", {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: aboutInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    })
    .then((data) => {
      profileUserName.textContent = data.name;
      profileUserAbout.textContent = data.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (button.textContent = "Сохранить"));
}

export function handleAddMestoFormSubmit(nameMestoInput, linkMestoInput) {
  const button = formAddMesto.querySelector(".popup__button-save");

  button.textContent = "Сохранение...";
  fetch("https://nomoreparties.co/v1/plus-cohort-19/cards", {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameMestoInput.value,
      link: linkMestoInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    })
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
    .finally(() => (button.textContent = "Сохранить"));
}

export function reloadAvatar(formEditAvatar, newAvatarInput, avatarImg) {
  const button = formEditAvatar.querySelector(".popup__button-save");

  button.textContent = "Сохранение...";

  fetch("https://nomoreparties.co/v1/plus-cohort-19/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: newAvatarInput.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
        console.log("ava");
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    })
    .then((data) => {
      avatarImg.src = data.avatar;
      closePopup(popupEditAvatar);
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => (button.textContent = "Сохранить"));
}
