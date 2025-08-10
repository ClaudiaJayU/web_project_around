/* Código para cerrar modales usando el orden html */

const modals = document.querySelectorAll(".popup");
const openButtons = document.querySelectorAll(".profile__btn");
const closeButtons = document.querySelectorAll(".popup__close-btn");
const saveButtons = document.querySelectorAll(".popup__save-btn");
const imgAmpliada = document.querySelector(".img-popup");
const imgAmpliadaImg = imgAmpliada.querySelector(".img-popup__image");
const imgAmpliadaTxt = imgAmpliada.querySelector(".img-popup__text");

// Función para abrir un modal específico
function openModal(modal) {
  modal.classList.add("active");
  document.addEventListener("keydown", handleEscape);
  document.activeElement.blur();
}

// Función para cerrar un modal específico
function closeModal(modal) {
  modal.classList.remove("active");
  document.removeEventListener("keydown", handleEscape);
}

// Cerrar con Escape
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup.active");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Cerrar haciendo clic en el overlay
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

// Abrir: aquí debes ordenar los botones en el mismo orden que los popups
openButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const modal = modals[index];
    openModal(modal);
  });
});

// Cerrar con botón de cerrar (X)
closeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const modal = modals[index];
    closeModal(modal);
  });
});

// Cerrar con botón guardar
saveButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const modal = modals[index];
    closeModal(modal);
  });
});

export function abrirModal(id) {
  document.getElementById(id).classList.add("open");
}

export function cerrarModal(id) {
  document.getElementById(id).classList.remove("open");
}

export {
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
};
