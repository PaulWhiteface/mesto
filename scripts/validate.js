const formObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disable',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
  };

function enableValidation ({formSelector, ...rest}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => { evt.preventDefault() });
    handleInput(form, rest);
  });
}

function handleInput (form, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);
  inputs.forEach(input => {
    input.addEventListener('input', () => {
        checkInputValidity(input, rest);
        if (hasInvalidInput(inputs)) {
          disableButton(formButton, {inactiveButtonClass});
        } else {
          enableButton(formButton, {inactiveButtonClass});
        }
    });
  });
}

function checkInputValidity (input, {errorClass, inputErrorClass}) {
  const inputName = input.getAttribute('name');
  const errorPlace = document.getElementById(`${inputName}-error`);
    if (input.validity.valid) {
        removeError(input, errorPlace, {errorClass, inputErrorClass});
      } else {
        showError(input, errorPlace, {errorClass, inputErrorClass}); 
      }
}

function showError (input, errorPlace, {errorClass, inputErrorClass}) {
  errorPlace.textContent = input.validationMessage;
  errorPlace.classList.add(errorClass)
  input.classList.add(inputErrorClass);
}

function removeError (input, errorPlace, {errorClass, inputErrorClass}) {
  errorPlace.textContent = '';
  errorPlace.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
}
//если хотя бы 1 инпут из списка инпутов не валиден, то возвращает фолс
function hasInvalidInput (inputs) {
  return inputs.some(input => !input.validity.valid);
}

function disableButton (formButton, {inactiveButtonClass}) {
  formButton.classList.add(inactiveButtonClass);
  formButton.setAttribute('disabled', true);
}

function enableButton (formButton, {inactiveButtonClass}) {
  formButton.classList.remove(inactiveButtonClass);
  formButton.removeAttribute('disabled');
  }

function resetValidationErrors (inputs, {errorClass, inputErrorClass}) {
  inputs.forEach(input => {
    const inputName = input.getAttribute('name');
    const errorPlace = document.getElementById(`${inputName}-error`);
    removeError (input, errorPlace, {errorClass, inputErrorClass});
  })
}


enableValidation(formObj)