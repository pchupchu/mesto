import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import { popups, popupCloseBtns, btnOpenEditing, popupEditProfile, profileName, profileDesc, formElementProfile, nameInput, jobInput, btnOpenAdding, popupAddImage, popupImage, popupImageTitle, popupImageCard, cardsContainer, formElementCard, imageNameInput, imageUrlInput, settings, initialCards } from "../utils/constants.js";

const profileInfo = new UserInfo({
  userName: profileName,
  userDesc:  profileDesc
});

// open edit form
const openEditForm = () => {
  popupProfile.open();

  const infoFromPage = profileInfo.getUserInfo();
  nameInput.value = infoFromPage.userName;
  jobInput.value = infoFromPage.userDesc;
  const profileValidation = new FormValidator(settings, formElementProfile);
  profileValidation.enableValidation();
  profileValidation.enableBtn();
  profileValidation.resetValidation();
};

btnOpenEditing.addEventListener('click', openEditForm);

// submit edit form
const handleSubmitForm = () => {
  profileInfo.setUserInfo(nameInput.value, jobInput.value);
};

const popupProfile = new PopupWithForm(popupEditProfile, handleSubmitForm);
popupProfile.setEventListeners();

// open add image
const openAddImage = () => {
  popupAddCard.open();
  const newCardValidation = new FormValidator(settings, formElementCard);
  newCardValidation.enableValidation();
  newCardValidation.disableBtn();
  newCardValidation.resetValidation();
};

btnOpenAdding.addEventListener('click', openAddImage);

//popup with image
const imageCard = new PopupWithImage(popupImage);

const  handleCardClick = (name, link) => {
  imageCard.open(name, link);
};

// add new card
const handleSubmitCard = () => {
  const cardsObj = {
    name: imageNameInput.value,
    link: imageUrlInput.value
  };
  const card = new Card(cardsObj, '.element-template', handleCardClick);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
};

const popupAddCard = new PopupWithForm(popupAddImage, handleSubmitCard);
popupAddCard.setEventListeners();

// initial cards
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
