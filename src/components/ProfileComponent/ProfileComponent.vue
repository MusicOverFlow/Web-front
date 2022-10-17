<template>
<!--  <Toast />
  <div id="profil" style="background-color: #aaaaaa" class="flex-auto m-10 col-start-1">
  </div>-->
  <div class="flex" id="main">
    <div id="navbar">
      <NavbarComponent/>
    </div>
    <div id="profil">
      <div id="content">
        <div id="first_line">
          <Image :src="userInfos.picUrl" alt="Image" width="100"/>
          <div>
            <b>{{ userInfos.pseudonym }}</b>
            <br/>
            <small>{{ userInfos.follows.length }} Followers</small>
          </div>
          <router-link v-if="userCurrentInfo.mailAddress === userInfos.mailAddress"
                       to="/profile/edit">
            <Button type="button"
                    label="Éditer"/>
          </router-link>

          <Button type="button"
                  v-if="userCurrentInfo.mailAddress !== userInfos.mailAddress"
                  :label="isFollowing ? 'Follow' : 'Unfollow'"
                  :class="isFollowing ? 'pi pi-user-plus p-button-help' : 'pi pi-user-minus p-button-danger '"
                  @click="follow_unfollow"/>
        </div>
        <div id="second_line">
          <TabView lazy>
            <TabPanel header="Publications">
              <PostsComponent/>
            </TabPanel>
            <TabPanel header="Posts aimés">
              <LikedPostsComponent/>
            </TabPanel>
            <TabPanel header="Commentaires aimés">
              <LikedCommentsComponent/>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Image from "primevue/image";
import Button from "primevue/button";
import userStore from "@/store/user"
import {ref} from "vue";
import accountService from "@/api/services/AccountService";
import NavbarComponent from "@/components/Navbar";
import {AccountWithPostsAndGroups} from "@/api/types/AccountWithPostsAndGroups";
import {useRoute} from "vue-router";
import PostsComponent from "@/components/ProfileComponent/PostsComponent.vue";
import LikedPostsComponent from "@/components/ProfileComponent/LikedPostsComponent.vue";
import LikedCommentsComponent from "@/components/ProfileComponent/LikedCommentsComponent.vue";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const isFollowing = ref(true);

const userCurrentInfo = await accountService.getCurrent(userStore.state.jwt)
console.log(userCurrentInfo.mailAddress + "p")

const params = useRoute().params as { id: string };
console.log(params.id);

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
console.log("props " + params + params.id)


const getAccount = async () => {
  if (params.id === undefined) {
    console.log("undef")
    currentUser = await accountService.getCurrent(userStore.state.jwt)
  } else {
    console.log('def')
    currentUser = await accountService.getByMail(params.id, userStore.state.jwt)
  }
}
await getAccount()

userInfos.value = currentUser


console.log(currentUser)
console.log("pouet1")
console.log(userInfos.value.mailAddress)
console.log(userInfos.value.firstname)
console.log(userInfos.value.lastname)
console.log(userInfos.value.picUrl)

const isFollowingIcon = () => {

  if (isFollowing.value) {
    return "pi pi-user-minus";
  } else {
    return "pi pi-user-plus";
  }
}

isFollowingIcon();

const follow_unfollow = async () => {
  const res = await accountService.follow(userStore.state.jwt, userInfos.value.mailAddress)
  console.log(res)
  //userInfos.value = await accountService.getCurrent(userStore.state.jwt)
  await getAccount()
  isFollowing.value = !isFollowing.value;
}

/*
const editPic = async () => {
  /*const res = await accountService.updatePic(userInfos.value.picUrl,userStore.state.jwt)
  console.log(res)
  if (res === 200) {
    showSuccess()
    setisEditable(false)
  }
}*/
</script>
<style scoped>
Image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

#navbar{
  flex: 1;
  overflow: hidden;
}
#profil{
  flex: 8;
  overflow: auto;
}
#main {
  height: 100vh;
  width: 100vw;
}

#content {
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#first_line {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#first_line > div {
  margin-right: 5em;
}
</style>