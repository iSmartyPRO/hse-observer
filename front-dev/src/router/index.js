import { createRouter, createWebHistory } from 'vue-router'
import { useToast } from "vue-toastification"
import { authService } from '../components/auth'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Logout from '../views/Logout.vue'

import { Role } from "../_helpers"

// Users
import Users from '../views/Users/index.vue'
import UserCreate from '../views/Users/create.vue'
import UserEdit from '../views/Users/edit.vue'

// Bracnhes
import Branches from '../views/Bracnhes/index.vue'

// Departments
import Departments from '../views/Departments/index.vue'

// Observes
import Observes from '../views/Observes/index.vue'

// Roles
import Roles from '../views/Roles/index.vue'

const toast = useToast();

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
    component: Users,
    meta: { authorize: [Role.Admin] }
  },
  {
    path: '/user/create',
    name: 'UserCreate',
    component: UserCreate,
    meta: { authorize: [Role.Admin] }
  },
  {
    path: '/user/:userId',
    name: 'UserEdit',
    component: UserEdit,
    meta: { authorize: [Role.Admin] }
  },
  {
    path: '/departments',
    name: 'Departments',
    component: Departments,
    meta: { authorize: [Role.Admin] }
  },
  {
    path: '/branches',
    name: 'Branches',
    component: Branches,
    meta: { authorize: [Role.Admin] }
  },
  {
    path: '/observes',
    name: "Observes",
    component: Observes,
  },
  {
    path: '/roles',
    name: 'Roles',
    component: Roles,
    meta: { authorize: [Role.Standard] } 
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
    if( authorize.length && !currentUser.roles.find(item => { return (authorize.map(item => item.toLowerCase())).includes(item)}) ? true : false ) {
      toast.error("Запрещенный маршрут")
      return next({ path: '/' })
    }
  }
  next()
})

export default router
