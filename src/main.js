import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import store from './store'
import 'flowbite'
import createI18n from './i18n.js'
createApp(App).use(store).use(createI18n).use(router).mount('#app')
