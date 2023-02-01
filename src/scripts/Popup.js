//отвечает за открытие закрытие попапа, принимает в конструктор селектор попапа
export class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
  }

  //открытие попапа
  open() {
    this._selector.classList.add('popup_opened');
    this._handleEscClose();
  }

  //закрытие попапа
  close() {
    this._selector.classList.remove('popup_opened');
  }

  //закрытие попапа по нажатию Esc
  _handleEscClose() {
    document.addEventListener('keydown', (evt) => {
      if(evt.key === 'Escape') {
        this.close();
      }
    });
  }

  //добавляет слушатель иконке закрытия и слушатель закрытия по клику на затемнённую область
  setEventListeners() {
    this._selector.querySelector('.popup__close-button')
    .addEventListener('click', () => {
      this.close();
    });
    this._selector.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}
