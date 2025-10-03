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
  inputErrorClass: ".popup__input_type_error",
  errorClass: ".popup__error_visible",
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

    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    // Invertimos el array para que las tarjetas más nuevas aparezcan primero
    const cardsInverted = initialCards.reverse();

    section = new Section(
      {
        items: cardsInverted,
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
    .deleteCard(cardId)
    .then(() => cardElement.remove())
    .catch((err) => console.log("❌ Error al eliminar tarjeta:", err));
}

function createNewPost(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    popupWithImage,
    handleDeleteCard,
    currentUserId
  );
  return card.generateCard();
}

// ---------------- VALIDACIÓN FORMULARIOS ----------------
document.querySelectorAll(config.formSelector).forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});

// ---------------- POPUPS ----------------

// Editar perfil
const editProfilePopup = new PopupWithForm("#user-popup", (formData) => {
  editProfilePopup.renderLoading(true, "Guardando...");
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
    .finally(() => editProfilePopup.renderLoading(false, "Guardar"));
});
editProfilePopup.setEventListeners();

// Agregar tarjeta
const addCardPopup = new PopupWithForm("#newpost-popup", (formData) => {
  addCardPopup.renderLoading(true, "Guardando...");
  api
    .addCard({ name: formData.title, link: formData.link })
    .then((newCard) => {
      const cardElement = createNewPost(newCard);
      section.addItem(cardElement); // siempre al inicio
      addCardPopup.close();
    })
    .catch((err) => console.log("❌ Error al agregar tarjeta:", err))
    .finally(() => addCardPopup.renderLoading(false, "Guardar"));
});
addCardPopup.setEventListeners();

// Cambiar avatar
const updateAvatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
  updateAvatarPopup.renderLoading(true, "Guardando...");
  api
    .updateAvatar(formData.avatar)
    .then((updatedUser) => {
      userInfo.setUserInfo({
        name: updatedUser.name,
        about: updatedUser.about,
        avatar: updatedUser.avatar,
      });
      updateAvatarPopup.close();
    })
    .catch((err) => console.log("❌ Error al actualizar avatar:", err))
    .finally(() => updateAvatarPopup.renderLoading(false, "Guardar"));
});
updateAvatarPopup.setEventListeners();

// ---------------- BOTONES ----------------
const editProfileButton = document.querySelector("#profile-edit-btn");
const addCardButton = document.querySelector("#add-post-btn");
const editAvatarButton = document.querySelector("#avatar-edit-btn");
const formName = document.querySelector("#user-name-input");
const formAbout = document.querySelector("#user-about-input");

// Abrir popup editar perfil
editProfileButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  formName.value = currentUser.name;
  formAbout.value = currentUser.about;
  editProfilePopup.open();
});

// Abrir popup agregar tarjeta
addCardButton.addEventListener("click", () => addCardPopup.open());

// Abrir popup cambiar avatar
editAvatarButton.addEventListener("click", () => updateAvatarPopup.open());
