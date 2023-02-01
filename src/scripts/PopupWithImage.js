import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(object){
    super.open();
    const popupImg = document.querySelector('.popup__image');
    const popupText = document.querySelector('.popup__text_type_img');
    popupImg.src = object.link;
    popupImg.alt = object.name;
    popupText.textContent = object.name;
  }
}
