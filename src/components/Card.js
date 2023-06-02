class Card {
  constructor(data, myId, templateSelector, {handleCardClick, handleCardDelete, handleCardLike}) {
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._id = data._id
    this._owner = data.owner._id
    this._myId = myId
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._handleCardDelete = handleCardDelete
    this._handleCardLike = handleCardLike

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
    this._likeLength = this._element.querySelector('.card__item-like-container')
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    this._likeLength.textContent = this._likes.length

    this._cardLikeChecker()

    if (this._myId !== this._owner) {
      this._cardDeleteButton.classList.add('card__delete_disable');
    }

    return this._element;
  }

  handleDelete () {
    this._element.remove();
  }
  
  _likeActive () {
    this._cardLike.classList.add('card__button_active');
  }

  _likeDisable() {
    this._cardLike.classList.remove('card__button_active');
  }
  
  
  _setEventListeners () {
    this._cardImage.addEventListener('click', this._handleCardClick);
    this._cardDeleteButton.addEventListener('click', () => {
      this._handleCardDelete(this._id);
    });
    this._cardLike.addEventListener('click', () => {
      this._handleCardLike(this._id);
    })
  }

  isLiked() {
    const isLiked = this._likes.some((user) => {
      return user._id === this._myId
    })
    return isLiked
  }

  showCardLikes(likes) {
    this._likes = likes
    this._likeLength.textContent = this._likes.length

    this._cardLikeChecker()
  }

  _cardLikeChecker () {
    if(this.isLiked()) {
      this._likeActive()
    } else {
      this._likeDisable()
    }
  }

}

export default Card;