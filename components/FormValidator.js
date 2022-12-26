export default class FormValidator {
  constructor(settings, form) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
  }

  // add error text
  _showError(item, errorMessage) {
    const error = this._form.querySelector(`.${item.id}-error`);
    item.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  };

  // hide error text
  _hideError(item) {
    const error = this._form.querySelector(`.${item.id}-error`);
    item.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  };

  // check the inputs for validity
  _checkValidity(item) {
    if (!item.validity.valid) {
      this._showError(item, item.validationMessage);
    } else {
      this._hideError(item);
    }
  };

  // check invalid inputs
  _hasInvalidItem() {
    return this._itemList.some((item) => {
      return !item.validity.valid;
    })
  };

  // toggle button state
  disableBtn () {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  };

  enableBtn() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  };

  _toggleBtn () {
    if (this._hasInvalidItem()) {
      this.disableBtn();
    } else {
      this.enableBtn();
    };
  };

  // reset errors
  resetValidation() {
    this._toggleBtn();
    this._itemList.forEach((inputElement) => {
      this._hideError(inputElement)
    });
  };

  // call the checkValidity for each symbol input
  _setEventListeners() {
    this._itemList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._toggleBtn();
    this._itemList.forEach((item) => {
      item.addEventListener('input', () => {
        this._checkValidity(item);
        this._toggleBtn();
      });
    });
  };

  // validation
  enableValidation() {
    this._setEventListeners();
  };
}
