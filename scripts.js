const initialCards = [ //массив с картинками
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
const popupEditProfile = document.querySelector('.profile-popup');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupAddMesto = document.querySelector('.add-mesto-popup');
const formAddMesto = document.querySelector('form[name="add-new-mesto"');
const buttonAddMesto = document.querySelector('.profile__add-button');
const buttonClose = document.querySelectorAll('.popup__icon-close');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserAbout = document.querySelector('.profile__user-about');
const formElement = document.querySelector('form[name="edit-user"');
const nameInput = document.querySelector('input[name="name-user"');
const aboutInput = document.querySelector('input[name="about-user"');
const templateNewMesto = document.querySelector('#newMesto');
const cards = document.querySelector('.cards');
const nameMestoInput = document.querySelector('input[name="name-new-mesto"');
const linkMestoInput = document.querySelector('input[name="link-new-mesto"');
const popupViewImg = document.querySelector('.popup-views-img');

function openPopup (popup) {
 popup.classList.add ('popup_opened')
};

function closePopup (popup) {
  popup.classList.remove ('popup_opened');
};

buttonClose.forEach((button)=>{
  const popup = button.closest('.popup');
  button.addEventListener('click', ()=>{closePopup(popup)});
})

buttonEditProfile.addEventListener('click', () =>{
  openPopup (popupEditProfile)
  nameInput.value = profileUserName.textContent;
  aboutInput.value = profileUserAbout.textContent;
});

function handleProfileFormSubmit(evt) { //функция заменяющая стандартную отправку формы
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserAbout.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

formElement.addEventListener('submit', handleProfileFormSubmit);
buttonAddMesto.addEventListener('click', () =>{openPopup (popupAddMesto)
nameMestoInput.value = '';
linkMestoInput.value ='';
});


function createContainerNewMesto(nameMesto, linkMesto) { //функция формирует из template карточку места с добавлением слушаетелей кликов на иконку удаления, клик по картинке для просмотра и клик лайка
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
    document.querySelector('.popup__img').src = linkMesto;
    document.querySelector('.popup__img').alt = nameMesto;
    document.querySelector('.popup__name-img').textContent = nameMesto;
    openPopup(popupViewImg);
  });
  return containerNewMesto; //возращает готовую карточку для вставки в DOM
}
function pastNewMesto(nameMesto, linkMesto) { //вставляет заготовленную карточку в DOM в родитель .cards
  cards.prepend(createContainerNewMesto(nameMesto, linkMesto));
};


initialCards.forEach((elem)=>{pastNewMesto(elem.name, elem.link)});


function handleAddMestoFormSubmit(evt) { //функция отправки с формы добавления места
  evt.preventDefault();
  pastNewMesto(nameMestoInput.value, linkMestoInput.value);
  closePopup(popupAddMesto);
}

formAddMesto.addEventListener('submit', handleAddMestoFormSubmit);//слушатель отправки формы добавления нового места


