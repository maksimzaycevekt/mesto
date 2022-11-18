let popup = document.querySelector('.popup');
let buttonOpen = document.querySelector('.profile__button');
let buttonClose = document.querySelector('.popup__close-button');

function popupOpen() {
  popup.classList.add('popup_opened');
  let nameInputValueT = document.getElementById('name').value;
  let jobInputValueT = document.getElementById('job').value;
  let names = document.querySelector('.profile__title').textContent;
  let jobs = document.querySelector('.profile__subtitle').textContent;
  nameInputValueT = names;
  jobInputValueT = jobs;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

buttonOpen.addEventListener('click', popupOpen);

buttonClose.addEventListener('click', popupClose);

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('name');
let jobInput = document.querySelector('job');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInputValue = document.getElementById('name').value;
    let jobInputValue = document.getElementById('job').value;
    let name = document.querySelector('.profile__title');
    let job = document.querySelector('.profile__subtitle');
    name.textContent = nameInputValue;
    job.textContent = jobInputValue;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);





