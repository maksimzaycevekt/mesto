//конфиг для валидации
export const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error'
};

//создать класс, конструктор принимает на вход конфиг и форму для валидации
//экспортировать класс
export class FormValidation {
  constructor(enableValidation, formElement) {
    this._enableValidation = enableValidation;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._enableValidation.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._enableValidation.buttonSelector);
  };

  //показать сообщение об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._enableValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  //скрыть сообщение об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._enableValidation.inputErrorClass);
    errorElement.textContent = '';
  };

  //если валидация не пройдена показать сообщение об ошибке, иначе скрыть его
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //найти невалидное поле
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  //переключить состояние кнопки на неактивное если есть невалидное поле иначе отключить неактивное состояние
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._enableValidation.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.classList.remove(this._enableValidation.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  //добавить слушатели
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //включить валидацию
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._enableValidation.formSelector));
    formList.forEach(() => {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    });
  }
}





