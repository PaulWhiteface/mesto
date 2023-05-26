import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageInPopup = this._popupElement.querySelector('.popup__image');
    this._textInPopup = this._popupElement.querySelector('.popup__image-text');
  }

  open (item) {
    this._imageInPopup.src = item.link;
    this._imageInPopup.alt = item.name;
    this._textInPopup.textContent = item.name;

    super.open();
  }
}