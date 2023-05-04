import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const formObj = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disable',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
  };

const profileButton = document.querySelector('.profile__button-name');
const cardButton = document.querySelector('.profile__button-photo');
const closeButtonProfile = document.querySelector('.popup__close');
const closeButtonCard = document.querySelector('.popup__close-card');
const closeButtonImage = document.querySelector('.popup__close-image');

const formElementProfile = document.querySelector('.popup__form-profile');
const formElementCard = document.querySelector('.popup__form-card')
const list = document.querySelector('.elements__grid');

const nameInput = formElementProfile.querySelector('.popup__input_text_name');
const jobInput = formElementProfile.querySelector('.popup__input_text_job');
const cardNameInput = formElementCard.querySelector('.popup__input_text_card');
const cardLinkInput = formElementCard.querySelector('.popup__input_text_link');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const profilePopup = document.querySelector('.popup-profile');
const cardPopup = document.querySelector('.popup-card');
const imagePopup = document.querySelector('.popup-image');

const imageInPopup = document.querySelector('.popup__image');
const textInPopup = document.querySelector('.popup__image-text');


//validation
const formProfileInstance = new FormValidator(formElementProfile, formObj);
const formCardInstance = new FormValidator(formElementCard, formObj);

formProfileInstance.enableValidation();
formCardInstance.enableValidation();

//Массив с карточками выводит на страницу и навешивает на них события 
initialCards.forEach((item) => {renderItem(makeCard(item))});

//создание карточки
function makeCard (item) {
  const newCard = new Card(item, '.template-card', handleCardClick);
  const addHtml = newCard.createCard();
  return addHtml;
}

//функция добавления карточек в начало листа
function renderItem (addHtml) {
  list.prepend(addHtml);
}

//Функции открытия и закрытия попапов
function showPopup (popup) {
  popup.classList.add('popup_active');
  popup.addEventListener('mousedown', closeByOverlay);
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
  popup.removeEventListener('mousedown', closeByOverlay);
  document.removeEventListener('keydown', closeByEscape);
}

function closeByOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
}

function handleCardClick (name, link) {
    imageInPopup.src = this._link;
    imageInPopup.alt = this._name;
    textInPopup.textContent = this._name;
    showPopup(imagePopup);
}
//Попап профиля

profileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formProfileInstance.disableButton();
  formProfileInstance.resetValidationErrors();
  showPopup(profilePopup);
});

closeButtonProfile.addEventListener('click', () => {
  closePopup(profilePopup);
});

function handleFormSubmitProfile(evt) {

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile); 

//Попап карточек
cardButton.addEventListener('click', () => {
  formCardInstance.disableButton();
  formCardInstance.resetValidationErrors();
  showPopup(cardPopup);
});

closeButtonCard.addEventListener('click', () => {
  closePopup(cardPopup);
});

function handleFormSubmitCard(evt) {
  renderItem(makeCard ({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }));
  evt.target.reset();
  closePopup(cardPopup);
}

formElementCard.addEventListener('submit', handleFormSubmitCard);
//Попап картинки
closeButtonImage.addEventListener('click', () => {
  closePopup(imagePopup);
})
