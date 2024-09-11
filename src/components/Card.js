class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._likes = data.likes || [];
    this._id = data._id || null;
    this._userId = data.userId || null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data.name, this._data.link);
    });

    if (this._id && this._id.length >= 20) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._id, this);
      });

      this._likeButton.addEventListener("click", () => {
        this._handleLikeClick(this._id, this._isLiked())
          .then((updatedData) => {
            if (updatedData && Array.isArray(updatedData.likes)) {
              this._likes = updatedData.likes;
            } else {
              if (this._isLiked()) {
                this._likes = this._likes.filter(
                  (like) => like._id !== this._userId
                );
              } else {
                this._likes.push({ _id: this._userId });
              }
            }
            this._toggleLikeButton();
          })
          .catch((err) => console.error(`Error liking card: ${err}`));
      });
    } else {
      console.warn(
        "This card does not have a valid server ID, so deleting and liking are disabled."
      );
      this._likeButton.disabled = true;
      this._deleteButton.disabled = true;
    }
  }

  _isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _toggleLikeButton() {
    if (this._isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeButton = this._element.querySelector(".card__like-button");

    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._element.querySelector(".card__title").textContent = this._data.name;

    this._toggleLikeButton();
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
