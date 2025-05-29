const openUserFormButton = document.querySelector(".profile__edit-btn");
const openPostFormButton = document.querySelector(".profile__add-post-btn");
const closeUserFormButton = document.querySelector("#popup__user-close-btn");
const closePostFormButton = document.querySelector("#popup__post-close-btn");
const userPopup = document.querySelector("#user-popup");
const postPopup = document.querySelector("#newpost-popup");
const profileName = document.querySelector(".profile__name-text");
const profileOccupation = document.querySelector(".profile__occupation");
const formName = document.querySelector("#user-name-input");
const formOccupation = document.querySelector("#user-occupation-input");
const saveButton = document.querySelector("#user-save-btn");

/* const formTitle = postPopup.querySelector(".popup__input-1");
const formImg = postPopup.querySelector(".popup__input-2");
const postTitle = document.querySelector(".posts-gallery__text");
const postImage = document.querySelector(".posts-gallery__image");
 */

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
    saveButton.classList.add("active");
  } else {
    saveButton.classList.remove("active");
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

function renderCards() {
  const cards = initialCards.map((card) => {
    const cardElement = document
      .querySelector("#card-template")
      .content.cloneNode(true);
    cardElement.querySelector(".posts-gallery__image").src = card.link;
    cardElement.querySelector(".posts-gallery__image").alt =
      "Foto de " + card.name;
    cardElement.querySelector(".posts-gallery__text").textContent = card.name;
    return cardElement;
  });
  const container = document.querySelector(".posts-gallery");
  cards.forEach((cardElement) => {
    container.append(cardElement);
  });
}

document.addEventListener("DOMContentLoaded", renderCards);
