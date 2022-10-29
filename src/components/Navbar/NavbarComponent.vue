<template>
  <nav class="shadow bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
    <div class="container justify-between items-center mx-auto">
      <div id="header-headline" class="items-center">
        <router-link to="/main">
          <img id="header-logo" alt="MusicOverflow Logo" src="@/assets/logo.png">
          <span id="header-title" class="self-center text-xl font-semibold whitespace-nowrap">MusicOverflow</span>
        </router-link>
        <Image v-if="!!userInfos.picUrl"
               id="header-profile-pic"
               :src="userInfos.picUrl"
        />
      </div>
      <button aria-controls="mobile-menu" aria-expanded="false"
              class="items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              data-collapse-toggle="mobile-menu" type="button">
        <span class="sr-only">Ouvrir</span>
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                fill-rule="evenodd"></path>
        </svg>
        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                fill-rule="evenodd"></path>
        </svg>
      </button>
      <div id="mobile-menu" class="w-full md:block md:w-auto">
        <div>
          <ul class="md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <router-link to="/main">
              <li>
                <div class="navButton">
                  <i class="pi pi-home"></i>
                  <a class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     href="#">Accueil</a>
                </div>
              </li>
            </router-link>
            <router-link to="/groups">
              <li>
                <div class="navButton">
                  <i class="pi pi-users"></i>
                  <a class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     href="#">Groupes</a>
                </div>
              </li>
            </router-link>
            <router-link to="/profile">
              <li>
                <div class="navButton">
                  <i class="pi pi-user"></i>
                  <span
                      class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profil</span>
                </div>
              </li>
            </router-link>
            <router-link to="/pipeline">
              <li>
                <div class="navButton">
                  <i class="pi pi-th-large"></i>
                  <span
                      class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pipelines</span>
                </div>
              </li>
            </router-link>
            <li>
              <div class="navButton">
                <i class="pi pi-th-large"></i>
                <span
                    class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    @click="openBasic">Livecoding</span>
                <Dialog v-model:visible="displayBasic" :breakpoints="{'960px': '75vw', '640px': '90vw'}"
                        :style="{width: '50vw'}"
                        header="Livecoding">
                  <p>Veuillez entrée l'id de la session que vous souhaitez rejoindre</p>
                  <InputText v-model="livecodingId" placeholder="Id de la session"/>
                  <template #footer>
                    <Button class="p-button-text" label="Créer une session" @click="createSession"/>
                    <Button autofocus label="Rejoindre une session"
                            @click="joinSession(livecodingId)"/>
                  </template>
                </Dialog>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a class="mr-4 hover:underline md:mr-6 " href="#">À propos</a>
            </li>
            <li>
              <a class="mr-4 hover:underline md:mr-6" href="#">License</a>
            </li>
            <li>
              <a class="hover:underline" href="#">Contact</a>
            </li>
          </ul>
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ date }} MusicOverflow™.<br>Tout droits réservés.</span>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import {AccountWithPostsAndGroups} from "@/api/types/AccountWithPostsAndGroups";
import {ref} from "vue";
import accountService from "@/api/services/AccountService";
import userStore from "@/store/user";
import Image from "primevue/image";
import Dialog from 'primevue/dialog';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import {useRouter} from 'vue-router';

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
const displayBasic = ref(false);
const livecodingId = ref("");
const openBasic = () => {
  displayBasic.value = true;
};
const closeBasic = () => {
  displayBasic.value = false;
};
const router = useRouter();

const createSession = () => {
  console.log('createSession')
  router.push({name: "ide", params: {id: "new"}})
  closeBasic()
  //TODO
}

const joinSession = (id) => {
  console.log(id)
  router.push({name: "ide", params: {id: id}});
  closeBasic()
  //TODO
}

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
.navButton {
  display: flex;
}

nav, .container {
  height: 100%;
}

li i {
  margin-right: 10px;
}

ul li {
  margin-right: 10px;
  margin-bottom: 10px;
}

#header-logo {
  height: 2.25rem;
}

#header-profile-pic {
  width: 90px;
  height: 90px;
}

#mobile-menu {
  margin-top: 1em;
  height: 82%;
  overflow: scroll;
  display: inline-flex !important;
  align-items: stretch;
  flex-direction: column;
  justify-content: space-between;
}

@media (max-width: 1510px) {
  #header-headline {
    display: flex;
  }

  #header-title {
    display: none;
  }

  #header-logo {
    height: 1.5rem;
  }

  #header-profile-pic {
    margin-left: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
  }

  #mobile-menu {
    height: 91%;
    margin-top: 3em;
  }
}
</style>
