import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popups = document.querySelectorAll('.popup');
const popupCloseBtns = document.querySelectorAll('.popup__close-button');

const btnOpenEditing = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const formElementProfile = document.querySelector('.form_profile');
const nameInput = document.querySelector('#firstname');
const jobInput = document.querySelector('#job');

const btnOpenAdding = document.querySelector('.profile__add-button');
const popupAddImage = document.querySelector('.popup_type_add-image');

export const popupImage = document.querySelector('.popup_type_image');
export const popupImageTitle = document.querySelector('.popup__image-title');
export const popupImageCard = document.querySelector('.popup__image-card');

const cardsContainer = document.querySelector('.elements__list');

const formElementCard = document.querySelector('.form_card');
const imageNameInput = document.querySelector('#imagename');
const imageUrlInput = document.querySelector('#imageurl');

const settings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

const formList = Array.from(document.querySelectorAll(settings.formSelector));

const initialCards = [
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1605551004124-dee241ed2c9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Краснодарский край',
    link: 'https://images.unsplash.com/photo-1582948818260-ad04bc825512?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Иваново',
    link: 'https://images.unsplash.com/photo-1578401161046-a2542d17fb27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1626538481998-0629afebd684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Онежское озеро',
    link: 'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80'
  },
  {
    name: 'Тулиновка',
    link: 'https://images.unsplash.com/photo-1516128935666-9742cf27e24c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  }
];

// open popup
export const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

// close popup
const closePopup = (popupOpened) => {
  popupOpened.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

popupCloseBtns.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// close with overlay
popups.forEach((popupElement) => {
  popupElement.addEventListener('click', (event) => {
    if(event.target.classList.contains('popup_opened')) {
      closePopup(popupElement);
    }
  })
});

// close by esc
const closePopupByEsc = (evt) => {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// enable and disable buttons
const disableBtn = (button, settings) => {
  button.classList.add(settings.inactiveButtonClass);
  button.disabled = true;
};

const enableBtn = (button, settings) => {
  button.classList.remove(settings.inactiveButtonClass);
  button.disabled = false;
};

// open edit form
const openEditForm = () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  const button = popupEditProfile.querySelector('.form__button');
  enableBtn(button, settings);
};

btnOpenEditing.addEventListener('click', openEditForm);

// submit edit form
const handleSubmitForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

formElementProfile.addEventListener('submit', handleSubmitForm);

// open add image
const openAddImage = () => {
  openPopup(popupAddImage);
  const button = popupAddImage.querySelector('.form__button');
  disableBtn(button, settings);
};

btnOpenAdding.addEventListener('click', openAddImage);

// add new card
const addCard = (item) => {
  const card = new Card(item, '.element-template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
};

const handleSubmitCard = (evt) => {
  evt.preventDefault();
  const card = {
    name: imageNameInput.value,
    link: imageUrlInput.value
  };
  addCard(card);
  evt.target.reset();
  closePopup(popupAddImage);
};

formElementCard.addEventListener('submit', handleSubmitCard);

// initial cards
initialCards.forEach((item) => {
  addCard(item);
});

formList.forEach(form => {
  const item = new FormValidator(settings, form);
  item.enableValidation(settings);
});
