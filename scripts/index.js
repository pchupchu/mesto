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

const likeBtn = document.querySelector('.element__like-button');



// open and close edit form
function openEditForm() {
  popupEditProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
}

editBtn.addEventListener('click', openEditForm);

function close() {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
}

closeBtns.forEach((button) => {
  button.addEventListener('click', close);
})
//closeBtn.addEventListener('click', close);

// submit edit form
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  close();
};

formElement.addEventListener('submit', formSubmitHandler);

// open add image
function openAddImage() {
  popupAddImage.classList.add('popup_opened');
}

addBtn.addEventListener('click', openAddImage);


// like button

// trash button

//open card
const card = document.querySelector('.element__image');
console.log(card);
const popupImage = document.querySelector('.popup_type_image');
console.log(popupImage);

function openImage() {
  popupImage.classList.add('popup_opened');
}

card.addEventListener('click', openImage);

