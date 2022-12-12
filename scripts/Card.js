import {openPopup, popupImage, popupImageTitle, popupImageCard} from "./index.js";

export default class Card {
  constructor(item, templateSelector) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
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

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  };

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImage();
    });
  };

  // like card
  _likeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  };

  // delete card
  _deleteCard() {
    this._element.querySelector('.element__trash-button').closest('.element').remove();
  };

  // open popup with image
  _openImage() {
    openPopup(popupImage);
    popupImageTitle.textContent = this._name;
    popupImageCard.src = this._link;
    popupImageCard.alt = this._name;
  };
};
