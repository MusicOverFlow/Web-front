import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/LoginView';
import MainViewR from "@/views/MainViewR";
import PostView from '@/views/PostView';
import ProfileView from "@/views/ProfileView";
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/main',
    name: 'home',
    component: MainViewR
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView,
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/codeInput',
    name: 'codeInput',
    component: CodeInputView
  },
  {
    path: '/groups',
    name: 'groups',
    component: GroupsView
  },
  {
    path: '/group/:id',
    name: 'group',
    component: SingleGroupView
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
import CodeInputView from "@/views/CodeInputView";
import GroupsView from "@/views/GroupsView";
import SingleGroupView from "@/views/SingleGroupView";

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
