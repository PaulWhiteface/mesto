import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';

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

const formElementProfile = document.querySelector('.popup__form-profile');
const formElementCard = document.querySelector('.popup__form-card')



//validation
const formProfileInstance = new FormValidator(formElementProfile, formObj);
const formCardInstance = new FormValidator(formElementCard, formObj);

//PROFILE
const userProfile = new UserInfo({nickname: '.profile__name', job: '.profile__description'});
function editProfile (data) {
  userProfile.setUserInfo({nickname: data.nickname, job: data.job}); //сохраняем вписаные значения
}

const profileForm = new PopupWithForm('.popup-profile', {submit: editProfile});
profileForm.setEventListeners();

profileButton.addEventListener('click', () => {
  profileForm.setInputValues(userProfile.getUserInfo()); //Вставляем значения в инпуты при открытии
  formProfileInstance.disableButton();
  formProfileInstance.resetValidationErrors();
  profileForm.open()
});

//CARDPOPUP
const popupForImage = new PopupWithImage('.popup-image');
popupForImage.setEventListeners();

const addCard = new PopupWithForm('.popup-card', {submit: (item) => {
  cardList.setItem(makeCard(item)) //отрисовываем созданную вручную карточку
}});
addCard.setEventListeners();
cardButton.addEventListener('click', () => {
  formCardInstance.disableButton();
  formCardInstance.resetValidationErrors();
  addCard.open();
})
// ON validation
formProfileInstance.enableValidation();
formCardInstance.enableValidation();

//создание карточки
function makeCard (item) {
  const newCard = new Card(item, '.template-card', {handleCardClick: () => {
    popupForImage.open(item); //открываем попап карточек
  }});
  const addHtml = newCard.createCard();
  return addHtml;
}

// Section
const cardList = new Section({items: initialCards, renderer: (item) => { 
  cardList.setItem(makeCard(item)) //отрисовываем карточки на страницу
}}, '.elements__grid');
cardList.addItem(); //Применяем функцию для каждого элемента массива




