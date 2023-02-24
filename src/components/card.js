export class Cards {
  constructor(data, templateSelector, idUser, openViewer) {
    this._nameCard = data.name;
    this._linkMesto = data.link;
    this._likes = data.likes;
    this._idUserCard = data.owner._id;
    this._idCard = data._id;
    this._idUser = idUser;
    this._template = document.querySelector(`#${templateSelector}`);
    this._openViewer = openViewer;
    this._containerNewMesto;
    this._cardImage;
    this._buttonLike;
    this._buttonDelete;
    this._idUser;
  }

  _createContainerNewMesto() {
    this._containerNewMesto = this._template.content.cloneNode(true);
    this._cardImage = this._containerNewMesto.querySelector(".cards__image");
    this._buttonLike = this._containerNewMesto.querySelector(".cards__like");
    this._numLikes = this._containerNewMesto.querySelector(".cards__num-likes");
    this._buttonDelete =
      this._containerNewMesto.querySelector(".cards__delete");
    this._cardImage.src = this._linkMesto;
    this._cardImage.alt = this._nameCard;
    this._numLikes.textContent = this._likes.length;
    this._containerNewMesto.querySelector(".cards__title").textContent =
      this._nameCard;
    return this._containerNewMesto;
  }
  _checkMyLike() {
    if (this._likes.length > 0) {
      for (let i = 0; i < this._likes.length; i++) {
        if (this._likes[i]._id == this._idUser) {
          this._buttonLike.classList.add("cards__like_active");
          break;
        }
      }
    }
  }
  _checkMyCards() {
    if (this._idUserCard == this._idUser) {
      this._buttonDelete.classList.add("cards__delete_visible");
    }
  }

  _addEventListenerLike(apiAddLike, apiDelLike) {
    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.matches(".cards__like_active")) {
        apiDelLike().then((data) => {
          this._numLikes.textContent = data.likes.length;
          this._buttonLike.classList.remove("cards__like_active");
        });
      } else {
        apiAddLike().then((data) => {
          this._numLikes.textContent = data.likes.length;
          this._buttonLike.classList.add("cards__like_active");
        });
      }
    });
  }

  _addEventListenerDeleteCard(apiDeleteCard) {
    this._buttonDelete.addEventListener("click", function (evt) {
      apiDeleteCard()
        .then(() => {
          evt.target.parentElement.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  _addEventListenerViewer() {
    this._cardImage.addEventListener("click", this._openViewer);
  }

  getFinishCard(addLike, delLike, DelCard) {
    this._card = this._createContainerNewMesto();
    this._checkMyLike();
    this._checkMyCards();
    this._addEventListenerLike(addLike, delLike);
    this._addEventListenerDeleteCard(DelCard);
    this._addEventListenerViewer();
    return this._card;
  }
}
