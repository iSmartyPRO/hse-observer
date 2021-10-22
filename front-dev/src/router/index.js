import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '../components/auth'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Logout from '../views/Logout.vue'

// Users
import Users from '../views/Users/index.vue'

// Bracnhes
import Branches from '../views/Bracnhes/index.vue'

// Departments
import Departments from '../views/Departments/index.vue'

// Observes
import Observes from '../views/Observes/index.vue'

// Roles
import Roles from '../views/Roles/index.vue'



const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/departments',
    name: 'Departments',
    component: Departments
  },
  {
    path: '/branches',
    name: 'Branches',
    component: Branches
  },
  {
    path: '/observes',
    name: "Observes",
    component: Observes
  },
  {
    path: '/roles',
    name: 'Roles',
    component: Roles

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  apiUrl: 'http://localhost:9090/api',
})

router.beforeEach((to, from, next) => {
  const {authorize} = to.meta
  const currentUser = authService.currentUserValue
  if(authorize){
    if(!currentUser){
      // not logged in so redirect to login page with the return url
      return next({ path: '/login', query: { returnUrl: to.path }})
    }

    // check if route is restricted by role
    if( authorize.length && currentUser.roles.find(item => { return authorize.includes(item)}) ? false : true ) {
      return next({ path: '/' })
    }
  }
  next()
})

export default router
