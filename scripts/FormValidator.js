class FormValidator {
  constructor (form, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
    this._form = form
    this._inputSelector = inputSelector
    this._submitButtonSelector = submitButtonSelector
    this._inactiveButtonClass = inactiveButtonClass
    this._inputErrorClass = inputErrorClass
    this._errorClass = errorClass
  }

  enableValidation () {
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._formButton = this._form.querySelector(this._submitButtonSelector);
    this._handleInput();
  }

  _handleInput () {
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
          this._checkInputValidity(input);
          if (this._hasInvalidInput()) {
            this._disableButton();
          } else {
            this._enableButton();
          }
      });
    });
  }

  _hasInvalidInput () {
    return this._inputs.some(input => !input.validity.valid);
  }

  _checkInputValidity (input) {
    const inputName = input.getAttribute('name');
    const errorPlace = document.getElementById(`${inputName}-error`);
      if (input.validity.valid) {
        this._removeError(input, errorPlace);
      } else {
        this._showError(input, errorPlace); 
      }
  }

  _showError (input, errorPlace) {
    errorPlace.textContent = input.validationMessage;
    errorPlace.classList.add(this._errorClass)
    input.classList.add(this._inputErrorClass);
  }
  
  _removeError (input, errorPlace) {
    errorPlace.textContent = '';
    errorPlace.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  disableButton () {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.setAttribute('disabled', true);
  }

  _enableButton () {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.removeAttribute('disabled');
    }

  resetValidationErrors () {
    this._inputs.forEach(input => {
      const inputName = input.getAttribute('name');
      const errorPlace = document.getElementById(`${inputName}-error`);
      this._removeError (input, errorPlace);
    })
  }
}

export default FormValidator;