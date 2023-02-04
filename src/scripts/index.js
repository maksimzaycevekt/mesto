import '../pages/index.css';
import { Card } from "./Card.js";
import { FormValidation } from "./FormValidator.js";
import { Section } from "./Section.js";
import { initialCards, enableValidation } from "./constans.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js"
import { UserInfo } from "./UserInfo.js";
import { popupProfile, popupImg, buttonOpenPopupProfileForm, buttonOpenImg, userInfoObject } from "./constans.js";

const userInfo = new UserInfo(userInfoObject);

//Попап для ред. профиля
const popupWithProfileForm = new PopupWithForm('#popup-profile', (userData) => {
  userInfo.setUserInfo(userData);
  popupProfileValidation.resetInputError();
});

popupWithProfileForm.setEventListeners();

//Создаёт экземпляр карточки
//items принимает массив данных
//renderer содержит функцию отрисовки данных на странице
//containerElement - селектор контейнера в который добавятся элементы.
const generateCard = new Section({
  items: initialCards,
  renderer: (cardInfo) => {
    const card = new Card(cardInfo, document.querySelector('.element-template'), (object) => {popupWithImage.open(object)});
    generateCard.addItem(card.generateCard());
   }
  },
  '.elements');

//Отрисовывает все элементы переданные в generateCard
generateCard.renderElements();

//попап для добавления картинок
const popupWithAddImageForm = new PopupWithForm('#popup-images', (object) => {
  const objectName = object.popup_mesto;
  const objectLink = object.popup_link;

  const objectCradInfo = {
    name: objectName,
    link: objectLink
  }
  const card = new Card(objectCradInfo, document.querySelector('.element-template'), (object) => {popupWithImage.open(object)});
  generateCard.addItem(card.generateCard());
  popupImgValidation.resetInputError();
});

//навесить слушатели на попап
popupWithAddImageForm.setEventListeners();

//попап с картинкой (открывается по клику на картинку)
export const popupWithImage = new PopupWithImage('#popup-img-open');
popupWithImage.setEventListeners();

//создать класс для попапа ред профиля и включить валидацию
const popupProfileValidation = new FormValidation(enableValidation, popupProfile);
popupProfileValidation.enableValidation();

//создать класс для попапа добавления карточки с картинкой и включить валидацию
const popupImgValidation = new FormValidation(enableValidation, popupImg);
popupImgValidation.enableValidation();

//слушатели для попапа ред профиля
//коллбэк вызывает метод открытия попапа и сбрасывает валидацию
buttonOpenPopupProfileForm.addEventListener('click', () => {popupWithProfileForm.open(), popupProfileValidation.resetInputError(), popupWithProfileForm.setInputValues(userInfo.getUserInfo())});

//слушатели для попапа ред картинок
//коллбэк вызывает метод открытия попапа и сбрасывает валидацию
buttonOpenImg.addEventListener('click', () => {popupWithAddImageForm.open(), popupImgValidation.resetInputError()});
