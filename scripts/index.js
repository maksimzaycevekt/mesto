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

const cardsContainer = document.querySelector('.elements');
const elementContent = document.querySelector('.element-template').content;
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
const popupImgSrc = document.querySelector('.popup__image');
const popupImgText = document.querySelector('.popup__text_type_img');
const popupList = document.querySelectorAll('.popup');
const popupContainer = document.querySelectorAll('.popup__container');
const popupImgButton = popupImg.querySelector('.popup__button');

// передаёт данные input-ов в разметку
function handleSubmitProfileFormInput (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  handleClickClosePopupProfileForm();
}

// ф-я открытия попапа для модальных окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('mousedown', сlosePopupClickOverlay)
  document.addEventListener('keydown', closePopupPressEscape)
}

// ф-я закрытия попапа для модальных окон
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('mousedown', сlosePopupClickOverlay)
  document.removeEventListener('keydown', closePopupPressEscape)
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
  popupImgButton.setAttribute('disabled', 'disabled');
  popupImgButton.classList.add('popup__button_inactive')
}

//ф-я закрытия попапа для формы ред картинок
function handleClickClosePopupImgageEditForm() {
  closePopup(popupImg);
}

//ф-я закрытия попапа с картинкой
function handleCkickClosePopupImageModalWindow() {
  closePopup(popupImgOpen);
}


//ф-я создания карточки
function createCard(name, link) {
  cardsElement = elementContent.cloneNode(true);
  cardsElement.querySelector('.element__text').textContent = name;
  const elementImage = cardsElement.querySelector('.element__image');
  elementImage.src = link;
  elementImage.alt = name;

//добавляет возможность ставить лайк на карточках
cardsElement.querySelector('.element__button').addEventListener('click', function(evt) {
  evt.target.classList.toggle('element__button_active');
});

//добавляет возможность удалять карточки по клику на урну
cardsElement.querySelector('.element__button-delite').addEventListener('click', function(evt) {
  const target = evt.target;
  const removeButton = target.closest('.element');
  removeButton.remove();
});

//открывает попап по клику картинки в карточках
elementImage.addEventListener('click', function(evt) {
  popupImgSrc.src = link;
  popupImgSrc.alt = name;
  const targetElement = evt.target.closest('.element');
  const targetText = targetElement.querySelector('.element__text');
  popupImgText.textContent = targetText.textContent;
  openPopup(popupImgOpen);
});

  return cardsElement;
}

//интегрирует в разметку карточки из массива через DOM
initialCards.forEach(function(element) {

  createCard(element.name, element.link)

  cardsContainer.append(cardsElement);
 });

//добавляет в разметку карточку через popup
function handleSubmitImageForm(evt) {
  evt.preventDefault();

  createCard(imageName.value, imageLink.value);
  cardsContainer.prepend(cardsElement);
  handleClickClosePopupImgageEditForm();
};

//ф-я закрытия попапа по клику оверлея
function сlosePopupClickOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

//ф-я закрытия попапа ппо нажатию Escape
function closePopupPressEscape(evt) {
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
