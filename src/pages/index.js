import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { formObj, profileButton, cardButton, formElementProfile, formElementCard } from '../utils/constants.js';
import './index.css';
import Api from '../components/Api.js'; 
import PopupWithDelete from '../components/PopupWithDelete.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '2339a9f7-9e2a-43f5-90b5-72dfb8a8fa78',
    'Content-Type': 'application/json'
  }
}); 

const avatarButton = document.querySelector('.profile__change-image')

const formElementAvatar = document.querySelector('.popup__form-avatar')



let myId = ''

Promise.all([api.getUserInfoFromServer(), api.getInitialCards()]) //Прогоняем два два массива объектов, чтобы прокинуть 
 .then(([user, initialCards]) => {                                //и сравнить Айди создателя карточки и собственный айди
  myId = user._id;
  userProfile.setAvatar(user.avatar);
  userProfile.setUserInfo(user.name, user.about);
  cardList.addItem(initialCards)
 })
 .catch((err) => {
  console.log(err);
 })



//validation 
const formProfileInstance = new FormValidator(formElementProfile, formObj);
const formCardInstance = new FormValidator(formElementCard, formObj);
const formAvatarInstance = new FormValidator(formElementAvatar, formObj);

//PROFILE
const userProfile = new UserInfo({nickname: '.profile__name', job: '.profile__description', avatar: '.profile__image'});


const profileForm = new PopupWithForm('.popup-profile', {submit: editProfile});

function editProfile(data) { //Редактирование имени и описания в профиле
  profileForm.rendering(true)
  api.setUserInfoOnServer(data.nickname, data.job)
  .then((res) => {
    userProfile.setUserInfo(res.name, res.about);
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    profileForm.rendering(false)
  })
}

profileForm.setEventListeners();

profileButton.addEventListener('click', () => {
  profileForm.setInputValues(userProfile.getUserInfo()); //Вставляем значения в инпуты при открытии
  formProfileInstance.disableButton();
  formProfileInstance.resetValidationErrors();
  profileForm.open()
});

const profileAvatar = new PopupWithForm('.popup-avatar', {submit: editAvatar});
profileAvatar.setEventListeners();

function editAvatar(data) { //Установка аватара
  profileForm.rendering(true)
  api.setProfileAvatar(data.avatarlink)
  .then((res) => {
    userProfile.setAvatar(res.avatar)
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    profileForm.rendering(false)
  })
}

avatarButton.addEventListener('click', () => {  //открытие попапа с аватаркой
  formAvatarInstance.disableButton();
  formAvatarInstance.resetValidationErrors();
  profileAvatar.open()
})

//CARDPOPUP
const popupForImage = new PopupWithImage('.popup-image');
popupForImage.setEventListeners();

const addCard = new PopupWithForm('.popup-card', {submit: (item) => {
  addCard.rendering(true)
  api.addCardByHandle(item.name, item.link)  //Отправляет из инпутов нейм и линк на сервер, возвращает объект карточки со всеми значениями и устанавливает ее на страницу
  .then((item) => {
    cardList.setItem(makeCard(item)) 
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    addCard.rendering(false)
  })
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
formAvatarInstance.enableValidation();

//создание карточки
function makeCard (item) {
  const newCard = new Card(item, myId, '.template-card', {handleCardClick: () => {
    popupForImage.open(item); //открываем попап карточек
  }, handleCardDelete : (id) => {  //открывается попап с удалением и отправляет 'DELETE' после сабмита
    popupDelete.open()
    popupDelete.submitDelete(() => {
      api.handleDeleteCard(id)
      .then((card) => {
        newCard.handleDelete(card)
      })
      .catch(err => {
        console.log(err);
      })
    })
  }, handleCardLike: (id) => {  //проверяет лайкнута ли карточка и из этого либо добавляет либо убирает лайк
    if(newCard.isLiked()) {
      api.removeLikeOnCard(id)
      .then(res => {
        newCard.showCardLikes(res.likes)
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      api.setLikeOnCard(id)
      .then(res => {
        newCard.showCardLikes(res.likes)
      })
      .catch(err => {
        console.log(err);
      })
    }
  }});
  const addHtml = newCard.createCard();
  return addHtml;
}

const popupDelete = new PopupWithDelete('.popup-delete');
popupDelete.setEventListeners();

// Section

const cardList = new Section({renderer: (item) => { 
  cardList.setItem(makeCard(item)) //отрисовываем карточки на страницу
}}, '.elements__grid');



