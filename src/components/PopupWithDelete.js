import Popup from './Popup.js'

export default class PopupWithDelete extends Popup {
  constructor(selector) {
    super(selector);
    this._formDelete = this._popupElement.querySelector('.popup__form');
  }

  setEventListeners() {
    this._formDelete.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submit(this);
    })
    super.setEventListeners()
  }

  submitDelete(submitHandler) {
    this._submit = submitHandler
  }
}