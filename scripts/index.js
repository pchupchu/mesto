const cardTemplate = document.querySelector('#template').content;

const popups = document.querySelectorAll('.popup');
const closeBtns = document.querySelectorAll('.popup__close-button');

const editBtn = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const formElementProfile = document.querySelector('.form_profile');
const nameInput = document.querySelector('#firstname');
const jobInput = document.querySelector('#job');

const addBtn = document.querySelector('.profile__add-button');
const popupAddImage = document.querySelector('.popup_type_add-image');

const popupImage = document.querySelector('.popup_type_image');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupImageCard = document.querySelector('.popup__image-card');

const cardsContainer = document.querySelector('.elements__list');

const formElementCard = document.querySelector('.form_card');
const imageNameInput = document.querySelector('#imagename');
const imageUrlInput = document.querySelector('#imageurl');

// open popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

// close popup
function closePopup(popupOpened) {
  popupOpened.classList.remove('popup_opened');
};

closeBtns.forEach((button) => {
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
function closePopupByEsc(evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// open edit form
function openEditForm() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
};

editBtn.addEventListener('click', openEditForm);

// submit edit form
function handleSubmitForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

formElementProfile.addEventListener('submit', handleSubmitForm);

// open add image
function openAddImage() {
  openPopup(popupAddImage);
};

addBtn.addEventListener('click', openAddImage);

// add new card
function addCard(cardName, cardUrl) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imageElement = cardElement.querySelector('.element__image');

  cardElement.querySelector('.element__title').textContent = cardName;
  imageElement.src = cardUrl;
  imageElement.alt = cardName;

  // like card
  cardElement.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  // delete card
  cardElement.querySelector('.element__trash-button').addEventListener('click', function(evt) {
    cardElement.remove();
  });

  // open card
  imageElement.addEventListener('click', function(evt) {
      openPopup(popupImage);
      popupImageTitle.textContent = cardName;
      popupImageCard.src = cardUrl;
      popupImageCard.alt = cardName;
    });

    cardsContainer.prepend(cardElement);
};

function handleSubmitCard (evt) {
  evt.preventDefault();
  addCard(imageNameInput.value, imageUrlInput.value);
  evt.target.reset();
  closePopup(popupAddImage);
};

formElementCard.addEventListener('submit', handleSubmitCard);

// initial cards
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});
