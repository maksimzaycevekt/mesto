import '../pages/index.css';
import { Card } from "./Card.js";
import { FormValidation } from "./FormValidator.js";
import { Section } from "./Section.js";
import { initialCards, enableValidation } from "./constans.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js"
import { UserInfo } from "./UserInfo.js";

const popupProfile = document.querySelector('#popup-profile');
const popupImg = document.querySelector('#popup-images');
const buttonOpenPopupProfileForm = document.querySelector('.profile__button');
const buttonOpenImg = document.querySelector('.profile__add-button');
export const popupImgOpen = document.querySelector('#popup-img-open');
const containerElement = document.querySelector('.elements');

//Попап для ред. профиля
const popupWithProfileForm = new PopupWithForm(popupProfile, () => {
  const popupProfileValue = {
    name: document.querySelector('.popup__input_type_name').value,
    info: document.querySelector('.popup__input_type_job').value
  }
  const popupUserInfo = new UserInfo(popupProfileValue);
  popupUserInfo.getUserInfo();
  popupUserInfo.setUserInfo();
  popupProfileValidation.resetInputError();
});
popupWithProfileForm.setEventListeners();

//попап для добавления картинок
const popupWithAddImageForm = new PopupWithForm(popupImg, (object) => {
  const objectName = object.popup_mesto;
  const objectLink = object.popup_link;

  const objectCradInfo = {
    name: objectName,
    link: objectLink
  }
  const card = new Card(objectCradInfo, document.querySelector('.element-template'));
  const cardGenerate = card.generateCard();
  document.querySelector('.elements').prepend(cardGenerate);
  popupImgValidation.resetInputError();
});
popupWithAddImageForm.setEventListeners();

//попап с картинкой (открывается по клику на картинку)
export const popupWithImage = new PopupWithImage(popupImgOpen);
popupWithImage.setEventListeners();

//создать класс для попапа ред профиля и включить валидацию
const popupProfileValidation = new FormValidation(enableValidation, popupProfile);
popupProfileValidation.enableValidation();

//создать класс для попапа добавления карточки с картинкой и включить валидацию
const popupImgValidation = new FormValidation(enableValidation, popupImg);
popupImgValidation.enableValidation();

//Создаёт экземпляр карточки
//items принимает массив данных
//renderer содержит функцию отрисовки данных на странице
//containerElement - селектор контейнера в который добавятся элементы.
const generateCard = new Section({
  items: initialCards,
  renderer: (cardInfo) => {
    const card = new Card(cardInfo, document.querySelector('.element-template'));
    const cardGenerate = card.generateCard();
    generateCard.addItem(cardGenerate);
   }
  },
  containerElement);

//Отрисовывает все элементы переданные в generateCard
generateCard.renderElements();

//слушатели для попапа ред профиля
//коллбэк вызывает метод открытия попапа и сбрасывает валидацию
buttonOpenPopupProfileForm.addEventListener('click', () => {popupWithProfileForm.open(), popupProfileValidation.resetInputError()});

//слушатели для попапа ред картинок
//коллбэк вызывает метод открытия попапа и сбрасывает валидацию
buttonOpenImg.addEventListener('click', () => {popupWithAddImageForm.open(), popupImgValidation.resetInputError()});
