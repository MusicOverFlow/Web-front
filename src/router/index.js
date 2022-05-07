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
  },
  {
    path: '/main',
    name: 'home',
    component: MainView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
/*
router.beforeEach(async (to, from) => {
  if (
      // make sure the user is authenticated
      !isLoggedIn &&
      // ❗️ Avoid an infinite redirect
      to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})*/
import userStore from '@/store/user';
import MainView from "@/views/MainView";

router.beforeEach(async (to) => {
  const authenticated = userStore.getters.isLoggedIn;
  console.log(authenticated);

  // redirect the user to login page if he is not authenticated
  if (!authenticated && to.name !== 'login') {
    return { name: 'login' };
  }

  if (authenticated && to.name === 'login') {
    return { name: 'home' };
  }
});


export default router
