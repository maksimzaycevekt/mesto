import '../pages/index.css';
import { Card } from "../components/Card";
import { FormValidation } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { enableValidation } from "../scripts/constans.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js"
import { PopupWithConfirmation } from "../components/PopupWithConfirmation"
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js'
import { popupProfile, popupImg, buttonOpenPopupProfileForm, buttonOpenImg, userInfoObject, profileHover, popupAvatar, profileSaveButton, avatarSaveButton, addImageSaveButton } from "../scripts/constans.js";
import { rendelLoading } from '../scripts/utils.js';

// создаёт карточку и возвращаете ее
function createCard(item) {
  const card = new Card(item, userId, document.querySelector('.element-template'),
  {
    //действие при клике по картинке в карточке
    handleClickOpenCard: (object) => {popupWithImage.open(object)},

    //действие по нажатию на лайк (при лайке)
    handleLikeClick: (card) => {
      if (card.checkLiked()) {
        api.dislikeCard(card.getId())
        .then((data) => {card.updateLike(data.likes)})
        .catch((err) => console.log(err))
      } else {
        api.likeCard(card.getId())
        .then((data) => {card.updateLike(data.likes)})
        .catch((err) => console.log(err))
      }
    },

    //действие по нажатию на иконку удаления (урну)
    handleDeleteIconClick: () =>
    {
      popupWithConfirm.handleSubmitFunction(() => {card.handleClickDeleteCard()});
      popupWithConfirm.open();
    }
  },
  //функция удаления карточки
  deleteCard
)
return card};

// содержит api запрос на удаление карточки. функция передаётся аргументом в Card
function deleteCard(cardId) {
  return api.deleteCard(cardId)
 }

//класс Api с запросами к серверу
export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '8296479c-2639-4ad9-a3e8-cb15f60bfcf0',
    'Content-Type': 'application/json'
  }
});

let userId = ""; //переменная для хранения id

//ждёт когда выполнится запрос на получение карточек и информации из профиля
api.getPromiseAll()
  .then(([cards, info]) => { //информация из профиля
    userInfo.setUserInfo(info) //добавляет информацию на страницу
    userInfo.setUserAvatar(info.avatar) //добавляет аватар на страницу
    userId = info._id // хранит id
    cardSection.renderElements(cards) //отрисовывает карточки с сервера
  })
  .catch((err) => console.log(err))

//взаимодействие с информацией пользователя в профиле
const userInfo = new UserInfo(userInfoObject);

//Попап для ред. профиля
const popupWithProfileForm = new PopupWithForm('#popup-profile', (userData) => {
  rendelLoading(true, profileSaveButton)
  api.patchInfoUser({userName: userData.popup_name, about: userData.popup_job}) //отправляет обновлённые данные профиля на сервер
    .then((values) => {
      userInfo.setUserInfo(values)
      popupWithProfileForm.close()})
    .catch(
      (err) => console.log(err))
    .finally(() => {
      rendelLoading(false, profileSaveButton, 'Сохранить')})
});
popupWithProfileForm.setEventListeners();

//попап для редактирования аватара
const popupWithAvatar = new PopupWithForm('#popup-avatar', (userData) => {
  rendelLoading(true, avatarSaveButton)
  api.changeAvatar(userData.popup_link)
    .then((values) => {
      userInfo.setUserAvatar(values.avatar)
      popupWithAvatar.close()})
    .catch(
      (err) => console.log(err))
    .finally(() => {
      rendelLoading(false, avatarSaveButton, 'Сохранить')})
})
popupWithAvatar.setEventListeners();

//Создаёт экземпляр карточки
const cardSection = new Section({
  //renderer содержит функцию отрисовки данных на странице
  renderer: (cardInfo) => {
    const card = createCard(cardInfo)
    cardSection.addItem(card.generateCard(card));
   }
  },
  '.elements');

//попап для добавления картинок
const popupWithAddImageForm = new PopupWithForm('#popup-images', (object) => {
  const objectName = object.popup_mesto;
  const objectLink = object.popup_link;

  rendelLoading(true, addImageSaveButton)
  api.postCard({cardName: objectName, cardLink: objectLink})
  .then((res) => {
    const card = createCard(res)
    cardSection.addItem(card.generateCard(card))
    popupWithAddImageForm.close()
  })
  .catch(
    (err) => console.log(err))
  .finally(
    () => {rendelLoading(false, addImageSaveButton,'Создать' )})
});
popupWithAddImageForm.setEventListeners();

//попап с предупреждением об удалении карточки
const popupWithConfirm = new PopupWithConfirmation ('#popup-delete');
popupWithConfirm.setEventListeners();

//попап с картинкой (открывается по клику на картинку)
export const popupWithImage = new PopupWithImage('#popup-img-open');
popupWithImage.setEventListeners();

//класс валидации для попапа ред профиля
const popupProfileValidation = new FormValidation(enableValidation, popupProfile);
popupProfileValidation.enableValidation();

//класс валидации для попапа добавления карточки с картинкой
const popupImgValidation = new FormValidation(enableValidation, popupImg);
popupImgValidation.enableValidation();

//класс валидации для попапа ред аватара
const popupAvatarValidation = new FormValidation(enableValidation, popupAvatar);
popupAvatarValidation.enableValidation();

//слушатель для попапа ред профиля
//коллбэк вызывает метод открытия попапа и сбрасывает валидацию
buttonOpenPopupProfileForm.addEventListener('click', () => {
  popupWithProfileForm.open(),
  popupProfileValidation.resetInputError(),
  popupWithProfileForm.setInputValues(userInfo.getUserInfo())});

//слушатель для попапа ред картинок
//коллбэк вызывает метод открытия попапа и сбрасывает валидацию
buttonOpenImg.addEventListener('click', () => {
  popupWithAddImageForm.open(),
  popupImgValidation.resetInputError()});

//слушатель для открытия попапа с аватаром
//коллбэк вызывает метод открытия попапа и сбрасывает валидацию
profileHover.addEventListener('click', () => {
  popupWithAvatar.open(),
  popupAvatarValidation.resetInputError()});



