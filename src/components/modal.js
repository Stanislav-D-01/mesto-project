export function openPopup (popup) {
popup.classList.add ('popup_opened');
};

export function closePopup () {
  const openPopup = document.querySelector('.popup_opened')
  openPopup.classList.remove('popup_opened');
 };

export function addListenerPopup () {
  const listPopup = document.querySelectorAll('.popup');
  listPopup.forEach((PopupEl) =>{
    PopupEl.addEventListener('click', (evt)=>{
      if (evt.target.classList.contains('popup')){
        closePopup();
      };
    });

  });
};

export function addClosePopupEscape () {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'){
      closePopup();
    };
  });
};
