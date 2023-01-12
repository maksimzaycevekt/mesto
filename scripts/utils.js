import { сlosePopupClickOverlay, closePopupPressEscape } from "./index.js"

// ф-я открытия попапа для модальных окон
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('mousedown', сlosePopupClickOverlay)
  document.addEventListener('keydown', closePopupPressEscape)
}



