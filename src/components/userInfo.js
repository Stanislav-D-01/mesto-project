export class UserInfo {
  constructor(selName, selAbout, selAvatar) {
    this._elementName = document.querySelector(selName);
    this._elementAbout = document.querySelector(selAbout);
    this._elemennAvatar = document.querySelector(selAvatar);
  }

  getUserInfo() {
    return {
      name: this._elementName.textContent,
      about: this._elementAbout.textContent,
      avatar: this._elemetnAvatar.src,
    };
  }

  setUserInfo(data, editProfile) {
    editProfile(data.name, data.about).then((res) => {
      this._elementName.textContent = res.name;
      this._elementAbout.textContent = res.about;
    });
  }

  setUserAvatar(avatar, reloadAvatar) {
    reloadAvatar(avatar).then((res) => {
      this._elemetnAvatar.src = res.avatar;
    });
  }
}
