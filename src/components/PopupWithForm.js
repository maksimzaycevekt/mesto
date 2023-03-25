import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._formValues = null;
    this._inputList = Array.from(this._element.querySelectorAll('.popup__input'));
    this._popupForm = this._element.querySelector('.popup__form');
  }



  //собирает данные полей формы
  _getInputValues() {
    this._formValues = {}; //создать объект
    //записать в него значения полей
    this._inputList.forEach(inputElement => {
      this._formValues[inputElement.name] = inputElement.value;
    });

    return this._formValues; //вернуть объект
  }

  close() {
    super.close();
    this._popupForm.reset(); //добавлен сброс формы после закрытия
  }

  setInputValues(inputValues) {
    Object.values(this._inputList).forEach((input) => input.value = inputValues[input.name]);
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
