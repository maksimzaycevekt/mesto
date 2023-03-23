import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._handleSubmit = null
  }

  handleSubmitFunction(newFunction) {
    return this._handleSubmit = newFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.close();
    });
  }
}
