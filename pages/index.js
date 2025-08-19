// Imports

import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js"; //entre llaves porque es una instancia exportada, no una clase

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

api
  .getInitialCards()
  .then(function (initialCards) {
    console.log(initialCards);
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
  })
  .catch((err) => {
    console.log(err);
  });

function createNewPost({ title, link }) {
  const card = new Card(title, link, "#card-template", popupWithImage);
  return card.generateCard();
}

api
  .getUserInfo()
  .then((userData) => {
    console.log("📌 Datos de la API:", userData); // <--- prueba
    const userInfo = new UserInfo({
      nameSelector: ".profile__name-text",
      occupationSelector: ".profile__occupation",
      avatarSelector: ".profile__avatar-image",
    });
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar, // <- nuevo
    });
  })
  .catch((err) => {
    console.log(err);
  });

const editProfileButton = document.querySelector("#profile-edit-btn");
const addCardButton = document.querySelector("#add-post-btn");

const forms = document.querySelectorAll(config.formSelector);
forms.forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});

const formName = document.querySelector("#user-name-input");
const formOccupation = document.querySelector("#user-occupation-input");

editProfileButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  formName.value = currentUserInfo.name;
  formOccupation.value = currentUserInfo.occupation;
  editProfilePopup.open();
});

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
