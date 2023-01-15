import {openPopup, closePopup} from "./modal.js";

const cards = document.querySelector('.cards');
const templateNewMesto = document.querySelector('#newMesto');

export const initialCards = [ //массив с картинками
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export function createContainerNewMesto(nameMesto, linkMesto) { //функция формирует из template карточку места с добавлением слушаетелей кликов на иконку удаления, клик по картинке для просмотра и клик лайка
  const containerNewMesto = templateNewMesto.content.cloneNode(true);
  containerNewMesto.querySelector('.cards__image').src = linkMesto;
  containerNewMesto.querySelector('.cards__image').alt = nameMesto;
  containerNewMesto.querySelector('.cards__title').textContent = nameMesto;
  containerNewMesto.querySelector('.cards__like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('cards__like_active')
  })

  containerNewMesto.querySelector('.cards__delete').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  })

  containerNewMesto.querySelector('.cards__image').addEventListener('click', function (evt) {
    popupImg.src = linkMesto;
    popupImg.alt = nameMesto;
    popupNameImg.textContent = nameMesto;
    openPopup(popupViewImg);
  });
  return containerNewMesto; //возращает готовую карточку для вставки в DOM
}

export function pastNewMesto(nameMesto, linkMesto) { //вставляет заготовленную карточку в DOM в родитель .cards
  cards.prepend(createContainerNewMesto(nameMesto, linkMesto));
};

export function handleAddMestoFormSubmit(evt) { //функция отправки с формы добавления места
  evt.preventDefault();
  pastNewMesto(nameMestoInput.value, linkMestoInput.value);
  closePopup(popupAddMesto);
}
