export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(response) {
  if(response.ok) {
    return response.json();
  } else {
    return Promise.reject(response.status);
  }
}

export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })
      .then(response => checkResponse(response))
}

export function authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })
    .then(response => checkResponse(response))
}

export function getUserInfo(jwt) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
    })
    .then(response => checkResponse(response))
}

export function signOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
}

export function tokenCheck() {
  return localStorage.getItem('jwt')
}
