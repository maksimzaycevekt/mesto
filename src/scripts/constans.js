//объект я данными для создания карточек
export const initialCards = [
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

//конфиг для валидации
export const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error'
};

//объект с селекторами профиля для глобального класса userInfo
export const userInfoObject = {
  name: '.profile__title',
  info: '.profile__subtitle',
  avatar: '.profile__avatar'
}

export const popupProfile = document.querySelector('#popup-profile');
export const popupImg = document.querySelector('#popup-images');
export const popupAvatar = document.querySelector('#popup-avatar');
export const buttonOpenPopupProfileForm = document.querySelector('.profile__button');
export const buttonOpenImg = document.querySelector('.profile__add-button');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileUserName = document.querySelector('.profile__title');
export const profileUserJob = document.querySelector('.profile__subtitle');
export const profileHover = document.querySelector('.profile__hover');
export const objectCards = null;
export const profileSaveButton = document.querySelector('#profile-save-button');
export const avatarSaveButton = document.querySelector('#popup-save-avatar');
export const addImageSaveButton = document.querySelector('#popup-add-image')

