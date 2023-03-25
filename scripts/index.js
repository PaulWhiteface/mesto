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

const profileButton = document.querySelector('.profile__button-name');
const cardButton = document.querySelector('.profile__button-photo');
const closeButtonProfile = document.querySelector('.popup__close');
const closeButtonCard = document.querySelector('.popup__close-card');
const closeButtonImage = document.querySelector('.popup__close-image');

const formElementProfile = document.querySelector('.popup__form-profile');
const formElementCard = document.querySelector('.popup__form-card')
const templateItem = document.querySelector('.template-card').content;
const list = document.querySelector('.elements__grid');

const nameInput = formElementProfile.querySelector('.popup__input_text_name');
const jobInput = formElementProfile.querySelector('.popup__input_text_job');
const cardNameInput = formElementCard.querySelector('.popup__input_text_card');
const cardLinkInput = formElementCard.querySelector('.popup__input_text_link');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const cardPhoto = htmlElement.querySelector('.card__photo');
const cardText = htmlElement.querySelector('.card__text');

const imageInPopup = document.querySelector('.popup__image');
const textInPopup = document.querySelector('.popup__image-text');

const profilePopup = document.querySelector('.popup-profile');
const cardPopup = document.querySelector('.popup-card');
const imagePopup = document.querySelector('.popup-image');
//Массив с карточками выводит на страницу и навешивает на них события 
initialCards.forEach(renderItem);
//функция добавления карточек в начало листа
function renderItem (item) {
  const htmlElement = templateItem.cloneNode(true);
  cardPhoto.src = item.link;
  cardPhoto.alt = item.name;
  cardText.textContent = item.name;

  setEventListeners(htmlElement);
  cardPhoto.addEventListener('click', () => {handleCardClick(item)});
  list.prepend(htmlElement);
}

function handleDelete (event) {
  const card = event.target.closest('.card');
  card.remove();
}

function handleLike (event) {
  const cardLike = event.target.closest('.card__like');
  cardLike.classList.toggle('card__like_active');
}

function setEventListeners (htmlElement) {
  htmlElement.querySelector('.card__delete').addEventListener('click', handleDelete);
  htmlElement.querySelector('.card__button').addEventListener('click', handleLike);
}

function handleCardClick (item) { 
  imageInPopup.src = item.link;
  imageInPopup.alt = item.name;
  textInPopup.textContent = item.name;
  showPopup(imagePopup);
}
//Функции открытия и закрытия попапов
function showPopup (popup) {
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
  
}
//Попап профиля

profileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  showPopup(profilePopup);
});

closeButtonProfile.addEventListener('click', () => {
  closePopup(profilePopup);
});

function handleFormSubmitProfile(evt) {
  evt.preventDefault()

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile); 

//Попап карточек
cardButton.addEventListener('click', () => {
  showPopup(cardPopup);
});

closeButtonCard.addEventListener('click', () => {
  closePopup(cardPopup);
});

function handleFormSubmitCard(evt) {
  evt.preventDefault()

  renderItem ({
    name: cardNameInput.value,
    link: cardLinkInput.value
  });
  evt.target.reset();
  closePopup(cardPopup);
}

formElementCard.addEventListener('submit', handleFormSubmitCard);
//Попап картинки
closeButtonImage.addEventListener('click', () => {
  closePopup(imagePopup);
})