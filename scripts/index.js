const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closeBtns = document.querySelectorAll('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const formElementProfile = document.querySelector('.form_profile');
const nameInput = document.querySelector('#firstname');
const jobInput = document.querySelector('#job');

const addBtn = document.querySelector('.profile__add-button');
const popupAddImage = document.querySelector('.popup_type_add-image');

const likeBtns = document.querySelectorAll('.element__like-button');
const trashBtns = document.querySelectorAll('.element__trash-button');

const popupImage = document.querySelector('.popup_type_image');
const popupImageTitle = document.querySelector('.popup__image-title');

const cardList = document.querySelector('.elements__list');

const formElementCard = document.querySelector('.form_card');
const imageNameInput = document.querySelector('#imagename');
const imageUrlInput = document.querySelector('#imageurl');

// open popup
function openPopup(popupItem) {
  popupItem.classList.add('popup_opened');
}

// close popup
function close() {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
}

closeBtns.forEach((button) => {
  button.addEventListener('click', close);
})

// open edit form
function openEditForm() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
}

editBtn.addEventListener('click', openEditForm);

// submit edit form
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  close();
}

formElementProfile.addEventListener('submit', formSubmitHandler);

// open add image
function openAddImage() {
  openPopup(popupAddImage);
}

addBtn.addEventListener('click', openAddImage);

// add new card
function addCard(cardName, cardUrl) {
  const cardTemplate = document.querySelector('#template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = cardName;
  cardElement.querySelector('.element__image').src = cardUrl;
  cardElement.querySelector('.element__image').alt = cardName;

  // like card
  cardElement.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  })

  // delete card
  cardElement.querySelector('.element__trash-button').addEventListener('click', function(evt) {
    const cardItem = cardElement.querySelector('.element__trash-button').closest('.element');
    cardItem.remove();
  })

  // open card
  const imageElement = cardElement.querySelector('.element__image');
  imageElement.addEventListener('click', function(evt) {

      const cardItem = imageElement.closest('.element');
      openPopup(popupImage);

      const imageTitle = cardItem.querySelector('.element__title');
      popupImageTitle.textContent = imageTitle.textContent;

      const imageCard = document.querySelector('.popup__image-card');
      const image = cardItem.querySelector('.element__image');
      imageCard.src = image.src;
      imageCard.alt = image.alt;
    })

  cardList.prepend(cardElement);
}

function cardSubmitHandler (evt) {
  evt.preventDefault();
  addCard(imageNameInput.value, imageUrlInput.value)
  imageNameInput.value = '';
  imageUrlInput.value = '';
  close();
}

formElementCard.addEventListener('submit', cardSubmitHandler);

// initial cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});
