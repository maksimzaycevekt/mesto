//отвечает за открытие закрытие попапа, принимает в конструктор селектор попапа
export class Popup {
  constructor(popupElement) {
    this._element = document.querySelector(popupElement);
    this._handleEscClose = this._handleEscClose.bind(this); //биндим чтобы this ссылался на родителя
  }

  //открытие попапа
  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //закрытие попапа
  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //закрытие попапа по нажатию Esc
  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  //добавляет слушатель иконке закрытия и слушатель закрытия по клику на затемнённую область
  setEventListeners() {
    this._element.querySelector('.popup__close-button')
    .addEventListener('click', () => {
      this.close();
    });
    this._element.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}
