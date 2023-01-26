import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from '../components/Popup';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import { avatar, avatarInput, formElementAvatar, popupAddAvatar, btnOpenEditing, popupEditProfile, profileName, profileDesc, profileAvatar, formElementProfile, nameInput, jobInput, btnOpenAdding, popupAddImage, popupImage, cardsContainer, formElementCard, imageNameInput, imageUrlInput, settings, initialCards } from "../utils/constants.js";


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: 'bc45b1d2-8184-43a4-b071-b769e584deb5',
    'Content-Type': 'application/json'
  }
});

api.getProfileInfo()
.then((res) => {
  profileName.textContent = res.name;
  profileDesc.textContent = res.about;
  profileAvatar.src = res.avatar;
});

api.getInitialCards()
.then((res) => {
  const initialCardList = new Section(
    {
      items: res,
      renderer: (item) => {
        const cardElement = addCard(item);
        initialCardList.addItem(cardElement);
      }
    },
    '.elements__list');

  initialCardList.renderer();
})









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
  api.setProfileAvatar(avatarInput.value)
  .then((res) => {
    profileInfo.setUserAvatar(res.avatar)
  })
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
  const user = {
    name: nameInput.value,
    about: jobInput.value
  };
  api.setProfileInfo(user)
  .then((res) => {
    profileInfo.setUserInfo(res.name, res.about)
  })
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







