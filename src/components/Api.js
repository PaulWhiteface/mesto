export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  
  getInitialCards() { //Массив карточек с сервера
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then(this._checkResponse);
  }
  
  getUserInfoFromServer() {  //Данные пользователя с сервера
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  setUserInfoOnServer(name, about) {  //Меняем данные профиля
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then(this._checkResponse);
  }

  setProfileAvatar(avatar) { //Установка автарки
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    })
    .then(this._checkResponse);
  }

  addCardByHandle(name, link) { //Отправка данных карточки на сервер и добавление ее на сайт
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
    .then(this._checkResponse);
  }

  handleDeleteCard(id) {  //Удаление карточки
    return fetch(this._baseUrl + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  setLikeOnCard(id) {  //Ставит лайк
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  removeLikeOnCard(id) { //Убирает лайк
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}
