import { handleCardClick } from "./utils.js"

//Создаём класс Card. В конструкторе на входе object - массив. Name и link присваиваем значения объекта массива.
//Like, remove и element присваиваем null чтобы потом использовать в методах.
export class Card {
    constructor(object, templateSelector) {
      this._name = object.name;
      this._link = object.link;
      this._like = null;
      this._remove = null;
      this._element = null;
      this._templateSelector = templateSelector;
      this._object = object;
    }

    //Методы для обработчиков событий _setEventListeners
    _handleClickLikedCard() {
      this._like.classList.toggle('element__button_active');
    }

    _handleClickDeleteCard() {
      this._element.remove();
      this._element = null;
    }

    _handleClickOpenCard() {
      handleCardClick(this._object);
    }

    //Метод добавляет слушатели на кнопки лайка, удаления и обработчик клика на картинку
    _setEventListeners() {
      this._like = this._element.querySelector('.element__button');
        this._like.addEventListener('click', () => {
          this._handleClickLikedCard();
      });

      this._remove = this._element.querySelector('.element__button-delite');
      this._remove.addEventListener('click', () => {
        this._handleClickDeleteCard();
      });

      const img = this._element.querySelector('.element__image');
      img.addEventListener('click', () =>{
        this._handleClickOpenCard();
      });
    };

    //Возвращает template
    _getTemplate() {
      const cardTemplate = this._templateSelector.content
      .querySelector('.element')
      .cloneNode(true);

      return cardTemplate;
    }

    //Создаёт карточку
    generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').alt = this._name;
      this._element.querySelector('.element__text').textContent = this._name;
      this._setEventListeners();

      return this._element;
    }
  }




