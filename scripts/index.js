let editBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeBtn = popup.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__description');

let formElement = document.querySelector('.form');
let nameInput = document.querySelector('#firstname');
let jobInput = document.querySelector('#job');

function open() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
}

editBtn.addEventListener('click', open);

function close() {
  popup.classList.remove('popup_opened');
}

closeBtn.addEventListener('click', close);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  close();
};

formElement.addEventListener('submit', formSubmitHandler);
