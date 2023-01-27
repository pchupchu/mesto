export const popups = document.querySelectorAll('.popup');
export const popupCloseBtns = document.querySelectorAll('.popup__close-button');

export const avatar = document.querySelector('.profile__avatar-container');
export const avatarInput = document.querySelector('#avatar');
export const formElementAvatar = document.querySelector('.form_avatar');
export const popupAddAvatar = document.querySelector('.popup_type_add-avatar');

export const btnOpenEditing = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');

export const profileName = document.querySelector('.profile__name');
export const profileDesc = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__avatar');

export const formElementProfile = document.querySelector('.form_profile');
export const nameInput = document.querySelector('#name');
export const jobInput = document.querySelector('#about');

export const btnOpenAdding = document.querySelector('.profile__add-button');
export const popupAddImage = document.querySelector('.popup_type_add-image');

export const popupImage = document.querySelector('.popup_type_image');
export const popupImageTitle = document.querySelector('.popup__image-title');
export const popupImageCard = document.querySelector('.popup__image-card');

export const cardsContainer = document.querySelector('.elements__list');

export const formElementCard = document.querySelector('.form_card');
export const imageNameInput = document.querySelector('#imagename');
export const imageUrlInput = document.querySelector('#imageurl');

export const popupDeleteCard = document.querySelector('.popup_type_delete-card');

export const settings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

export const initialCards = [
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
