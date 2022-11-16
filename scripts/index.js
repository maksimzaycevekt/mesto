let popup = document.querySelector('.popup');
let buttonOpen = document.querySelector('.profile__button');
let buttonClose = document.querySelector('.popup__close-button');
let buttonSave = document.querySelector('popup__button');

buttonOpen.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});

buttonClose.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('name');
let jobInput = document.querySelector('job');

function formSubmitHandler (evt) {
    evt.preventDefault('');
    var nameInputValue = document.getElementById('name').value;
    var jobInputValue = document.getElementById('job').value;
    let name = document.querySelector('.profile__title');
    let job = document.querySelector('.profile__subtitle');
    name.textContent = nameInputValue;
    job.textContent = jobInputValue;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);





