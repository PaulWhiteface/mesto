class Card {
  constructor(card, templateSelector, handleCardClick) {
    this._name = card.name
    this._link = card.link
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
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
    this._cardImage = this._element.querySelector('.card__photo')
    this._cardText = this._element.querySelector('.card__text')
    this._cardLike = this._element.querySelector('.card__button')
    this._cardDeleteButton = this._element.querySelector('.card__delete')
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    return this._element;
  }

  _handleDelete = (event) => {
    this._isCard = event.target.closest('.card');
    this._isCard.remove();
  }
  
  _handleLike = (event) => {
    this._cardLike = event.target.closest('.card__like');
    this._cardLike.classList.toggle('card__like_active');
  }
  
  _setEventListeners () {
    this._cardDeleteButton.addEventListener('click', this._handleDelete);
    this._cardLike.addEventListener('click', this._handleLike);
    this._cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
  }
}

export default Card;