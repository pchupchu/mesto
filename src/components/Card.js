export default class Card {
  constructor(item, templateSelector, handleCardClick, userId, handleDeleteCard) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._cardId = item._id;
    this._ownerId = item.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
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
      this._likeCard();
    });
    //this._likeCount();
    this._trashBtn.addEventListener('click', () => {
      this._handleDeleteCard(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
      console.log(this._cardId);
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
