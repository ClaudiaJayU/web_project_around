let openFormButton = document.querySelector(".profile__edit-btn");
let closeFormButton = document.querySelector(".popup__close-btn");
let popup = document.querySelector(".popup");
let profileName = document.querySelector(".profile__name-text");
let profileOccupation = document.querySelector(".profile__occupation");
let formName = document.querySelector(".popup__name");
let formOccupation = document.querySelector(".popup__occupation");
let saveButton = document.querySelector(".popup__save-btn");

function showPopup() {
  popup.classList.add("active");
}
function closePopup() {
  popup.classList.remove("active");
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

function closeForm(evt) {
  evt.preventDefault();
  popup.classList.remove("active");
}

openFormButton.addEventListener("click", showPopup);
closeFormButton.addEventListener("click", closePopup);
openFormButton.addEventListener("click", showCurrentInfo);
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
