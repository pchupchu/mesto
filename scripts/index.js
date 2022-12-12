const cardTemplate = document.querySelector('#template').content;

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

const popupImage = document.querySelector('.popup_type_image');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupImageCard = document.querySelector('.popup__image-card');

const cardsContainer = document.querySelector('.elements__list');

const formElementCard = document.querySelector('.form_card');
const imageNameInput = document.querySelector('#imagename');
const imageUrlInput = document.querySelector('#imageurl');

// open popup
const openPopup = (popupElement) => {
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
  const button = popupEditProfile.querySelector('.form__button');
  enableBtn(button, settingsObj);
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
  disableBtn(button, settingsObj);
};

btnOpenAdding.addEventListener('click', openAddImage);

// like card
const toggleLike = (evt) => {
  evt.target.classList.toggle('element__like-button_active');
};

// delete card
const deleteCard = (evt) => {
  const cardElement = evt.target.closest('.element');
  cardElement.remove();
}

//open card
const openImage = (card) => {
  openPopup(popupImage);
  popupImageTitle.textContent = card.name;
  popupImageCard.src = card.link;
  popupImageCard.alt = card.name;
}

// add new card
const addCard = (card) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imageElement = cardElement.querySelector('.element__image');
  const btnLike = cardElement.querySelector('.element__like-button');
  const btnDelete = cardElement.querySelector('.element__trash-button');

  cardElement.querySelector('.element__title').textContent = card.name;
  imageElement.src = card.link;
  imageElement.alt = card.name;

  btnLike.addEventListener('click', toggleLike);
  btnDelete.addEventListener('click', deleteCard);
  imageElement.addEventListener('click', (evt) => {
    openImage(card);
  });

  return cardElement;
};

const handleSubmitCard = (evt) => {
  evt.preventDefault();
  const card = {
    name: imageNameInput.value,
    link: imageUrlInput.value
  };
  const cardElement = addCard(card);
  evt.target.reset();
  cardsContainer.prepend(cardElement);
  closePopup(popupAddImage);
};

formElementCard.addEventListener('submit', handleSubmitCard);

// initial cards
initialCards.forEach((item) => {
  const cardElement = addCard(item);
  cardsContainer.prepend(cardElement);
});
