import { profileUserAbout, profileUserName } from "./index.js";
const profileAvatar = document.querySelector(".profile__avatar");
export let idUser = "";

export function loadName() {
  profileUserName.textContent = "Load...";
  fetch("https://nomoreparties.co/v1/plus-cohort-19/users/me", {
    headers: {
      authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
    },
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      profileUserName.textContent = data.name;
      idUser = data._id;
    })
    .catch((err) => {
      profileUserName.textContent = "Ошибка загрузки имени";
    });
}

export function loadAbout() {
  profileUserAbout.textContent = "Load...";
  fetch("https://nomoreparties.co/v1/plus-cohort-19/users/me", {
    headers: {
      authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profileUserAbout.textContent = data.about;
    })
    .catch((err) => {
      profileUserAbout.textContent = "Ошибка загрузки информации";
    });
}

export function loadAvatar() {
  fetch("https://nomoreparties.co/v1/plus-cohort-19/users/me", {
    headers: {
      authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profileAvatar.src = data.avatar;
    })
    .catch((err) => {
      profileAvatar.src = "404";
    });
}
