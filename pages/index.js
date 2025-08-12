// Imports

import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const popupWithImage = new PopupWithImage("#img-popup");
popupWithImage.setEventListeners();

const popupUser = new Popup("#user-popup");
popupUser.setEventListeners();

const popupNewPost = new Popup("#newpost-popup");
popupNewPost.setEventListeners();

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

function createNewPost({ title, link }) {
  const card = new Card(title, link, "#card-template", popupWithImage);
  return card.generateCard();
}
const editProfileButton = document.querySelector("#profile-edit-btn");
const addCardButton = document.querySelector("#add-post-btn");

const forms = document.querySelectorAll(config.formSelector);
forms.forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});

const formName = document.querySelector("#user-name-input");
const formOccupation = document.querySelector("#user-occupation-input");

const userInfo = new UserInfo({
  nameSelector: ".profile__name-text",
  occupationSelector: ".profile__occupation",
});

editProfileButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  formName.value = currentUserInfo.name;
  formOccupation.value = currentUserInfo.occupation;
  editProfilePopup.open();
});

// Instancia PopupWithForm para editar perfil
const editProfilePopup = new PopupWithForm("#user-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    occupation: formData.occupation,
  });
  editProfilePopup.close();
});

editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#newpost-popup", (formData) => {
  console.log(formData);
  const { title, link } = formData;
  const cardElement = createNewPost({ title, link });
  section.addItem(cardElement);
  addCardPopup.close();
});

addCardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
