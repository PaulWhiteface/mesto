export default class Popup {
    constructor(selector) {
      this._popupElement = document.querySelector(selector);
      this._closeButton = this._popupElement.querySelector('.popup__close');
    }

    _handleEscClose (evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }

    _handleOverlayClose (evt) {
      if (evt.target === evt.currentTarget) {
        this.close()
     }
    }

    open () {
      this._popupElement.classList.add('popup_active');
      document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    close () {
      this._popupElement.classList.remove('popup_active');
      document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    setEventListeners () {
      this._closeButton.addEventListener('click', () => this.close());
      this._popupElement.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
    }
}
