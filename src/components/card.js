import { openPopup, closePopup } from "./modal.js";
import { idUser } from "./loadInfoData.js";

export const cardsContainer = document.querySelector(".cards");
const templateNewMesto = document.querySelector("#newMesto");
export const popupAddMesto = document.querySelector(".add-mesto-popup");
export const nameMestoInput = document.querySelector(
  "input[name=name-new-mesto]"
);
export const linkMestoInput = document.querySelector(
  "input[name=link-new-mesto]"
);
const popupViewImg = document.querySelector(".popup-views-img");
const popupImg = document.querySelector(".popup__img");
const popupNameImg = document.querySelector(".popup__name-img");
export let initialCards = [];

export function createContainerNewMesto(
  nameMesto,
  linkMesto,
  cardId,
  arrLikes,
  idUserCard
) {
  //функция формирует из template карточку места с добавлением слушаетелей кликов на иконку удаления, клик по картинке для просмотра и клик лайка
  const containerNewMesto = templateNewMesto.content.cloneNode(true);
  const cardImage = containerNewMesto.querySelector(".cards__image");
  const buttonLike = containerNewMesto.querySelector(".cards__like");
  const numLikes = containerNewMesto.querySelector(".cards__num-likes");
  const buttonDelete = containerNewMesto.querySelector(".cards__delete");
  cardImage.src = linkMesto;
  cardImage.alt = nameMesto;
  containerNewMesto.querySelector(".cards__title").textContent = nameMesto;
  numLikes.textContent = arrLikes.length;
  //проверка на наличие своих лайков
  if (arrLikes.length > 0) {
    for (let i = 0; i < arrLikes.length; i++) {
      if (arrLikes[i]._id == idUser) {
        buttonLike.classList.add("cards__like_active");
        console.log("true+++");
        break;
      }
    }
  }

  //проверка на наличие своих карточек, если есть - отображаем кнопку удалить

  if (idUserCard == idUser) {
    buttonDelete.classList.add("cards__delete_visible");
  }

  buttonLike.addEventListener("click", function (evt) {
    if (buttonLike.matches(".cards__like_active")) {
      fetch(
        `https://nomoreparties.co/v1/plus-cohort-19/cards/likes/${cardId}`,
        {
          method: "DELETE",
          headers: {
            authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          numLikes.textContent = data.likes.length;
          evt.target.classList.remove("cards__like_active");
        });
    } else {
      fetch(
        `https://nomoreparties.co/v1/plus-cohort-19/cards/likes/${cardId}`,
        {
          method: "PUT",
          headers: {
            authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          numLikes.textContent = data.likes.length;
          evt.target.classList.add("cards__like_active");
        });
    }
  });
  containerNewMesto
    .querySelector(".cards__delete")
    .addEventListener("click", function (evt) {
      fetch(`https://nomoreparties.co/v1/plus-cohort-19/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
        },
      }).then(() => {
        evt.target.parentElement.remove();
      });
    });

  containerNewMesto
    .querySelector(".cards__image")
    .addEventListener("click", function (evt) {
      popupImg.src = linkMesto;
      popupImg.alt = nameMesto;
      popupNameImg.textContent = nameMesto;
      openPopup(popupViewImg);
    });
  return containerNewMesto; //возращает готовую карточку для вставки в DOM
}

export function pastNewMesto(
  nameMesto,
  linkMesto,
  cardsContainer,
  cardId,
  arrLikes,
  idUserCard
) {
  //вставляет заготовленную карточку в DOM в родитель .cards
  cardsContainer.prepend(
    createContainerNewMesto(nameMesto, linkMesto, cardId, arrLikes, idUserCard)
  );
}

export function handleAddMestoFormSubmit(evt) {
  //функция отправки с формы добавления места
  evt.preventDefault();
  fetch("https://nomoreparties.co/v1/plus-cohort-19/cards", {
    method: "POST",
    headers: {
      authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameMestoInput.value,
      link: linkMestoInput.value,
    }),
  })
    .then((res) => {
      return res.json();
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
    });

  closePopup(popupAddMesto);
}

export function loadCards() {
  fetch("https://nomoreparties.co/v1/plus-cohort-19/cards", {
    headers: {
      authorization: "2c7584da-c4c4-46ef-a185-6ffbe2e069d4",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((initialCards) => {
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
    });
}
