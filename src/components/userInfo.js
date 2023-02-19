export class UserInfo {
  constructor(selName, selAbout, selAvatar) {
    this._elementName = document.querySelector(selName);
    this._elementAbout = document.querySelector(selAbout);
    this._elementAvatar = document.querySelector(selAvatar);
  }

  getUserInfo(data) {
    return {
      name: data.name,
      about: data.about,
      avatar: data.avatar,
      _id: data._id,
    };
  }

  setUserInfo(data) {
    this._elementName.textContent = data.name;
    this._elementAbout.textContent = data.about;
    this._elementAvatar.src = data.avatar;
    this._userId = data._id;
  }
}
