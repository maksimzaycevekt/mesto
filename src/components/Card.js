//Создаём класс Card. В конструкторе на входе object - массив. Name и link присваиваем значения объекта массива.
//Like, remove и element присваиваем null чтобы потом использовать в методах.
export class Card {
    constructor(object, userId, templateSelector, {handleClickOpenCard, handleLikeClick, handleDeleteIconClick}, functionDeleteCard) {
      this._name = object.name;
      this._link = object.link;
      this._likes = object.likes;
      this._like = null;
      this._remove = null;
      this._element = null;
      this._object = object;
      this._templateSelector = templateSelector;

      this._handleClickOpenCard = handleClickOpenCard; //функция выполнится при клике на картинку в карточке
      this._handleLikeClick = handleLikeClick; //функция поставит лайк при клике на сердечко
      this._handleDeleteIconClick = handleDeleteIconClick; //функция которая должна выполниться при клике на урну
      this._functionDeleteCard = functionDeleteCard;

      this._isOwnerId = object.owner._id === userId; //проверка карточки на принадлежность текущему пользователю
      this._objectId = object._id; //получаем id карточки
      this._userId = userId;
    }

    //возвращает id карточки
    getId() {
      return this._objectId
    }

    //обновляет число и статус лайка
    updateLike(likesArray) {
      this._likes = likesArray
      this._likeCounter.textContent = likesArray.length

      if(this.isLiked()) {
        this._like.classList.toggle('element__button_active')
      } else {
        this._like.classList.toggle('element__button_active')
      }
    }

    //проверяет есть ли в массиве лайков id пользователя (начличие лайка)
    isLiked() {
      if (this._likes.some((user) => {return this._userId === user._id})) {
        return true
      } else {
        return false
      }
    }

    //удаляет карточку
    handleClickDeleteCard() {
      this._functionDeleteCard(this._objectId)
        .then(() => {
          this._element.remove()
        })
    };

    //Возвращает template
    _getTemplate() {
      const cardTemplate = this._templateSelector.content
      .querySelector('.element')
      .cloneNode(true);

      return cardTemplate;
    };

    //Метод добавляет слушатели на кнопки лайка, удаления и обработчик клика на картинку
    _setEventListeners() {
      this._likeCounter = this._element.querySelector('.element__button-likes')
      this._like = this._element.querySelector('.element__button');

      //слушатель для лайка
        this._like.addEventListener('click', () => {
          this._handleLikeClick(this);
      });

      //слушатель для урны
      this._remove = this._element.querySelector('.element__button-delite');
      this._remove.addEventListener('click', () => {
         this._handleDeleteIconClick();
      });

      //слушатель для картинки
      const img = this._element.querySelector('.element__image');
      img.addEventListener('click', () =>{
        this._handleClickOpenCard(this._object);
      });
    };

    //Создаёт карточку, возвращает элемент карточки
    generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').alt = this._name;
      this._element.querySelector('.element__text').textContent = this._name;
      this._setEventListeners();

      //отрисовывает количество лайков при создании карточки
      this._likeCounter.textContent = this._likes.length

      //если карточка не принадлежит пользователю - убрать возможность удалить карточку
      if(!this._isOwnerId) {this._element.querySelector('.element__button-delite').remove();};

      //если есть id - активировать лайк
      if(this.isLiked()) {this._like.classList.add('element__button_active')};

      return this._element;
    };
  }




