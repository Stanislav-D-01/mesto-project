function openPopupEdit() {
 const popupEdit = document.querySelector('.popup');
 popupEdit.classList.add('popup_opened');
 const profileUserName = document.querySelector('.profile__user-name');
 const profileUserAbout = document.querySelector('.profile__user-about');

 const popupUserName = popupEdit.querySelector('input[name="name-user"');
 const popupUserAbout = popupEdit.querySelector('input[name="about-user"');
 popupUserName.value = profileUserName.textContent;
 popupUserAbout.value = profileUserAbout.textContent;
}

function closePopupEdit() {
  const popupEdit = document.querySelector('.popup');
  popupEdit.classList.remove('popup_opened');
 }

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener ('click', openPopupEdit);

const closeEditForm = document.querySelector('.popup__icon-close');
closeEditForm.addEventListener ('click', closePopupEdit);


const formElement = document.querySelector('form[name="edit-user"');
const nameInput = document.querySelector('input[name="name-user"');
const aboutInput = document.querySelector('input[name="about-user"');

function formSubmitHandler (evt) {
  evt.preventDefault();
  const profileUserName = document.querySelector('.profile__user-name');
  const profileUserAbout = document.querySelector('.profile__user-about');
  profileUserName.textContent = nameInput.value;
  profileUserAbout.textContent = aboutInput.value;
  closePopupEdit();
}
formElement.addEventListener('submit', formSubmitHandler);


  const initialCards = [
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

function createContainerNewMesto (nameMesto, linkMesto) {
const containerNewMesto = document.querySelector('#newMesto').content.cloneNode(true);
containerNewMesto.querySelector('.cards__image').src = linkMesto;
containerNewMesto.querySelector('.cards__image').alt = nameMesto;
containerNewMesto.querySelector('.cards__title').textContent = nameMesto;
containerNewMesto.querySelector('.cards__like').addEventListener('click', function (evt){
evt.target.classList.toggle('cards__like_active')
})
containerNewMesto.querySelector('.cards__delete').addEventListener('click', function(evt) {
  evt.target.parentElement.remove();
})
containerNewMesto.querySelector('.cards__image').addEventListener('click',function(evt) {
  document.querySelector('.popup-views-img__img').src = linkMesto;
  document.querySelector('.popup-views-img__name-img').textContent = nameMesto;
  document.querySelector('.popup-views-img').classList.add('popup-views-img_opened');
});
return containerNewMesto;
}

function pastNewMesto (nameMesto, linkMesto){
  const cards = document.querySelector('.cards');
  cards.prepend(createContainerNewMesto (nameMesto, linkMesto));
};





for (let i = 0; i < initialCards.length; i++ ){
  pastNewMesto (initialCards[i].name, initialCards[i].link);
}

const addButton = document.querySelector('.profile__add-button');
const popupAddMestoForm = document.querySelector('.popup_type_add-mesto');
const closePopupAddMestoForm = popupAddMestoForm.querySelector('.popup__icon-close');
addButton.addEventListener ('click', function ()
{popupAddMestoForm.classList.add('popup_opened')
popupAddMestoForm.querySelector('input[name="name-new-mesto"').value = '';
popupAddMestoForm.querySelector('input[name="link-new-mesto"').value = '';
});
closePopupAddMestoForm.addEventListener ('click', function () {popupAddMestoForm.classList.remove('popup_opened')});

const formAddMesto = document.querySelector('form[name="add-new-mesto"');
const nameMestoInput = document.querySelector('input[name="name-new-mesto"');
const linkMestoInput = document.querySelector('input[name="link-new-mesto"');

function formSubmitAddMesto (evt) {
  evt.preventDefault();

  pastNewMesto (nameMestoInput.value, linkMestoInput.value);
popupAddMestoForm.classList.remove('popup_opened')
}
formAddMesto.addEventListener('submit', formSubmitAddMesto);
document.querySelector('.popup-views-img__icon-close').addEventListener('click', function() {
document.querySelector('.popup-views-img').classList.remove('popup-views-img_opened');
});
