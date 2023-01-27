import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Api from '../components/Api';
import { avatar, avatarInput, formElementAvatar, popupAddAvatar, btnOpenEditing, popupEditProfile, profileName, profileDesc, profileAvatar, formElementProfile, nameInput, jobInput, btnOpenAdding, popupAddImage, popupImage, cardsContainer, formElementCard, imageNameInput, imageUrlInput, settings, popupDeleteCard } from "../utils/constants.js";


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: 'bc45b1d2-8184-43a4-b071-b769e584deb5',
    'Content-Type': 'application/json'
  }
});

let userId;

api.getProfileInfo()
.then((res) => {
  userId = res._id;
  profileInfo.setUserInfo(res.name, res.about);
  profileInfo.setUserAvatar(res.avatar);
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

// profile form
//avatar
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
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  })
  .finally(() => {
    popupAvatar.isSaving(false)
  })
}

const popupAvatar = new PopupWithForm(popupAddAvatar, handleSubmitAvatar);
popupAvatar.setEventListeners();

//profile info
const openProfileForm = () => {
  popupProfile.open();

  const infoFromPage = profileInfo.getUserInfo();
  nameInput.value = infoFromPage.userName;
  jobInput.value = infoFromPage.userDesc;
  profileValidation.resetValidation();
};

btnOpenEditing.addEventListener('click', openProfileForm);

const handleProfileForm = () => {
  const user = {
    name: nameInput.value,
    about: jobInput.value
  };
  api.setProfileInfo(user)
  .then((res) => {
    profileInfo.setUserInfo(res.name, res.about)
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  })
  .finally(() => {
    popupProfile.isSaving(false)
  })
};

const popupProfile = new PopupWithForm(popupEditProfile, handleProfileForm);
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
  const card = new Card(item, '.element-template',userId, handleCardClick, handleDeleteCard, handleSetLike, handleDeleteLike);
  const cardElement = card.generateCard();
  return cardElement;
};

const handleSetLike = (cardObj) => {
  api.setLike(cardObj.cardId)
    .then((res) => {

      cardObj.setActiveLike()
      cardObj.likeCount(res)

    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`)
    })
};

const handleDeleteLike = (cardObj) => {
  api.deleteLike(cardObj.cardId)
    .then((res) => {
      cardObj.setUnactiveLike()
      cardObj.likeCount(res)
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`)
    })
};

const handleDeleteCard = (cardObj) => {
  confirmation.open();
  confirmation.setCard(cardObj);
};

const handleDelete = (cardObj) => {

  api.deleteCard(cardObj.cardId)
  .then((res) => {
    cardObj.delete()
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  })
};

const confirmation = new PopupWithConfirmation(popupDeleteCard, handleDelete);
confirmation.setEventListeners();

const handleSubmitCard = () => {
  const cardsObj = {
    name: imageNameInput.value,
    link: imageUrlInput.value
  };

  api.setNewCard(cardsObj)
  .then((res) => {
    const cardElement = addCard(res);
    cardsContainer.prepend(cardElement);
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  })
  .finally(() => {
    popupAddCard.isSaving(false)
  })
};

const popupAddCard = new PopupWithForm(popupAddImage, handleSubmitCard);
popupAddCard.setEventListeners();
