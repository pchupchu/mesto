import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Api from '../components/Api';
import { avatar, avatarInput, formElementAvatar, popupAddAvatar, btnOpenEditing, popupEditProfile, profileName, profileDesc, profileAvatar, formElementProfile, nameInput, jobInput, btnOpenAdding, popupAddImage, popupImage, cardsContainer, formElementCard, imageNameInput, imageUrlInput, settings, popupDeleteCard, initialCards } from "../utils/constants.js";


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
    popupAvatar.saving(false)
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
    popupProfile.saving(false)
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
  const card = new Card(item, '.element-template', handleCardClick, userId, handleDeleteCard, handleSetLike);
  const cardElement = card.generateCard();
  return cardElement;
};





const handleSetLike = (cardObj) => {
  api.setLike(cardObj._cardId)
    .then((res) => {
      console.log(res)
      console.log(cardObj);
      //cardObj.delete()
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`)
    })
}

const handleDeleteLike = (cardObj) => {
  api.deleteLike(cardObj._cardId)
    .then((res) => {
      console.log(res)
      //cardObj.delete()
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`)
    })
}





const handleDeleteCard = (cardObj) => {
  confirmation.open();
  confirmation.setCard(cardObj);
}

const confirmation = new PopupWithConfirmation(popupDeleteCard, handleDelete);
confirmation.setEventListeners();

const handleDelete = (cardObj) => {
  console.log(cardObj)
  api.deleteCard(cardObj._cardId)
    .then(() => {
      cardObj.delete()
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`)
    })
}

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
    popupAddCard.saving(false)
  })
};

const popupAddCard = new PopupWithForm(popupAddImage, handleSubmitCard);
popupAddCard.setEventListeners();













// initial cards
/*const initialCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = addCard(item);
      initialCardList.addItem(cardElement);
    }
  },
  '.elements__list');

  initialCardList.renderer();
*/







