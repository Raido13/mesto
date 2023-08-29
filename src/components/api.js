//класс Api для взаимодействия с сервером
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //сохраняем в метод стандартное правило при получении ответа от сервера
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //сохраняем в метод fetch-запрос к серверу
  _request(endpointUrl, options) {
    return fetch(`${this._baseUrl}${endpointUrl}`, options).then(this._getResponseData);
  }

  //запрос к серверу на получение данных профиля и аватарки
  getInitialUserData() {
    return this._request('/users/me', {
      headers: this._headers
    });
  }

  //запрос к серверу на получение загруженных на сервер фотокарточек
  getInitialCards() {
    return this._request('/cards', {
      headers: this._headers
    });
  }

  //запрос к серверу на обновление данных профиля
  patchProfileData(data) {
    return this._request('/users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  //запрос к серверу на обновление аватарки
  patchAvatar(data) {
    return this._request('/users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
  }

  //запрос к серверу на добавление карточки
  postNewCard(data) {
    return this._request('/cards', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.picture
      })
    });
  }

  //запрос к серверу на удаление карточки
  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  //смена статуса лайка после взаимодействия
  changeLike(cardId, condition) {
    return this._request(`/cards/likes/${cardId}`, {
      method: condition ? 'DELETE' : 'PUT',
      headers: this._headers
    });
  }
}
