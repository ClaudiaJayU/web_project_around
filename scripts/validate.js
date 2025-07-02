/* Este codigo es para ser aplicado en todos los formularios
 */

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(function (formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );

    addEventsToInputs(inputList, config, formElement);

    // Para que el botón esté correcto al inicio
    toggleButton(inputList, formElement, config);
  });
}

function addEventsToInputs(inputList, config, formElement) {
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, config);
      toggleButton(inputList, formElement, config);
    });
  });
}

function checkInputValidity(inputElement, config) {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(config.errorClass);
  } else {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
  }
}

function toggleButton(inputList, formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const hasInvalidInput = inputList.some((input) => !input.validity.valid);

  if (hasInvalidInput) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

enableValidation(config);
