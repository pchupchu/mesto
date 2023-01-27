import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement, handleSubmitForm) {
    super(popupElement);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popupElement.querySelector('.form');
  };

  setCard(cardObj) {

    this._cardObj = cardObj;

  };



  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._cardObj);
      this.close();
    })
  };
}
