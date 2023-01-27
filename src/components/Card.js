export default class Card {
  constructor(item, templateSelector, handleCardClick, userId) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._ownerId = item.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

      return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  };

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like-button');
    this._numberOfLikes = this._element.querySelector('.element__number-of-likes');
    this._trashBtn = this._element.querySelector('.element__trash-button');
    this._cardImage = this._element.querySelector('.element__image');

    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });
    //this._likeCount();
    this._trashBtn.addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
      console.log(this._ownerId);
    });
  };

  // like card
  _likeCard() {
    this._likeButton.classList.toggle('element__like-button_active');
  };

  setLike(likes) {
    this._likeCount.textContent = likes;

  }

  _likeCount() {
    this._numberOfLikes.textContent = this.item.likes.length;
  }

  // delete card
  _deleteCard() {

    this._element.remove();
    this._element = null;
  };
};
