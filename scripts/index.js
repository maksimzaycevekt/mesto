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

const elements = document.querySelector('.elements');
const elementContent = document.querySelector('.element-template').content;
const popup = document.querySelector('#popup-profile');
const popupImg = document.querySelector('#popup-images');
const formElement = document.querySelector('.popup__form');
const buttonOpen = document.querySelector('.profile__button');
const buttonClose = document.querySelector('#close-popup-profile');
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
const popupImgSrc = document.querySelector('.popup__image');
const popupImgText = document.querySelector('.popup__text_type_img');

// передаёт данные input-ов в разметку
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose();
}

//добавляет в разметку карточку через popup
function formSubmitImage (evt) {
  evt.preventDefault();
  const addCardsElement = elementContent.cloneNode(true);
  addCardsElement.querySelector('.element__text').textContent = imageName.value;
  addCardsElement.querySelector('.element__image').src = imageLink.value;
  elements.prepend(addCardsElement);
  popupCloseImg();
}

//ф-я открытия попапа для ред. профиля
function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//ф-я закрытия попапа для ред. профиля
function popupClose() {
  popup.classList.remove('popup_opened');
}

//ф-я открытия для формы ред картинок
function popupOpenimg() {
  popupImg.classList.add('popup_opened');
}

//ф-я закрытия попапа для формы ред картинок
function popupCloseImg() {
  popupImg.classList.remove('popup_opened');
}

//ф-я закрытия попапа с картинкой + очистка полей
function popupCloseWindow() {
  popupImgOpen.classList.remove('popup_opened');
  popupImgSrc.src = '';
  popupImgText.textContent = '';

}

//интегрирует в разметку карточки из массива через DOM
initialCards.forEach(function (element) {
  const cardsElement = elementContent.cloneNode(true);

  cardsElement.querySelector('.element__text').textContent = element.name;
  cardsElement.querySelector('.element__image').src = element.link;

  //добавляет возможность ставить лайк на карточках
  cardsElement.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active')
  });

  //добавляет возможность удалять карточки по клику на урну
  cardsElement.querySelector('.element__button-delite').addEventListener('click', function(evt) {
    const target = evt.target;
    const removeButton = target.closest('.element');
    removeButton.remove();
  });

  //передаёт картинку карточки в попап по клику
  cardsElement.querySelector('.element__image').addEventListener('click', function(evt){
    let target = evt.target;
    popupImgSrc.src = target.src;
  });

  //открывает попап по клику картинки в карточках
  cardsElement.querySelector('.element__image').addEventListener('click', function(evt){
    let target = evt.target;
    target = popupImgOpen.classList.add('popup_opened');
    let targetElement = evt.target.closest('.element');
    let targetText = targetElement.querySelector('.element__text');
    popupImgText.textContent = targetText.textContent;
  });

  elements.append(cardsElement);
});

//слушатели для попапа ред профиля
buttonOpen.addEventListener('click', popupOpen);

buttonClose.addEventListener('click', popupClose);

formElement.addEventListener('submit', formSubmitHandler);

//слушатели для попапа ред картинок
buttonOpenImg.addEventListener('click', popupOpenimg);

buttonCloseImg.addEventListener('click', popupCloseImg);

formElementImg.addEventListener('submit', formSubmitImage);

//слушатель для попапа с картинкой
popupImgClose.addEventListener('click', popupCloseWindow);
