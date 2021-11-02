import { BehaviorSubject } from 'rxjs'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))

export const authService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value },
}

function login(email, password){
  return fetch(`${process.env.VUE_APP_API}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
            })
            .then(async (res) => {
              if(res.status === 200){
                let data = await res.json()
                let user = {uid: data.uid, roles: data.roles, token: data.token, language: data.language}
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