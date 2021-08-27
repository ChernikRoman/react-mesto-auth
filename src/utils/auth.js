export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })
      .then((res)=>{ if (res.status === 201) {
        return res.json();
      } else {
          return Promise.reject(res.statusText);
      }
    })
      .then(data=>console.log(data))
}

export function authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })
      .then((res)=>{ if (res.status === 200) {
        return res.json();
      } else {
          return Promise.reject(res.statusText);
      }
    })
      .then((data)=>{
        localStorage.setItem('jwt', data.token)
      })

}

export function getUserInfo(jwt) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
    })
      .then(res => {
          console.log(res)
          if (res.status == 200 ) {
              return res.json();
          } else {
              return Promise.reject(res.statusText);
          }
      })
      .then(data=>data.data.email)
      .catch(err => console.log(err))
}

export function signOut() {
    localStorage.removeItem('jwt');
}

export function tokenCheck() {
  return localStorage.getItem('jwt')
}

// register('awdawdwad@awdawd.com', 'wdadawdawdawd')