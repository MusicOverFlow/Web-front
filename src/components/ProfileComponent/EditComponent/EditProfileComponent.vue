<template>
  <div>
<!--    <Toast />
    <div id="profil" style="background-color: #aaaaaa" class="flex-auto m-10 col-start-1">
    </div>-->
    <div id="main" class="flex">
      <div id="navbar">
        <NavbarComponent/>
      </div>
      <div id="profil">
        <div id="profilPic">
          <Image :src="userInfos.picUrl" alt="Image" width="250"
                 preview/>
          <input type="file" @change="onFileChanged">
          <Button @click="onUpload">Upload</Button>

          <Button type="button" v-if="userCurrentInfo.mailAddress !== userInfos.mailAddress" :label="isFollowing ? 'Follow' : 'Unfollow'"
                  v-bind:class="isFollowing ? 'pi pi-user-plus p-button-help' : 'pi pi-user-minus p-button-danger '"
                  @click="follow_unfollow"/>
        </div>
        <div id="profilInfos">
          <form @submit.prevent="onSubmit">
            <div class="p-inputgroup">
                             <span class="p-inputgroup-addon">
                                 <i class="pi pi-user"></i>
                             </span>
              <InputText v-model="userInfos.firstname" placeholder="Prénom"/>
            </div>
            <div class="p-inputgroup">
                             <span class="p-inputgroup-addon">
                                 <i class="pi pi-user"></i>
                             </span>
              <InputText v-model="userInfos.lastname" placeholder="Nom"/>
            </div>
            <div class="p-inputgroup">
                             <span class="p-inputgroup-addon">
                                 <i class="pi pi-user"></i>
                             </span>
              <InputText v-model="userInfos.mailAddress" placeholder="Mail"/>
            </div>
            <div class="p-inputgroup">
                             <span class="p-inputgroup-addon">
                                 <i class="pi pi-user"></i>
                             </span>
              <InputText v-model="userInfos.pseudonym" placeholder="Pseudo"/>
            </div>
            <div id="confirmButtons">
              <Button label="Sauvegarder" type="submit" :loading="isLoading"/>
              <Button label="Annuler" class="p-button-text" @click="FuckGoBack"/>
            </div>
          </form>
        </div>
      </div>

    </div>

  </div>


</template>

<script setup lang="ts">
import Image from "primevue/image";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
//import Toast from "primevue/toast";
import userStore from "@/store/user"
import {ref} from "vue";
import accountService from "@/api/services/AccountService";
import {AccountWithPostsAndGroups} from "@/api/types/AccountWithPostsAndGroups";
import {useRoute} from "vue-router";
import {useToast} from "primevue/usetoast";
import router from '@/router';
import NavbarComponent from "@/components/Navbar/NavbarComponent.vue";

const isFollowing = ref(true);
const toast = useToast();
const isLoading = ref(false);

const selectedFile = ref<File>();

const showSuccess = () => {
  toast.add({severity:'success', summary: 'Success', detail:'Changes saved', life: 3000});
}

const onFileChanged = (event: Event) => {
  const file = (event.target as HTMLInputElement).files[0];
  selectedFile.value = file;
};

const onUpload = async () => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    const response = await accountService.updatePic(formData, userStore.state.jwt);
    if (response.picUrl) {
      userInfos.value.picUrl = response.picUrl;
      console.log(response.picUrl);
      showSuccess();
    }
  }
};
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
  pseudonym: "",
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
console.log(userInfos.value.pseudonym)
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

const onSubmit = async () => {
  isLoading.value = true;
  const res = await accountService.update({
    firstname: userInfos.value.firstname,
    lastname: userInfos.value.lastname,
    pseudonym: userInfos.value.pseudonym,
  }, userStore.state.jwt,)

  console.log(res)
  if (res === 200) {
    await router.push("/profile");
  }
  isLoading.value = false;
}

const FuckGoBack = async () => {
  await router.push("/profile");
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

#main {
  height: 100vh;
  width: 100vw;
}
#navbar{
  flex: 1;
  overflow: auto;
}
#profil{
  flex: 8;
  overflow: auto;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
#profilPic{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;

  margin-bottom: 2em;
}
#profilInfos > form {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 1em;
  width: 30em;
}
#confirmButtons{
  display: flex;
  gap: 1em;
}
NavbarComponent{
  min-height: 100%;
  min-width: 100%;
}
</style>