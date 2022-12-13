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
  _showError(form, item, errorMessage) {
    const error = this._form.querySelector(`.${item.id}-error`);
    item.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  };

  // hide error text
  _hideError(form, item) {
    const error = this._form.querySelector(`.${item.id}-error`);
    item.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  };

  // check the inputs for validity
  _checkValidity(form, item, settings) {
    if (!item.validity.valid) {
      this._showError(form, item, item.validationMessage);
    } else {
      this._hideError(form, item);
    }
  };

  // check invalid inputs
  _hasInvalidItem(itemList) {
    return itemList.some((item) => {
      return !item.validity.valid;
    })
  };

  // toggle button state
  _disableBtn (button) {
    button.classList.add(this._inactiveButtonClass);
    button.disabled = true;
  };

  _enableBtn(button) {
    button.classList.remove(this._inactiveButtonClass);
    button.disabled = false;
  };

  _toggleBtn (button, itemList) {
    if (this._hasInvalidItem(itemList)) {
      this._disableBtn(button);
    } else {
      this._enableBtn(button);
    }
  };

  // call the checkValidity for each symbol input
  _setEventListeners(form, settings) {
    const itemList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);
    this._toggleBtn(button, itemList);
    itemList.forEach((item) => {
      item.addEventListener('input', () => {
        this._checkValidity(form, item, settings);
        this._toggleBtn(button, itemList);
      });
    });
  };

  // validation
  enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((form) => {
      this._setEventListeners(form, settings);
    });
  };
}
