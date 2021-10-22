import { BehaviorSubject } from 'rxjs'
import Router from '../router'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))

export const authService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value },
  token: currentUserSubject.value.token,
  httpHeader: {
    headers: {
      Authorization: `Bearer ${currentUserSubject.value.token}`
    }
  }
}

function login(email, password){
  return fetch(`${Router.options.apiUrl}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
            })
            .then(async (res) => {
              if(res.status === 200){
                let data = await res.json()
                let user = {uid: data.uid, roles: data.roles, token: data.token}
                localStorage.setItem('currentUser', JSON.stringify(user))
                currentUserSubject.next(user)
                return user
              }
            })
            .catch(err => console.log(err))

}

function logout() {
  // remove user from locastorage to log user out
  localStorage.removeItem('currentUser')
  currentUserSubject.next(null)
}