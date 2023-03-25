import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._handleSubmit = null
  }

  handleSubmitFunction(newFunction) {
    return this._handleSubmit = newFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
