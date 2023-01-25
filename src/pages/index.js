import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from '../components/Popup';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { avatar, avatarInput, formElementAvatar, popupAddAvatar, btnOpenEditing, popupEditProfile, profileName, profileDesc, profileAvatar, formElementProfile, nameInput, jobInput, btnOpenAdding, popupAddImage, popupImage, cardsContainer, formElementCard, imageNameInput, imageUrlInput, settings, initialCards } from "../utils/constants.js";

// validation
const profileValidation = new FormValidator(settings, formElementProfile);
profileValidation.enableValidation();

const newCardValidation = new FormValidator(settings, formElementCard);
newCardValidation.enableValidation();

const avatarValidation = new FormValidator(settings, formElementAvatar);
avatarValidation.enableValidation();

const profileInfo = new UserInfo({
  userName: profileName,
  userDesc:  profileDesc,
  userAvatar: profileAvatar
});

const openAddAvatar = () => {
  popupAvatar.open();
  avatarValidation.resetValidation();
}

avatar.addEventListener('click', openAddAvatar);

const handleSubmitAvatar = () => {
  profileInfo.setUserAvatar(avatarInput.value);
}

const popupAvatar = new PopupWithForm(popupAddAvatar, handleSubmitAvatar);
popupAvatar.setEventListeners();

// open edit form
const openEditForm = () => {
  popupProfile.open();

  const infoFromPage = profileInfo.getUserInfo();
  nameInput.value = infoFromPage.userName;
  jobInput.value = infoFromPage.userDesc;
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
  newCardValidation.resetValidation();
};

btnOpenAdding.addEventListener('click', openAddImage);

//popup with image
const imageCard = new PopupWithImage(popupImage);
imageCard.setEventListeners();

const  handleCardClick = (name, link) => {
  imageCard.open(name, link);
};

// add new card
const addCard = (item) => {
  const card = new Card(item, '.element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const handleSubmitCard = () => {
  const cardsObj = {
    name: imageNameInput.value,
    link: imageUrlInput.value
  };

  const cardElement = addCard(cardsObj);
  initialCardList.addItem(cardElement);
};

const popupAddCard = new PopupWithForm(popupAddImage, handleSubmitCard);
popupAddCard.setEventListeners();

// initial cards
const initialCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = addCard(item);
      initialCardList.addItem(cardElement);
    }
  },
  '.elements__list');

  initialCardList.renderer();

