export default class Card {
  constructor(item, templateSelector, userId, handleCardClick, handleDeleteCard, handleSetLike, handleDeleteLike) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this.cardId = item._id;
    this._ownerId = item.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;
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
    this._isItemOwner()

    return this._element;
  };

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like-button');
    this._numberOfLikes = this._element.querySelector('.element__number-of-likes');
    this._trashBtn = this._element.querySelector('.element__trash-button');
    this._cardImage = this._element.querySelector('.element__image');

    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__like-button_active')) {
        this._handleDeleteLike(this);
      } else {
        this._handleSetLike(this);
      }
   });

   this._isLiked();

    // this._likeCount();
    this._numberOfLikes.textContent = this._likes.length;

    this._trashBtn.addEventListener('click', () => {
      this._handleDeleteCard(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  // like card
  _isLiked() {
    if (this._likes.some((user) => user._id === this._userId )) {
      this.setActiveLike()
    } else {
      this.setUnactiveLike()
    }
  };

  setActiveLike() {
    this._likeButton.classList.add('element__like-button_active');
  };

  setUnactiveLike() {
    this._likeButton.classList.remove('element__like-button_active');
  };

  likeCount(res) {
    this._numberOfLikes.textContent = res.likes.length;
  };

  // delete card
  delete() {
    this._element.remove();
    this._element = null;
  };

  _isItemOwner(){
    if(this._ownerId != this._userId){
      this._trashBtn.remove()
      this._trashBtn = null;
    }
  }
};
