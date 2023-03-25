import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupImg = this._element.querySelector('.popup__image');
    this._popupText = this._element.querySelector('.popup__text_type_img');
  }

  open(object){
    super.open();
    this._popupImg.src = object.link;
    this._popupImg.alt = object.name;
    this._popupText.textContent = object.name;
  }
}
