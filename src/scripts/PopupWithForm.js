import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formValues = null;
    this._inputList = Array.from(this._selector.querySelectorAll('.popup__input'));
    this._popupForm = this._selector.querySelector('.popup__form');
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

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues()
      this._handleFormSubmit(this._formValues);
      this.close();
    });
  }
}
