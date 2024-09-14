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
    this._id = data._id;
    this._isLiked = data.isLiked || false;
    this._ownerId = data.owner;
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

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked, this)
        .then((updatedData) => {
          this._isLiked = updatedData.isLiked;
          this._toggleLikeButton();
        })
        .catch((err) => console.error(`Error liking card: ${err}`));
    });
  }

  _toggleLikeButton() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  handleDelete() {
    this._element.remove();
    this._element = null;
  }

  setLikes(isLiked) {
    this._isLiked = isLiked;
    this._toggleLikeButton();
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
