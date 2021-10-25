import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import vfmPlugin from 'vue-final-modal'


createApp(App)
    .use(router)
    .use(Toast)
    .use(vfmPlugin)
    .mount('#app')
