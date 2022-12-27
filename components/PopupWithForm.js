import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._element = this._popupSelector.querySelector('.form');
  };

  _getInputValues() {
    this._itemList = this._element.querySelectorAll('.form__item');
    this._formValues = {};
    this._itemList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  };

  close() {
    super.close();
    this._element.reset();
  };

  _setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    })
  };
}
