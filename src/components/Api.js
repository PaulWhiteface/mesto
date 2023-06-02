export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  
  getInitialCards() { //Массив карточек с сервера
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then(res => {
      return res.json();
    })
  }
  
  getUserInfoFromServer() {  //Данные пользователя с сервера
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(res => {
      return res.json();
    })
  }

  setUserInfoOnServer(name, about) {  //Меняем данные профиля
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then(res => {
      return res.json();
    })
  }

  setProfileAvatar(avatar) { //Установка автарки
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    })
    .then(res => {
      return res.json()
    })
  }

  addCardByHandle(name, link) { //Отправка данных карточки на сервер и добавление ее на сайт
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
    .then(res => {
      return res.json()
    })
  }

  handleDeleteCard(id) {  //Удаление карточки
    return fetch(this._baseUrl + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      return res.json()
    })
  }

  setLikeOnCard(id) {  //Ставит лайк
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      return res.json();
    })
  }

  removeLikeOnCard(id) { //Убирает лайк
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return res.json();
    })  
  }
}
