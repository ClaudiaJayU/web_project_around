// Imports
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js"; // instancia de la API

// ---------------- VARIABLES GLOBALES ----------------
let section;
let currentUserId = null;

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

const userInfo = new UserInfo({
  nameSelector: ".profile__name-text",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar-image",
});

// ---------------- API CALLS ----------------
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    currentUserId = userData._id;

    // Setea datos del perfil en el DOM
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    // Renderiza tarjetas
    section = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardElement = createNewPost(item);
          section.addItem(cardElement);
        },
      },
      ".posts-gallery"
    );

    section.renderItems();
  })
  .catch((err) => console.log("❌ Error en carga inicial:", err));

// ---------------- HELPERS ----------------
function handleDeleteCard(cardId, cardElement) {
  api
    .deleteCard(cardId) // llama a la API para eliminar
    .then(() => {
      cardElement.remove(); // elimina del DOM
    })
    .catch((err) => console.log("❌ Error al eliminar tarjeta:", err));
}

function createNewPost(cardData) {
  const card = new Card(
    cardData, // objeto completo de la API
    "#card-template", // template selector
    popupWithImage,
    handleDeleteCard, // popup de imagen
    currentUserId // ID del usuario actual
  );

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
  editProfilePopup.renderLoading(true);
  api
    .setUserInfo({ name: formData.name, about: formData.about })
    .then((updatedUser) => {
      userInfo.setUserInfo({
        name: updatedUser.name,
        about: updatedUser.about,
        avatar: updatedUser.avatar,
      });
      editProfilePopup.close();
    })
    .catch((err) => console.log("❌ Error al actualizar usuario:", err))
    .finally(() => editProfilePopup.renderLoading(false));
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#newpost-popup", (formData) => {
  addCardPopup.renderLoading(true);

  api
    .addCard({ name: formData.title, link: formData.link })
    .then((newCard) => {
      const cardElement = createNewPost(newCard);
      section.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => console.log("❌ Error al agregar tarjeta:", err))
    .finally(() => addCardPopup.renderLoading(false));
});
addCardPopup.setEventListeners();

// ---------------- BOTONES ----------------
const editProfileButton = document.querySelector("#profile-edit-btn");
const addCardButton = document.querySelector("#add-post-btn");
const formName = document.querySelector("#user-name-input");
const formAbout = document.querySelector("#user-about-input");

editProfileButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  formName.value = currentUser.name;
  formAbout.value = currentUser.about;
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
