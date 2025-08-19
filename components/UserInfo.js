export default class UserInfo {
  constructor({ nameSelector, occupationSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._occupationElement = document.querySelector(occupationSelector);
    this._avatarElement = document.querySelector(avatarSelector); // <- nuevo
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._occupationElement.textContent,
      avatar: this._avatarElement.src, // <- nuevo
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._occupationElement.textContent = about; // ojo: en la API se llama "about"
    if (avatar) this._avatarElement.src = avatar;
  }
}
