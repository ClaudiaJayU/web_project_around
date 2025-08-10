export class FormValidator {
  // Constructor recibe la configuración y el formulario sobre el que actuará
  constructor(config, formElement) {
    this._config = config; // Guarda la configuración recibida
    this._formElement = formElement; // Guarda el formulario específico
    // Obtiene todos los inputs del formulario según el selector dado en config
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    // Obtiene el botón de submit dentro del formulario según el selector config
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  // Método privado: verifica si un input es válido y muestra u oculta el error
  _checkInputValidity(inputElement) {
    // Busca el elemento del error correspondiente al input
    const errorElement = document.getElementById(`${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
      // Si el input NO es válido, agrega clases de error y muestra mensaje
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._config.errorClass);
    } else {
      // Si el input es válido, elimina las clases de error y limpia mensaje
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._config.errorClass);
    }
  }

  // Método privado: activa o desactiva el botón de enviar según validez de inputs
  _toggleButton() {
    // Revisa si hay algún input inválido en la lista
    const hasInvalidInput = this._inputList.some(
      (input) => !input.validity.valid
    );

    if (hasInvalidInput) {
      // Si hay inputs inválidos, desactiva el botón y agrega clase para mostrarlo deshabilitado
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      // Si todos los inputs son válidos, activa el botón y elimina clase de deshabilitado
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Método privado: agrega event listeners a cada input para validar al escribir
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); // Verifica validez al cambiar input
        this._toggleButton(); // Activa o desactiva botón según validez general
      });
    });
  }

  // Método público para activar la validación: agrega listeners y configura botón
  enableValidation() {
    this._setEventListeners(); // Asigna los listeners a los inputs
    this._toggleButton(); // Verifica el estado inicial del botón
  }
}
