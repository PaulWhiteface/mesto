import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { initialCards, formObj, profileButton, cardButton, formElementProfile, formElementCard } from '../utils/constants.js';



//validation 
const formProfileInstance = new FormValidator(formElementProfile, formObj);
const formCardInstance = new FormValidator(formElementCard, formObj);

//PROFILE
const userProfile = new UserInfo({nickname: '.profile__name', job: '.profile__description'});
function editProfile (data) {
  userProfile.setUserInfo({nickname: data.nickname, job: data.job}); //устанавливаем вписаные значения
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




