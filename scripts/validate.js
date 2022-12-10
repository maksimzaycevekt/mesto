
const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};

//принимает форму и элемент input, выполняет проверку на валидность
const isValid = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

//условие для валидации
const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
};

//переключает класс для кнопки
const toggleButtonState = (inputList, buttonSelector) => {
  if (hasInvalidInput(inputList)) {
    buttonSelector.classList.add('popup__button_inactive');
    buttonSelector.setAttribute("disabled", "disabled");
  } else {
    buttonSelector.classList.remove('popup__button_inactive');
    buttonSelector.removeAttribute("disabled");
  }
};

//добавляет обработчики всем полям формы
const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
  const buttonSelector = formSelector.querySelector('.popup__button');

  toggleButtonState(inputList, buttonSelector);

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector)
      toggleButtonState(inputList, buttonSelector);
    });
  });
};


//включает валидацию для всех форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formSelector) => {
    setEventListeners(formSelector);
  });
};

//вызываем функцию
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
});


