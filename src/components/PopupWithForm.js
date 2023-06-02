import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, {submit}) {
    super(selector);
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector('.popup__button');
    this._submit = submit;
  }

  _getInputValues() {
    this._inputObj = {};
    this._inputs.forEach(input => {
      this._inputObj[input.name] = input.value;
    });
    return this._inputObj;
  }

  setInputValues(data) {
    this._inputs.forEach(input => {
      input.value = data[input.name]
    })
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }

  rendering(value) {
    if(value) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = 'Сохранение'
    }
  }
}