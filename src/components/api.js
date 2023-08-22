//класс Api для взаимодействия с сервером
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //сохраняем в функцию стандартное правило при получении ответа от сервера
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //запрос к серверу на получение данных профиля и аватарки
  getInitialUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  //запрос к серверу на получение загруженных на сервер фотокарточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  //запрос к серверу на обновление данных профиля
  patchProfileData({ userName, userOccupation }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userOccupation
      })
    }).then((res) => this._getResponseData(res));
  }

  //запрос к серверу на обновление аватарки
  patchAvatar(userAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar
      })
    }).then((res) => this._getResponseData(res));
  }

  //запрос к серверу на добавление карточки
  postNewCard({ pictureTitle, pictureLink }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: pictureTitle,
        link: pictureLink
      })
    }).then((res) => this._getResponseData(res));
  }

  //запрос к серверу на удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  //запрос на установку лайка карточки
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  //запрос на удаление лайка карточки
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }
}
