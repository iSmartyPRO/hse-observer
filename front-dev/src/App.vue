<template>

    <Header v-if="currentUser" />
    <Leftbar v-if="currentUser" />
    <router-view />
    <Offcanvas  v-if="currentUser" />
</template>

<script>
import './assets/dashboard.css'

import { authService } from './components/auth'
import Header from './views/Dashboard/Header.vue'
import Leftbar from './views/Dashboard/Leftbar.vue'
import Content from './views/Dashboard/Content.vue'
import Offcanvas from './views/Dashboard/Offcanvas.vue'

import { useToast } from "vue-toastification";

export default {
  components: {Header, Leftbar, Content, Offcanvas},
  setup() {
    const toast = useToast()
    return {toast}
  },
  data() {
    return {
      currentUser: null,
      apiUrl: this.$router.options.apiUrl
    }
  },
  created() {
    this.toast.success("Welcome to HSE System!!!")
    authService.currentUser.subscribe(x => {
      this.currentUser = x
      })
      if(!this.currentUser) this.$router.push('/login')
  },
  mounted() {

  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.roles.includes('admin')
    },
    isObserver() {
      return this.currentUser && this.currentUser.roles.includes('observer')
    },
    isStandard() {
      return this.currentUser && this.currentUser.roles.includes('standard')
    }
  }

}
</script>

<style>


</style>
