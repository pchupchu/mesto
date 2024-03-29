import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleSubmitForm) {
    super(popupElement);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popupElement.querySelector('.form');
    this._itemList = this._form.querySelectorAll('.form__item');
    this._formBtn = this._popupElement.querySelector('.form__button');
    this._formBtnText = this._formBtn.textContent;
  };

  _getInputValues() {
    this._formValues = {};
    this._itemList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  };

  setInputValues(data) {
    this._itemList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  };

  isSaving(value) {
    if(value) {
      this._formBtn.textContent = 'Сохранение...';
      this._formBtn.disabled = value;
    } else {
      this._formBtn.textContent = this._formBtnText;
      this._formBtn.disabled = value;
    }
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.isSaving(true);
      this._handleSubmitForm(this._getInputValues());
    })
  };
}
