let openFormButton = document.querySelector(".profile__edit-btn");
let closeFormButton = document.querySelector(".popup__close-btn");
let popup = document.querySelector(".popup");

function showPopup() {
  popup.classList.add("active");
}
function closePopup() {
  popup.classList.remove("active");
}

openFormButton.addEventListener("click", showPopup);
closeFormButton.addEventListener("click", closePopup);
