import { openPopup, closePopup } from "./modal.js";

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

export function createContainerNewMesto(nameMesto, linkMesto) {
  //функция формирует из template карточку места с добавлением слушаетелей кликов на иконку удаления, клик по картинке для просмотра и клик лайка
  const containerNewMesto = templateNewMesto.content.cloneNode(true);
  const cardImage = containerNewMesto.querySelector(".cards__image");
  cardImage.src = linkMesto;
  cardImage.alt = nameMesto;
  containerNewMesto.querySelector(".cards__title").textContent = nameMesto;
  containerNewMesto
    .querySelector(".cards__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("cards__like_active");
    });

  containerNewMesto
    .querySelector(".cards__delete")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
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

export function pastNewMesto(nameMesto, linkMesto, cardsContainer) {
  //вставляет заготовленную карточку в DOM в родитель .cards
  cardsContainer.prepend(createContainerNewMesto(nameMesto, linkMesto));
}

export function handleAddMestoFormSubmit(evt) {
  //функция отправки с формы добавления места
  evt.preventDefault();
  pastNewMesto(nameMestoInput.value, linkMestoInput.value, cardsContainer);
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
    .then((data) => {
      initialCards = data;
      console.log(initialCards);
    });
}
