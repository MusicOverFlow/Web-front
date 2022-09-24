<template>
  <nav class="shadow bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
    <div class="container justify-between items-center mx-auto">
      <div class="items-center">
        <router-link to="/main">
          <img src="@/assets/logo.png" class="h-6 sm:h-9" alt="MusicOverflow Logo">
          <span class="self-center text-xl font-semibold whitespace-nowrap">MusicOverflow</span>
        </router-link>
        <Image :src="userInfos.picUrl"
               style="width: 90px; height: 90px;"
               v-if="!!userInfos.picUrl"
        />
      </div>
      <button data-collapse-toggle="mobile-menu" type="button" class="items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
        <span class="sr-only">Ouvrir</span>
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
      <div class="w-full md:block md:w-auto" id="mobile-menu">
        <div>
          <ul class="md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <router-link to="/groups">
            <li>
              <div class="navButton">
                <i class="pi pi-users"></i>
                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Groupes</a>
              </div>
            </li>
            </router-link>
            <router-link to="/profile" >
            <li>
              <div class="navButton">
                <i class="pi pi-user"></i>
                <span class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</span>
              </div>
            </li>
            </router-link>
            <router-link to="/pipeline" >
            <li>
              <div class="navButton">
                <i class="pi pi-th-large"></i>
                <span class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pipelines</span>
              </div>
            </li>
            </router-link>
          </ul>
        </div>
        <div>
          <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6 ">À propos</a>
            </li>
            <li>
              <a href="#" class="mr-4 hover:underline md:mr-6">License</a>
            </li>
            <li>
              <a href="#" class="hover:underline">Contact</a>
            </li>
          </ul>
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ date }} MusicOverflow™.<br>Tout droits réservés.</span>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import {AccountWithPostsAndGroups} from "@/api/types/AccountWithPostsAndGroups";
import {ref} from "vue";
import accountService from "@/api/services/AccountService";
import userStore from "@/store/user";
import Image from "primevue/image";

let emptyAccount: AccountWithPostsAndGroups = {
  mailAddress: "",
  firstname: "",
  lastname: "",
  createdAt: "",
  ownedPosts: [],
  likedPosts: [],
  likedCommentaries: [],
  groups: [],
  Pseudonym: "",
  picUrl: "",
  follows: [],
}
const userInfos = ref(emptyAccount)
let currentUser: AccountWithPostsAndGroups;


const getAccount = async () => {
  currentUser = await accountService.getCurrent(userStore.state.jwt)
}
await getAccount()

userInfos.value = currentUser

console.log("header")
console.log(userInfos.value.picUrl)

</script>
<!--<script>
export default {
  name: 'NavbarComponent'
}
</script>-->
<style>
.navButton{
  display: flex;
}
nav, .container{
  height: 100%;
}
li i {
  margin-right: 10px;
}
ul li {
  margin-right: 10px;
  margin-bottom: 10px;
}

#mobile-menu{
  margin-top: 1em;
  height: 82%;
  overflow: scroll;
  display: inline-flex !important;
  align-items: stretch;
  flex-direction: column;
  justify-content: space-between;
}
</style>
