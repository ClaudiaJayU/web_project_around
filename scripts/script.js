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

function closeForm(event) {
  event.preventDefault();
  popup.classList.remove("active");
}

openFormButton.addEventListener("click", showPopup);
closeFormButton.addEventListener("click", closePopup);
openFormButton.addEventListener("click", showCurrentInfo);
formName.addEventListener("input", activeSaveButton);
formOccupation.addEventListener("input", activeSaveButton);
saveButton.addEventListener("click", saveFormInfo);
saveButton.addEventListener("click", closeForm);
