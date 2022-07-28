<template>
  <div id="main">
    <Toast />
    <div id="profil" style="background-color: #aaaaaa" class="flex-auto m-10 col-start-1">
    </div>
    <div class="flex">
      <div class="flex-1 flex align-items-center flex-column ">


        <Image :src="userInfos.picUrl" alt="Image" width="250"
               preview/>
        <input type="file" @change="onFileChanged">
        <Button @click="onUpload">Upload</Button>
        <b>{{ userInfos.pseudonym }}</b>

        <Button type="button" v-if="userCurrentInfo.mailAddress !== userInfos.mailAddress" :label="isFollowing ? 'Follow' : 'Unfollow'"
                v-bind:class="isFollowing ? 'pi pi-user-plus p-button-help' : 'pi pi-user-minus p-button-danger '"
                @click="follow_unfollow"/>
        <small> {{ userInfos.follows.length }} Followers</small>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="flex-1 flex flex-column gap-5">
          <h2>Profil</h2>
          <div class="p-inputgroup">
                             <span class="p-inputgroup-addon">
                                 <i class="pi pi-user"></i>
                             </span>
            <InputText v-model="userInfos.firstname" placeholder="FirstName" v-bind:disabled="!isEditable"/>
          </div>
          <div class="p-inputgroup">
                             <span class="p-inputgroup-addon">
                                 <i class="pi pi-user"></i>
                             </span>
            <InputText v-model="userInfos.lastname" placeholder="Username" v-bind:disabled="!isEditable"></InputText>
          </div>
          <div class="p-inputgroup">
                             <span class="p-inputgroup-addon">
                                 <i class="pi pi-user"></i>
                             </span>
            <InputText v-model="userInfos.mailAddress" placeholder="Mail" v-bind:disabled="!isEditable"></InputText>
          </div>
          <div class="p-inputgroup">
                             <span class="p-inputgroup-addon">
                                 <i class="pi pi-user"></i>
                             </span>
            <InputText v-model="userInfos.pseudonym" placeholder="Pseudonym" v-bind:disabled="!isEditable"></InputText>
          </div>
          <div class="flex gap-5">

            <Button v-if="userCurrentInfo.mailAddress === userInfos.mailAddress" @click="setisEditable(true)" label="Edit"></Button>
            <div :hidden="!isEditable">
              <Button @click="setInitalProfileValues()" label="Cancel"></Button>
              <Button label="Save" type="submit"/>
            </div>
          </div>
        </div>
      </form>
      <div class="flex-1"></div>

    </div>

  </div>


</template>

<script setup lang="ts">
import Image from "primevue/image";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import userStore from "@/store/user"
import {ref} from "vue";
import accountService from "@/api/services/AccountService";
import {AccountWithPostsAndGroups} from "@/api/types/AccountWithPostsAndGroups";
import {useRoute} from "vue-router";
import {useToast} from "primevue/usetoast";


//const fileInput = ref<HTMLInputElement>();
const isEditable = ref(false);
const isFollowing = ref(true);
const toast = useToast();

const selectedFile = ref<File>();

const showSuccess = () => {
  toast.add({severity:'success', summary: 'Success', detail:'Changes saved', life: 3000});
}

const setisEditable = (value: boolean) => {
  isEditable.value = value;
};

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

let initialUser = {...currentUser}
userInfos.value = currentUser


console.log(currentUser)
console.log("pouet1")
console.log(userInfos.value.mailAddress)
console.log(userInfos.value.firstname)
console.log(userInfos.value.lastname)
console.log(userInfos.value.picUrl)
const setInitalProfileValues = () => {
  console.log(initialUser)
  userInfos.value = initialUser
  setisEditable(false)
}

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
  const res = await accountService.update(  {
    firstname: userInfos.value.firstname,
    lastname: userInfos.value.lastname,
    pseudonym: userInfos.value.Pseudonym,
  }, userStore.state.jwt,)

  console.log(res)
  if (res === 200) {
    showSuccess()
    setisEditable(false)
  }

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

</style>