import { Card } from "./card.js";
import { FormValidation } from "./FormValidator.js";
import { initialCards, enableValidation } from "./constans.js";
import { openPopup } from "./utils.js";

const popupProfile = document.querySelector('#popup-profile');
const popupImg = document.querySelector('#popup-images');
const popupProfileForm = document.querySelector('#profile-name-input');
const buttonOpenPopupProfileForm = document.querySelector('.profile__button');
const buttonClosePopupProfileForm = document.querySelector('#close-popup-profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const buttonOpenImg = document.querySelector('.profile__add-button');
const buttonCloseImg = document.querySelector('#close-popup-images');
const formElementImg = document.querySelector('.popup__form-image');
const imageName = document.querySelector('.popup__input_type_image-name');
const imageLink = document.querySelector('.popup__input_type_image-link');
const popupImgOpen = document.querySelector('#popup-img-open');
const popupImgClose = document.querySelector('#close-popup-window');
const popupImgButton = popupImg.querySelector('.popup__button');

//создать класс для попапа ред профиля и включить валидацию
const popupProfileValidation = new FormValidation(enableValidation, popupProfile);
popupProfileValidation.enableValidation();

//создать класс для попапа добавления карточки с картинкой и включить валидацию
const popupImgValidation = new FormValidation(enableValidation, popupImg);
popupImgValidation.enableValidation();

//Перебирает массив и создает новый класс с карточкой с помощью метода generateCard()
initialCards.forEach((item) => {
  const card = new Card(item);
  const cardGenerate = card.generateCard();
  document.querySelector('.elements').append(cardGenerate);
});

// передаёт данные input-ов в разметку
function handleSubmitProfileFormInput (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  handleClickClosePopupProfileForm();
}

// ф-я закрытия попапа для модальных окон
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('mousedown', сlosePopupClickOverlay);
  document.removeEventListener('keydown', closePopupPressEscape);
}

//ф-я открытия попапа для ред. профиля
function handleClickOpenPopupProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

//ф-я закрытия попапа для ред. профиля
function handleClickClosePopupProfileForm() {
  closePopup(popupProfile);
}

//ф-я открытия для формы ред картинок
function handlClickeOpenPopupImgageEditForm() {
  openPopup(popupImg);
  imageName.value = '';
  imageLink.value = '';
  popupImgValidation.inactiveButton();
}

//ф-я закрытия попапа для формы ред картинок
function handleClickClosePopupImgageEditForm() {
  closePopup(popupImg);
}

//ф-я закрытия попапа с картинкой
function handleCkickClosePopupImageModalWindow() {
  closePopup(popupImgOpen);
}

//создать новую карточку передав в неё объект и добавить её в начало списка
function createPopupCard(object) {
  object.forEach((item) => {
    const card = new Card(item);
    const cardGenerate = card.generateCard();
    document.querySelector('.elements').prepend(cardGenerate);
  });
}

//добавляет в разметку карточку через popup
function handleSubmitImageForm(evt) {
  evt.preventDefault();

  const newCardValue = [
    {
      name: imageName.value,
      link: imageLink.value
    }
  ];

  createPopupCard(newCardValue);
  handleClickClosePopupImgageEditForm();
};

//ф-я закрытия попапа по клику оверлея
export function сlosePopupClickOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

//ф-я закрытия попапа по нажатию Escape
export function closePopupPressEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(".popup_opened"));
  }
}

//слушатели для попапа ред профиля
buttonOpenPopupProfileForm.addEventListener('click', handleClickOpenPopupProfileForm);

buttonClosePopupProfileForm.addEventListener('click', handleClickClosePopupProfileForm);

popupProfileForm.addEventListener('submit', handleSubmitProfileFormInput);

//слушатели для попапа ред картинок
buttonOpenImg.addEventListener('click', handlClickeOpenPopupImgageEditForm);

buttonCloseImg.addEventListener('click', handleClickClosePopupImgageEditForm);

formElementImg.addEventListener('submit', handleSubmitImageForm);

//слушатель для попапа с картинкой
popupImgClose.addEventListener('click', handleCkickClosePopupImageModalWindow);
