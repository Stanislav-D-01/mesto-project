export class Card {
  constructor(
    data,
    templateSelector,
    idUser,
    openViewer,
    apiAddLike,
    apiDelLike,
    apiDeleteCard
  ) {
    this._nameCard = data.name;
    this._linkMesto = data.link;
    this._likes = data.likes;
    this._idUserCard = data.owner._id;
    this._idCard = data._id;
    this._idUser = idUser;
    this._template = document.querySelector(`#${templateSelector}`);
    this._openViewer = openViewer;
    this._apiAddLike = apiAddLike;
    this._apiDelLike = apiDelLike;
    this._apiDeleteCard = apiDeleteCard;
    this._containerNewMesto;
    this._cardImage;
    this._buttonLike;
    this._buttonDelete;
    this._idUser;
    this._card;
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

  _addEventListenerLike() {
    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.matches(".cards__like_active")) {
        this._apiDelLike()
          .then((data) => {
            this._numLikes.textContent = data.likes.length;
            this._buttonLike.classList.remove("cards__like_active");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this._apiAddLike()
          .then((data) => {
            this._numLikes.textContent = data.likes.length;
            this._buttonLike.classList.add("cards__like_active");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  _addEventListenerDeleteCard() {
    this._buttonDelete.addEventListener("click", function (evt) {
      this._apiDeleteCard()
        .then(() => {
          this.closest(".cards__card").remove();
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
    this._addEventListenerLike();
    this._addEventListenerDeleteCard();
    this._addEventListenerViewer();
    return this._card;
  }
}
