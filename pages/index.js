// Imports

import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";

// Datos iniciales

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Selectores y variables

const postPopup = document.querySelector("#newpost-popup");
const formTitle = postPopup.querySelector("#place-name-input");
const formImg = postPopup.querySelector("#url-input");
const postForm = postPopup.querySelector("form");

// Configuración de validación

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Inicialización de popups

const popupWithImage = new PopupWithImage("#img-popup");
popupWithImage.setEventListeners();

const popupUser = new Popup("#user-popup");
popupUser.setEventListeners();

const popupNewPost = new Popup("#newpost-popup");
popupNewPost.setEventListeners();

// Inicialización de la sección de tarjetas

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        "#card-template",
        popupWithImage
      );
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    },
  },
  ".posts-gallery"
);

section.renderItems();

// Funciones

function createNewPost(evt) {
  evt.preventDefault();
  const title = formTitle.value;
  const url = formImg.value;
  const card = new Card(title, url, "#card-template", popupWithImage);
  const cardElement = card.generateCard();
  section.addItem(cardElement);
  postForm.reset();
}

// Eventos

postForm.addEventListener("submit", createNewPost);

document.querySelector("#profile-edit-btn").addEventListener("click", () => {
  popupUser.open();
});

document.querySelector("#add-post-btn").addEventListener("click", () => {
  popupNewPost.open();
});

// Inicialización de validadores

const forms = document.querySelectorAll(config.formSelector);
forms.forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});
