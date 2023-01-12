import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement, handleSubmitForm) {
    super(popupElement);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popupElement.querySelector('.form');
  };

  _getIdCard() {

  };

  close() {
    super.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getIdCard());
      this.close();
    })
  };
}
