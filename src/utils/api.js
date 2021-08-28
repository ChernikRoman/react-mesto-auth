class Api {
  constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl
      this._headers = headers
  }

  _checkResponse(response) {
    if(response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status);
    }
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.newPlaceName,
        link: data.newPlaceLink
      })
    })
      .then(this._checkResponse)
  }

  handleDeleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  unsetLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  changeLikeStatus(cardId, likeStatus) {
    if (likeStatus) {
      return this.unsetLike(cardId);
    } else {
      return this.setLike(cardId);
    }
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data
      })
    })
      .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '71159411-ec47-4b6b-9a3f-60efbcf1f21f',
    'Content-Type': 'application/json'
  }
})

export default api;