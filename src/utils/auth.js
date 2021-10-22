export const BASE_URL = 'https://backend-mesto-domain.nomoredomains.club';

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
        credentials: 'include',
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
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })
    .then(response => checkResponse(response))
}
