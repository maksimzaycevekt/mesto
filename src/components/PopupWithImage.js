import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = document.querySelector('.popup__image');
    this._popupText = document.querySelector('.popup__text_type_img');
  }

  open(object){
    super.open();
    this._popupImg.src = object.link;
    this._popupImg.alt = object.name;
    this._popupText.textContent = object.name;
  }
}
