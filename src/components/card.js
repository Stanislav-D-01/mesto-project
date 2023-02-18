import { openPopup } from "./modal.js";
//import { deleteLike, addlike, deleteCard } from "./api.js";
//import { idUser, toggleLike } from "./index.js";
const templateNewMesto = document.querySelector("#newMesto");
export const popupAddMesto = document.querySelector(".add-mesto-popup");
export const nameMestoInput = document.querySelector(
  "input[name=name-new-mesto]"
);
export const linkMestoInput = document.querySelector(
  "input[name=link-new-mesto]"
);
export const cardsContainer = document.querySelector(".cards");
const popupViewImg = document.querySelector(".popup-views-img");
const popupImg = document.querySelector(".popup__img");
const popupNameImg = document.querySelector(".popup__name-img");

class Cards {
  constructor(data, templateSelector, idUser) {
    this._nameCard = data.name;
    this._linkMesto = data.link;
    this._likes = data.likes;
    this._idUserCard = data.owner._id;
    this._idCard = data.id;
    this._idUser = idUser;
    this._template = document.querySelector(`#${templateSelector}`);
    this._containerNewMesto;
    this._cardImage;
    this._buttonLike;
    this._buttonDelete;
    this._idUser;
  }

  createContainerNewMesto() {
    this.containerNewMesto = this._template.content.cloneNode(true);
    this._cardImage = containerNewMesto.querySelector(".cards__image");
    this._buttonLike = containerNewMesto.querySelector(".cards__like");
    this._numLikes = containerNewMesto.querySelector(".cards__num-likes");
    this._buttonDelete = containerNewMesto.querySelector(".cards__delete");
    this._cardImage.src = this._linkMesto;
    this._cardImage.alt = this._nameCard;
    this._numLikes.textContent = data.likes.length;
    containerNewMesto.querySelector(".cards__title").textContent =
      this._nameCard;
  }
  _checkMyLike() {
    if (this._likes.length > 0) {
      for (i = 0; i < this._likes.length; i++) {
        if (this._likes._id == this._idUser) {
          this._buttonLike.classList.add("cards__like_active");
          break;
        }
      }
    }
  }

  _checkMyCards() {
    if (this._idUserCard == this._idUser) {
      this._buttonDelete.classList.add("cards__delete_visible");
    }
  }
}

/**
 /
 /
 /
 /
 /
 /
 /
 /
 /

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
      toggleLike("del", cardId, evt, numLikes);
    } else {
      toggleLike("add", cardId, evt, numLikes);
    }
  });

  containerNewMesto
    .querySelector(".cards__delete")
    .addEventListener("click", function (evt) {
      deleteCard(cardId)
        .then((res) => {
          if (res.ok) {
            evt.target.parentElement.remove();
          } else return Promise.reject(`Ошибка:%{res.status}`);
        })
        .catch((err) => {
          console.log(err);
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
*/
