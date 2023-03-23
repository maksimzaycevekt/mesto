 export class UserInfo {
    constructor({name, info, avatar}) {
      this._name = document.querySelector(name); //селектор title
      this._info = document.querySelector(info); //селектор subtitle
      this._avatar = document.querySelector(avatar) //селектор аватара
      this._userInfoObject = null;
    }

    //создать и вернуть объект с информацией о пользователе которая на данный момент отображена на странице
    getUserInfo() {
      this._userInfoObject = {
        popup_name: this._name.textContent,
        popup_job: this._info.textContent
      }

      return this._userInfoObject;
    }

    //принимает новые данные пользователя и добавляет их в разметку
    setUserInfo({name, about}) {
      this._name.textContent = name;
      this._info.textContent = about;
    }

    setUserAvatar(avatar) {
      this._avatar.src = avatar;
    }
 }
