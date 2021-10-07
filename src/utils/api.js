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
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
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
      credentials: 'include',
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
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  unsetLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
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
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data
      })
    })
      .then(this._checkResponse)
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      method: 'GET',
      credentials: 'include',
    })
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api;