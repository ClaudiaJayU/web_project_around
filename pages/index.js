// Imports
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js"; // entre llaves porque es una instancia exportada, no una clase

// ---------------- CONFIG ----------------
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// ---------------- INSTANCIAS GLOBALES ----------------
const popupWithImage = new PopupWithImage("#img-popup");
popupWithImage.setEventListeners();

const popupUser = new Popup("#user-popup");
popupUser.setEventListeners();

const popupNewPost = new Popup("#newpost-popup");
popupNewPost.setEventListeners();

// Instancia de UserInfo (fuera del then para poder reutilizarla)
const userInfo = new UserInfo({
  nameSelector: ".profile__name-text",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar-image",
});

// Instancia de Section (también debe ser accesible en addCardPopup)
let section;

// ---------------- API CALLS ----------------
api
  .getInitialCards()
  .then(function (initialCards) {
    console.log(initialCards);
    section = new Section(
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
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUserInfo()
  .then((userData) => {
    console.log("📌 Datos de la API:", userData);
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

// ---------------- HELPERS ----------------
function createNewPost({ title, link }) {
  const card = new Card(title, link, "#card-template", popupWithImage);
  return card.generateCard();
}

// ---------------- VALIDACIÓN FORMULARIOS ----------------
const forms = document.querySelectorAll(config.formSelector);
forms.forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});

// ---------------- POPUPS ----------------
const editProfilePopup = new PopupWithForm("#user-popup", (formData) => {
  editProfilePopup.renderLoading(true); // 👉 muestra "Guardando..."
  api
    .setUserInfo({
      name: formData.name,
      about: formData.about,
    })
    .then((updatedUser) => {
      userInfo.setUserInfo({
        name: updatedUser.name,
        about: updatedUser.about,
        avatar: updatedUser.avatar, // opcional
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log("❌ Error al actualizar usuario:", err);
    })
    .then(() => {
      editProfilePopup.renderLoading(false); // 👉 vuelve a "Guardar"
    });
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

// ---------------- BOTONES ----------------
const editProfileButton = document.querySelector("#profile-edit-btn");
const addCardButton = document.querySelector("#add-post-btn");

const formName = document.querySelector("#user-name-input");
const formAbout = document.querySelector("#user-about-input");

editProfileButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo(); // acá era el error, usabas "currentUserInfo"
  formName.value = currentUser.name;
  formAbout.value = currentUser.about;
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
