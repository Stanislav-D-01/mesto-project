export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._cardsUrl = config.cardsUrl;
    this._likesUrl = config.likesUrl;
    this._avatarUrl = config.avatar;
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
    return fetch(config._baseUrl, {
      method: "PATCH",
      headers: {
        authorization: config._headers.authorization,
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
      return this.checkResponse(res);
    });
  }
}

/**
export function getUserInfo() {
  return fetch(config.baseUrl, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function loadAvatar() {
  return fetch(config.baseUrl, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function deleteLike(cardId) {
  return fetch(`${config.likesUrl}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function addLike(cardId) {
  return fetch(`${config.likesUrl}/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function deleteCard(cardId) {
  return fetch(`${config.cardsUrl}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export function getCards() {
  return fetch(config.cardsUrl, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function patchProfile(nameInput, aboutInput) {
  return fetch(config.baseUrl, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: aboutInput.value,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function postNewCard(nameMestoInput, linkMestoInput) {
  return fetch(config.cardsUrl, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameMestoInput.value,
      link: linkMestoInput.value,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function reloadAvatar(newAvatarInput) {
  return fetch(config.avatarUrl, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: newAvatarInput.value,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}
*/
