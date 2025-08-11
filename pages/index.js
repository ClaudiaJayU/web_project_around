import {
  modals,
  openButtons,
  closeButtons,
  saveButtons,
  openModal,
  closeModal,
  handleEscape,
  imgAmpliada,
  imgAmpliadaImg,
  imgAmpliadaTxt,
} from "../utils/utils.js";
import { abrirModal, cerrarModal } from "../utils/utils.js";
import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

const openUserFormButton = document.querySelector("#profile-edit-btn");
const openPostFormButton = document.querySelector("#add-post-btn");
const closeUserFormButton = document.querySelector("#popup__user-close-btn");
const closePostFormButton = document.querySelector("#popup__post-close-btn");
const userPopup = document.querySelector("#user-popup");
const postPopup = document.querySelector("#newpost-popup");
const profileName = document.querySelector(".profile__name-text");
const profileOccupation = document.querySelector(".profile__occupation");
const formName = document.querySelector("#user-name-input");
const formOccupation = document.querySelector("#user-occupation-input");
const saveButton = document.querySelector("#user-save-btn");
const formTitle = postPopup.querySelector("#place-name-input");
const formImg = postPopup.querySelector("#url-input");
const postForm = postPopup.querySelector("form");
/* Variables del pop de la imagen */

const imgAmpliadaClose = imgAmpliada.querySelector(".img-popup__close-btn");
const savePostButton = postPopup.querySelector("#post-save-btn");

function showPopup(popupElement) {
  popupElement.classList.add("active");
}

function closePopup(popupElement) {
  popupElement.classList.remove("active");
}

function openUserPopup() {
  showPopup(userPopup);
}

function openPostPopup() {
  showPopup(postPopup);
}

function closeUserPopup() {
  closePopup(userPopup);
}

function closePostPopup() {
  closePopup(postPopup);
}

function showCurrentInfo() {
  formName.value = profileName.textContent;
  formOccupation.value = profileOccupation.textContent;
}

function activeSaveButton() {
  if (formName.value !== "" && formOccupation.value !== "") {
    saveButton.classList.remove("popup__button_disabled");
  } else {
    saveButton.classList.add("popup__button_disabled");
  }
}

function saveFormInfo() {
  profileName.textContent = formName.value;
  profileOccupation.textContent = formOccupation.value;
}

function savePostInfo() {}

function closeForm(evt) {
  evt.preventDefault();
  userPopup.classList.remove("active");
}

openUserFormButton.addEventListener("click", openUserPopup);
openPostFormButton.addEventListener("click", openPostPopup);
closeUserFormButton.addEventListener("click", closeUserPopup);
closePostFormButton.addEventListener("click", closePostPopup);
openUserFormButton.addEventListener("click", showCurrentInfo);
formName.addEventListener("input", activeSaveButton);
formOccupation.addEventListener("input", activeSaveButton);
saveButton.addEventListener("click", saveFormInfo);
saveButton.addEventListener("click", closeForm);

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

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, "#card-template");
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    },
  },
  ".posts-gallery"
);

section.renderItems();

function createNewPost(evt) {
  evt.preventDefault();
  const title = formTitle.value;
  const url = formImg.value;
  const card = new Card(title, url, "#card-template");
  const cardElement = card.generateCard();
  section.addItem(cardElement); // Usamos la sección para agregar
  closePostPopup();
  postForm.reset();
}
postForm.addEventListener("submit", createNewPost);

const config = {
  formSelector: ".popup__form", // Selector para los formularios
  inputSelector: ".popup__input", // Selector para los inputs dentro del formulario
  submitButtonSelector: ".popup__save-btn", // Selector para el botón submit dentro del formulario
  inactiveButtonClass: "popup__button_disabled", // Clase que se agrega al botón para mostrarlo deshabilitado
  inputErrorClass: "popup__input_type_error", // Clase que se agrega al input inválido para marcarlo
  errorClass: "popup__error_visible", // Clase que se agrega al mensaje de error para mostrarlo
};

const forms = document.querySelectorAll(config.formSelector);
forms.forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});
