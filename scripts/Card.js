import {showPopup, imagePopup} from './index.js';

class Card {
  constructor(card, templateSelector) {
    this._name = card.name
    this._link = card.link
    this._templateSelector = templateSelector
  }

  _getTemplate () {
    const cardElement = document.
    querySelector(this._templateSelector)
    .content.querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  createCard () {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__photo').src = this._link;
    this._element.querySelector('.card__photo').alt = this._name;
    this._element.querySelector('.card__text').textContent = this._name;
  
    this._element.querySelector('.card__photo').addEventListener('click', this._handleCardClick);
    return this._element;
  }

  _handleDelete = (event) => {
    const isCard = event.target.closest('.card');
    isCard.remove();
  }
  
  _handleLike = (event) => {
    const cardLike = event.target.closest('.card__like');
    cardLike.classList.toggle('card__like_active');
  }
  
  _setEventListeners () {
    this._element.querySelector('.card__delete').addEventListener('click', this._handleDelete);
    this._element.querySelector('.card__button').addEventListener('click', this._handleLike);
  }

  _handleCardClick = () => { 
    const imageInPopup = document.querySelector('.popup__image');
    const textInPopup = document.querySelector('.popup__image-text');

    imageInPopup.src = this._link;
    imageInPopup.alt = this._name;
    textInPopup.textContent = this._name;
    showPopup(imagePopup);
  }
}

export default Card;