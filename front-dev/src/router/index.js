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
import Branches from '../views/Branches/index.vue'
import BranchCreate from '../views/Branches/create.vue'
import BranchEdit from '../views/Branches/edit.vue'

// Departments
import Departments from '../views/Departments/index.vue'
import DepartmentCreate from '../views/Departments/create.vue'
import DepartmentEdit from '../views/Departments/edit.vue'

// Observes
import Observes from '../views/Observes/index.vue'

// Roles
import Roles from '../views/Roles/index.vue'
import RoleCreate from '../views/Roles/create.vue'
import RoleEdit from '../views/Roles/edit.vue'

const toast = useToast();

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      menu: 'Dashboard'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      authorize: [Role.Admin],
      menu: 'Users',
    }
  },
  {
    path: '/user/create',
    name: 'UserCreate',
    component: UserCreate,
    meta: {
      authorize: [Role.Admin],
      menu: 'Users'
    }
  },
  {
    path: '/user/:userId',
    name: 'UserEdit',
    component: UserEdit,
    meta: {
      authorize: [Role.Admin],
      menu: 'Users'
    }
  },
  {
    path: '/departments',
    name: 'Departments',
    component: Departments,
    meta: {
      authorize: [Role.Admin],
      menu: 'Departments'
    }
  },
  {
    path: '/department/create',
    name: 'DepartmentCreate',
    component: DepartmentCreate,
    meta: {
      authorize: [Role.Admin],
      menu: 'Departments'
    }
  },
  {
    path: '/department/:departmentId',
    name: 'DepartmentEdit',
    component: DepartmentEdit,
    meta: {
      authorize: [Role.Admin],
      menu: 'Departments'
    }
  },
  {
    path: '/branches',
    name: 'Branches',
    component: Branches,
    meta: {
      authorize: [Role.Admin],
      menu: 'Branches'
    }
  },
  {
    path: '/branch/create',
    name: 'BranchCreate',
    component: BranchCreate,
    meta: {
      authorize: [Role.Admin],
      menu: 'Branches'
    }
  },
  {
    path: '/branch/:branchId',
    name: 'BranchEdit',
    component: BranchEdit,
    meta: {
      authorize: [Role.Admin],
      menu: 'Branches'
    }
  },
  {
    path: '/observes',
    name: "Observes",
    component: Observes,
    meta: {
      menu: 'Observes'
    }
  },
  {
    path: '/roles',
    name: 'Roles',
    component: Roles,
    meta: {
      authorize: [Role.Admin],
      menu: 'Roles'
    }
  },
  {
    path: '/role/create',
    name: 'RoleCreate',
    component: RoleCreate,
    meta: {
      authorize: [Role.Admin],
      menu: 'Roles'
    }
  },
  {
    path: '/role/:roleId',
    name: 'RoleEdit',
    component: RoleEdit,
    meta: {
      authorize: [Role.Admin],
      menu: 'Roles'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const {authorize, title} = to.meta
  const currentUser = authService.currentUserValue
  if(authorize){
    if(!currentUser){
      // not logged in so redirect to login page with the return url
      return next({ path: '/login', query: { returnUrl: to.path }, params: {title: 'Login'}})
    }
    // check if route is restricted by role
    if( authorize.length && !currentUser.roles.find(item => { return (authorize.map(item => item.toLowerCase())).includes(item)}) ? true : false ) {
      toast.error("?????????????????????? ??????????????")
      return next({ path: '/' })
    }
  }
  next()
})

export default router
