import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement, handleDeleteMyCard) {
    super(popupElement);
    this._handleDeleteMyCard = handleDeleteMyCard;
    this._form = this._popupElement.querySelector('.form');
  };

  setCard(cardObj) {
    this._cardObj = cardObj;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDeleteMyCard(this._cardObj);
      this.close();
    })
  };
}
