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
    }

    close () {
      this._popupElement.classList.remove('popup_active');
    }

    setEventListeners () {
      this._closeButton.addEventListener('click', () => this.close());
      this._popupElement.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
      document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }
}
