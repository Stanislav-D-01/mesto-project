function openPopupEdit() {   //функция открывает окно редактирования профиля #1
  const popupEdit = document.querySelector('.popup');
  popupEdit.classList.add('popup_opened');
  const profileUserName = document.querySelector('.profile__user-name');
  const profileUserAbout = document.querySelector('.profile__user-about');

  const popupUserName = popupEdit.querySelector('input[name="name-user"');
  const popupUserAbout = popupEdit.querySelector('input[name="about-user"');
  popupUserName.value = profileUserName.textContent;
  popupUserAbout.value = profileUserAbout.textContent;
}

function closePopupEdit() {  //функция закрывает окно редактирования профиля #2
  const popupEdit = document.querySelector('.popup');
  popupEdit.classList.remove('popup_opened');
}

const editButton = document.querySelector('.profile__edit-button'); //записывает в переменную кнопку открытия редактирования профиля
editButton.addEventListener('click', openPopupEdit); //слушает клик кнопки, выполняет функцию #1
const closeEditForm = document.querySelector('.popup__icon-close'); //записывает в переменную иконку закрытия окна редактирвоания профиля
closeEditForm.addEventListener('click', closePopupEdit); //слушает клик по иконке редактирования профиля, при клике вызывает функцияю #2
const formElement = document.querySelector('form[name="edit-user"'); //ищет форму по имени и записывает в переменную
const nameInput = document.querySelector('input[name="name-user"'); //ищет инпут ввода имени и записывает в перменную
const aboutInput = document.querySelector('input[name="about-user"');//ищет инпут ввода "о пользователе" и записывает в переменную

function formSubmitHandler(evt) { //функция заменяющая стандартную отправку формы + закрывает окно #3
  evt.preventDefault();
  const profileUserName = document.querySelector('.profile__user-name');
  const profileUserAbout = document.querySelector('.profile__user-about');
  profileUserName.textContent = nameInput.value;
  profileUserAbout.textContent = aboutInput.value;
  closePopupEdit();
}

formElement.addEventListener('submit', formSubmitHandler); //слушает когда отправят форму и вызывает функцию #3

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

function createContainerNewMesto(nameMesto, linkMesto) { //функция формирует из template карточку места с добавлением слушаетелей кликов на иконку удаления, клик по картинке для просмотра и клик лайка
  const containerNewMesto = document.querySelector('#newMesto').content.cloneNode(true);
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
  document.querySelector('.popup-views-img__img').src = linkMesto;
  document.querySelector('.popup-views-img__img').alt = nameMesto;
  document.querySelector('.popup-views-img__name-img').textContent = nameMesto;
  document.querySelector('.popup-views-img').classList.add('popup-views-img_opened');
  });
  return containerNewMesto; //возращает готовую карточку для вставки в DOM
}

function pastNewMesto(nameMesto, linkMesto) { //вставляет заготовленную карточку в DOM в родитель .cards
  const cards = document.querySelector('.cards');
  cards.prepend(createContainerNewMesto(nameMesto, linkMesto));
};

for (let i = 0; i < initialCards.length; i++) {   //цикл для загрузки картинок из массива
  pastNewMesto(initialCards[i].name, initialCards[i].link);
}

const addButton = document.querySelector('.profile__add-button'); //записывает в переменную кнопку добавления места
const popupAddMestoForm = document.querySelector('.popup_type_add-mesto'); //записывает в переменную окно добавления места
const closePopupAddMestoForm = popupAddMestoForm.querySelector('.popup__icon-close'); //записывает в перменную иконку закрытия окна добавления места
addButton.addEventListener('click', function () //слушатель клика кнопки открытия окна добавления места + функция обнуляет инпуты
{
  popupAddMestoForm.classList.add('popup_opened')
  popupAddMestoForm.querySelector('input[name="name-new-mesto"').value = '';
  popupAddMestoForm.querySelector('input[name="link-new-mesto"').value = '';
});
closePopupAddMestoForm.addEventListener('click', function () { popupAddMestoForm.classList.remove('popup_opened') }); //слушатель клика иконки закрытия, закрывает окно

const formAddMesto = document.querySelector('form[name="add-new-mesto"'); //записывает в переменную фому окна добавленияя места
const nameMestoInput = document.querySelector('input[name="name-new-mesto"'); //записывает в переменную
const linkMestoInput = document.querySelector('input[name="link-new-mesto"');

function formSubmitAddMesto(evt) { //функция отправки с формы добавления места
  evt.preventDefault();
  pastNewMesto(nameMestoInput.value, linkMestoInput.value);
  popupAddMestoForm.classList.remove('popup_opened')
}

formAddMesto.addEventListener('submit', formSubmitAddMesto);//слушатель отправки формы добавления нового места
document.querySelector('.popup-views-img__icon-close').addEventListener('click', function ()  //слушатель кнопки закрытия + функция закрытия просмотра большого изображения
  {
  document.querySelector('.popup-views-img').classList.remove('popup-views-img_opened');
  });
