export default class Card {
  constructor(item, templateSelector, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
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
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  // like card
  _likeCard() {
    this._likeButton.classList.toggle('element__like-button_active');
  };

  // delete card
  _deleteCard() {
    this._element.remove();
    this._element = null;
  };
};
