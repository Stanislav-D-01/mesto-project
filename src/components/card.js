import { openPopup } from "./modal.js";
import { deleteLike, addlike, deleteCard } from "./api.js";
import { idUser } from "./index.js";
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
      deleteLike(cardId)
        .then((data) => {
          numLikes.textContent = data.likes.length;
          evt.target.classList.remove("cards__like_active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addlike(cardId)
        .then((data) => {
          numLikes.textContent = data.likes.length;
          evt.target.classList.add("cards__like_active");
        })
        .catch((err) => {
          console.log(err);
        });
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
