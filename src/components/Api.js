export class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

    // Проверка ответа от сервера
  _checkReply(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Общий промис для отрисовки страницы (отрендерит данные только когда оба метода на входе отработают)
  getPromiseAll() {
    return Promise.all([
      this.getCards(),
      this.getInfoUser()
    ])
  }

  //запрос карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkReply)
  }

  //загрузка информации о пользователе с сервера
  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkReply)
  }

  //Отправляет отредактированные данные профиля на сервер
  patchInfoUser({userName, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: about
      })
    })
    .then(this._checkReply)
  }

  //добавить новую карточку на сервер
  postCard({cardName, cardLink}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(this._checkReply)
  }

  //удалить карточку с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkReply)
  }

  //поставить лайк
  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkReply)
  }

  //удалить лайк
  dislikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkReply)
  }

  //сменить аватар
  changeAvatar(imageUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageUrl // тут должен быть url нового аватара
      })
    })
    .then(this._checkReply)
  }

}



