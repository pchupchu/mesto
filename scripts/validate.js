const settingsObj = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

// add error text
const showError = (form, item, errorMessage, settingsObj) => {
  const error = form.querySelector(`.${item.id}-error`);
  item.classList.add(settingsObj.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(settingsObj.errorClass);
};

// hide error text
const hideError = (form, item, settingsObj) => {
  const error = form.querySelector(`.${item.id}-error`);
  item.classList.remove(settingsObj.inputErrorClass);
  error.classList.remove(settingsObj.errorClass);
  error.textContent = '';
};

// check the inputs for validity
const checkValidity = (form, item, settingsObj) => {
  if (!item.validity.valid) {
    showError(form, item, item.validationMessage, settingsObj);
  } else {
    hideError(form, item, settingsObj);
  }
};

// check invalid inputs
const hasInvalidItem = (itemList) => {
  return itemList.some((item) => {
    return !item.validity.valid;
  })
};

// toggle button state
const toggleBtn = (button, itemList, settingsObj) => {
  if (hasInvalidItem(itemList)) {
    button.classList.add(settingsObj.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(settingsObj.inactiveButtonClass);
    button.disabled = false;
  }
};

// call the checkValidity for each symbol input
const setEventListeners = (form, settingsObj) => {
  const itemList = Array.from(form.querySelectorAll(settingsObj.inputSelector));
  const button = form.querySelector(settingsObj.submitButtonSelector);
  toggleBtn(button, itemList, settingsObj);
  itemList.forEach((item) => {
    item.addEventListener('input', () => {
      checkValidity(form, item, settingsObj);
      toggleBtn(button, itemList, settingsObj);
    });
  });
};

// validation
const enableValidation = (settingsObj) => {
  const formList = Array.from(document.querySelectorAll(settingsObj.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, settingsObj);
  });
};

enableValidation(settingsObj);
