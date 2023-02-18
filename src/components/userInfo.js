import { data } from "autoprefixer";

export class UserInfo {
  constructor(selName, selAbout, selAvatar) {
    this._Name = document.querySelector(selName);
    this._About = document.querySelector(selAbout);
    this._Avatar = document.querySelector(selAvatar);
    this._id = "";
  }
  _getId(data) {
    this._idUser = data._id;
  }

  getUserInfo(data) {
    this._id = data.id;
    return {
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    };
  }

  setUserInfo(data) {
    this._Name.textContent = data.name;
    this._About.textContent = data.about;
  }

  setAvatar(data) {
    this._Avatar.src = data.avatar;
  }
}
