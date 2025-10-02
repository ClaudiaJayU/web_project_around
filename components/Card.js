import { api } from "./Api.js";

export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner; // ahora owner es string según tu API
    this._isLiked = data.isLiked || false; // booleano
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._currentUserId = currentUserId;
  }

  // Clona el template
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".posts-gallery__post")
      .cloneNode(true);
  }

  // Genera la tarjeta y renderiza estado inicial
  generateCard() {
    this._element = this._getTemplate();

    this.likeBtn = this._element.querySelector(".posts-gallery__like-btn");
    this.likeHeart = this.likeBtn.querySelector("img");
    this.deleteBtn = this._element.querySelector(".post__trash-btn");
    this.cardText = this._element.querySelector(".posts-gallery__text");
    this.cardImage = this._element.querySelector(".posts-gallery__image");

    this.cardText.textContent = this._name;
    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;

    if (this._ownerId !== this._currentUserId) {
      this.deleteBtn.style.display = "none";
    }

    this._renderLikeState();
    this._setEventListeners();

    return this._element;
  }

  // Devuelve true si el usuario actual ya dio like
  _isLikedByMe() {
    return this._isLiked;
  }

  // Actualiza el DOM del corazón según estado
  _renderLikeState() {
    if (this._isLikedByMe()) {
      this.likeHeart.src = "./images/like-heart-active.svg";
    } else {
      this.likeHeart.src = "./images/like-heart.svg";
    }
  }

  // Eventos de la tarjeta
  _setEventListeners() {
    // Like
    this.likeBtn.addEventListener("click", () => {
      if (this._isLikedByMe()) {
        api
          .unlikeCard(this._id)
          .then((updatedCard) => {
            this._isLiked = updatedCard.isLiked;
            this._renderLikeState();
          })
          .catch((err) => console.log("❌ Error al quitar like:", err));
      } else {
        api
          .likeCard(this._id)
          .then((updatedCard) => {
            this._isLiked = updatedCard.isLiked;
            this._renderLikeState();
          })
          .catch((err) => console.log("❌ Error al dar like:", err));
      }
    });

    this.deleteBtn.addEventListener("click", () => {
      this._handleDeleteCard(this._id, this._element);
    });

    // Abrir imagen en popup
    this.cardImage.addEventListener("click", () => {
      this._handleCardClick.open(this._name, this._link);
    });
  }
}
