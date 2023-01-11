import {openPopup} from './index.js'; //Импортируем функцию открытия попапа

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Создаём класс Card. В конструкторе на входе object - массив. Name и link присваиваем значения объекта массива.
//Like, remove и element присваиваем null чтобы потом использовать в методах.
export class Card {
    constructor(object) {
      this._name = object.name;
      this._link = object.link;
      this._like = null;
      this._remove = null;
      this._element = null;
    }

    //Приватный метод лайка для карточки. Присваиваем this._like селектор кнопки лайка и навешиваем на него слушатель
    _handleClickLikedCard() {
      this._like = this._element.querySelector('.element__button');
        this._like.addEventListener('click', () => {
          this._like.classList.toggle('element__button_active');
      });
    };

    //Приватный метод удаления карточки по клику на урну. Присваиваем this._remove селектор кнопки удаления
    //и навешиваем слушатель. В слушателе по клику удаляем ближайший element.
    _handleClickTrashRemoveCard() {
      this._remove = this._element.querySelector('.element__button-delite');
      this._remove.addEventListener('click', () => {
        const removeButton = this._remove.closest('.element');
        removeButton.remove();
      });
    }

    //Приватный метод. Открывает попап с картинкой и текстом, если кликнуть по изображению в карточке
    _handleClickPopupOpenImg() {
      const img = this._element.querySelector('.element__image');
      img.addEventListener('click', () =>{
        const popupImg = document.querySelector('.popup__image');
        const popupText = document.querySelector('.popup__text_type_img');
        popupImg.src = this._link;
        popupImg.alt = this._name;
        popupText.textContent = this._element.querySelector('.element__text').textContent;
        openPopup(document.querySelector('#popup-img-open'))
      });
    }


    //Возвращает template
    _getTemplate() {
      const cardTemplate = document.querySelector('.element-template').content
      .querySelector('.element')
      .cloneNode(true);

      return cardTemplate;
    }

    //Создаёт карточку
    _generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').alt = this._name;
      this._element.querySelector('.element__text').textContent = this._name;
      this._handleClickLikedCard();
      this._handleClickTrashRemoveCard();
      this._handleClickPopupOpenImg();

      return this._element;
    }
  }

//Перебирает массив и создает новый класс с карточкой с помощью метода _generateCard()
initialCards.forEach((item) => {
  const card = new Card(item);
  const cardGenerate = card._generateCard();
  document.querySelector('.elements').append(cardGenerate);
});



