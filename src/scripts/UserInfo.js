 export class UserInfo {
    constructor({name, info}) {
      this._name = document.querySelector(name);
      this._info = document.querySelector(info);
      this._userInfoObject = null;
      this._nameString = document.querySelector('.profile__title');
      this._infoString = document.querySelector('.profile__subtitle');
    }

    //создать и вернуть объект с информацией о пользователе которая на данный момент отображена на странице
    getUserInfo() {
      this._userInfoObject = {
        popup_name: this._nameString.textContent,
        popup_job: this._infoString.textContent
      }

      return this._userInfoObject;
    }

    //принимает новые данные пользователя и добавляет их в разметку
    setUserInfo({popup_name, popup_job}) {
      this._name.textContent = popup_name;
      this._info.textContent = popup_job;
    }
 }
