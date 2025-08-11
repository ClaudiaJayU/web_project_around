import {
  openModal,
  imgAmpliada,
  imgAmpliadaImg,
  imgAmpliadaTxt,
} from "../utils/utils.js";

export class Card {
  constructor(text, link, templateCard) {
    this._text = text;
    this._link = link;
    this._templateCard = templateCard;
  }
  _getCardElement() {
    const cardElement = document
      .querySelector(this._templateCard)
      .content.querySelector(".posts-gallery__post")
      .cloneNode(true);
    return cardElement;
  }
  /* Esta función no es privada, ya que accederemos a ella fuera de la Clase */
  generateCard() {
    this.cardElement = this._getCardElement();
    this.likeBtn = this.cardElement.querySelector(".posts-gallery__like-btn");
    this.likeHeart = this.cardElement.querySelector(
      ".posts-gallery__like-btn img"
    );
    this.deleteBtn = this.cardElement.querySelector(".post__trash-btn");
    this.cardText = this.cardElement.querySelector(".posts-gallery__text");
    this.cardImage = this.cardElement.querySelector(".posts-gallery__image");
    this.cardText.textContent = this._text;
    this.cardImage.src = this._link;
    this._setEventListeners();
    return this.cardElement;
  }
  /* Esta función si es privada, ya que sólo la necesitamos dentro de la clase */
  _setEventListeners() {
    this.likeBtn.addEventListener("click", () => {
      if (this.likeHeart.src.includes("like-heart.svg")) {
        this.likeHeart.src = "./images/like-heart-active.svg";
      } else {
        this.likeHeart.src = "./images/like-heart.svg";
      }
    });
    this.deleteBtn.addEventListener("click", () => {
      this.cardElement.remove();
    });
    this.cardImage.addEventListener("click", () => {
      imgAmpliadaImg.src = this._link;
      imgAmpliadaImg.alt = this._text;
      imgAmpliadaTxt.textContent = this._text;
      openModal(imgAmpliada);
    });
  }
}
