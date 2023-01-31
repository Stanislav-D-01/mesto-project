import { checkResponse } from "./utils";

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-19/users/me",
  cardsUrl: "https://nomoreparties.co/v1/plus-cohort-19/cards",
  likesUrl: "https://nomoreparties.co/v1/plus-cohort-19/cards/likes",
  avatarUrl: "https://nomoreparties.co/v1/plus-cohort-19/users/me/avatar",
  headers: {
    authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
  },
};

export function getUserInfo() {
  return fetch(config.baseUrl, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function loadAvatar() {
  return fetch(config.baseUrl, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function deleteLike(cardId) {
  return fetch(`${config.likesUrl}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function addLike(cardId) {
  return fetch(`${config.likesUrl}/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function deleteCard(cardId) {
  return fetch(`${config.cardsUrl}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export function getCards() {
  return fetch(config.cardsUrl, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function patchProfile(nameInput, aboutInput) {
  return fetch(config.baseUrl, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: aboutInput.value,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function postNewCard(nameMestoInput, linkMestoInput) {
  return fetch(config.cardsUrl, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameMestoInput.value,
      link: linkMestoInput.value,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function reloadAvatar(newAvatarInput) {
  return fetch(config.avatarUrl, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: newAvatarInput.value,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}
