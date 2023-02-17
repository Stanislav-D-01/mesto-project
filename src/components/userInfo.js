import { data } from "autoprefixer";

export class UserInfo {
  constructor(formName, formAbout, avatar) {
    this._formName = formName;
    this._formAbout = formAbout;
    this._avatar = avatar;
    this._idUser = null;
  }

  _getId(data) {
    this._idUser = data._id;
  }

  pastNameAndAbout(name, about, id) {
    this._formName.textContent = name;
    this._formAbout.textContent = about;
  }

  pastAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }
}
