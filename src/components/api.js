export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._cardsUrl = config.cardsUrl;
    this._likesUrl = config.likesUrl;
    this._avatarUrl = config.avatarUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getInfo() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  loadAvatar() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addLike(cardId) {
    const a = this._likesUrl;

    return fetch(`${this._likesUrl}/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  editProfile(newName, newAbout) {
    return fetch(this._baseUrl, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  postNewCard(nameMesto, linkMesto) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameMesto,
        link: linkMesto,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  reloadNewAvatar(newAvatarLink) {
    return fetch(this._avatarUrl, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newAvatarLink,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}
