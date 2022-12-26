import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import { popups, popupCloseBtns, btnOpenEditing, popupEditProfile, profileName, profileDesc, formElementProfile, nameInput, jobInput, btnOpenAdding, popupAddImage, popupImage, popupImageTitle, popupImageCard, cardsContainer, formElementCard, imageNameInput, imageUrlInput, settings, initialCards } from "../utils/constants.js";

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

// open edit form
const openEditForm = () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  const profileValidation = new FormValidator(settings, formElementProfile);
  profileValidation.enableValidation();
  profileValidation.enableBtn();
  profileValidation.resetValidation();
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
  const newCardValidation = new FormValidator(settings, formElementCard);
  newCardValidation.enableValidation();
  newCardValidation.disableBtn();
  newCardValidation.resetValidation();
};

btnOpenAdding.addEventListener('click', openAddImage);

//open popup with image
function handleCardClick(name, link) {
  popupImageCard.src = link;
  popupImageCard.alt = name;
  popupImageTitle.textContent = name;
  openPopup(popupImage);
};

// add new card
const addCard = (item) => {
  const card = new Card(item, '.element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const createCard = (cardElement) => {
  cardsContainer.prepend(addCard(cardElement));
};

const handleSubmitCard = (evt) => {
  evt.preventDefault();
  const card = {
    name: imageNameInput.value,
    link: imageUrlInput.value
  };
  createCard(card);
  evt.target.reset();
  closePopup(popupAddImage);
};

formElementCard.addEventListener('submit', handleSubmitCard);

// initial cards
/*initialCards.forEach((item) => {
  createCard(item);
});*/

const initialCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.element-template', handleCardClick);
      const cardElement = card.generateCard();
      initialCardList.addItem(cardElement);
    }
  },
  '.elements__list');

  initialCardList.renderer();
