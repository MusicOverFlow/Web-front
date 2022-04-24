import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/LoginView';
import HomeView from '@/views/HomeView';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
