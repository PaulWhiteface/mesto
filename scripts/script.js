let buttonName = document.querySelector('.profile__button-name');
let closeButton = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__input_text_name');
let jobInput = formElement.querySelector('.popup__input_text_job');

let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');


let popup = document.querySelector('.popup');

function showPopup() {
  popup.classList.add('popup_active');

  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

buttonName.addEventListener('click', showPopup);

function closePopup() {
  popup.classList.remove('popup_active');
}

closeButton.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
  evt.preventDefault()

 

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  popup.classList.remove('popup_active');

}

formElement.addEventListener('submit', handleFormSubmit); 