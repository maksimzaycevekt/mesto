 export class UserInfo {
    constructor({name, info}) {
      this._name = name;
      this._info = info;
      this._userInfoObject = null;
      this._nameString = document.querySelector('.profile__title');
      this._infoString = document.querySelector('.profile__subtitle');
    }
    //создать и вернуть объект с информацией о пользователе
    getUserInfo() {
      this._userInfoObject = {
        userName: this._nameString,
        userInfo: this._infoString
      }

      return this._userInfoObject;
    }

    setUserInfo() {
      this._nameString.textContent = this._name;
      this._infoString.textContent = this._info;
    }
 }
