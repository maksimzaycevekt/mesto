import { popupWithImage } from "./index.js";

//открывает попап с картинкой для класса Card (ф-я связывает PopupWithImage и Card)
export function handleCardClick(object) {
  popupWithImage.open(object);
};

