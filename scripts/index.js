const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closeBtns = document.querySelectorAll('.popup__close-button');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const formElement = document.querySelector('.form');
const nameInput = document.querySelector('#firstname');
const jobInput = document.querySelector('#job');

const addBtn = document.querySelector('.profile__add-button');
const popupAddImage = document.querySelector('.popup_type_add-image');

const likeBtns = document.querySelectorAll('.element__like-button');
const trashBtns = document.querySelectorAll('.element__trash-button');

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

formElement.addEventListener('submit', formSubmitHandler);

// open add image
function openAddImage() {
  openPopup(popupAddImage);
}

addBtn.addEventListener('click', openAddImage);

// like button
likeBtns.forEach((button) => {
  button.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
})

// trash button
trashBtns.forEach((button) => {
  button.addEventListener('click', function(evt) {
    const cardItem = button.closest('.element');
    cardItem.remove();
  });
})

//open card
const cardImage = document.querySelector('.element__image');
const popupImage = document.querySelector('.popup_type_image');
console.log(popupImage);

function openImage() {
  const popupImage = document.querySelector('.popup_type_image');
  openPopup(popupImage);
}

// cards.forEach((item) => {
//   // const popupImage = document.querySelector('.popup_type_image');
//   item.addEventListener('click', openPopup(popupImage))
// })

cardImage.addEventListener('click', openImage);

