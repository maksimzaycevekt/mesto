let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let buttonOpen = document.querySelector('.profile__button');
let buttonClose = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');


function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose();
}

buttonOpen.addEventListener('click', popupOpen);

buttonClose.addEventListener('click', popupClose);

formElement.addEventListener('submit', formSubmitHandler);





