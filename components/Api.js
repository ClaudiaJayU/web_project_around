class Api {
  constructor(options) {
    // cuerpo del constructor
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  getUserInfo() {
    /* da como resultado una promesa */
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    /* da como resultado una promesa */
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // otros métodos para trabajar con la API
}

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "eca43a66-82b3-4726-8557-adf1b074e3be",
    "Content-Type": "application/json",
  },
});
