<template>
  <div id="main">

    <div id="profil" style="background-color: #aaaaaa" class="flex-auto m-10 col-start-1">
      Profile
    </div>
    <div class="flex">
      <div class="flex-1 flex align-items-center flex-column ">
        <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" width="250"
               preview/>
        <b>Pseudo</b>
        <b>Ichai</b>
        <small>Email</small>
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
            <InputText placeholder="Username" v-bind:disabled="!isEditable"></InputText>
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
            <InputText placeholder="Username" v-bind:disabled="!isEditable"></InputText>
          </div>
          <div class="flex gap-5">

            <Button @click="setisEditable(true)" label="Edit"></Button>
            <div :hidden="!isEditable">
              <Button @click="setInitalProfileValues()" label="Cancel"></Button>
              <Button label="Save" type="submit"/>
            </div>
          </div>
        </div>
      </form>
      <div class="flex-1"></div>
      <!--    <div class="flex-auto">
            <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" width="250" preview />
          </div>-->
      <!--      <form @submit.prevent="onSubmit">-->
      <!--        <div class="grid p-fluid">-->

      <!--          <div class="col-12 md:col-3 m-12">-->
      <!--            <h5>Informations</h5>-->
      <!--            <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" width="250"-->
      <!--                   preview/>-->
      <!--          </div>-->
      <!--          &lt;!&ndash; <form> &ndash;&gt;-->
      <!--          <div class="col-12 md:col-3">-->

      <!--            <div class="flex flex-row-reverse ">-->
      <!--              <div>-->
      <!--                <div class="p-inputgroup">-->
      <!--                     <span class="p-inputgroup-addon">-->
      <!--                         <i class="pi pi-user"></i>-->
      <!--                     </span>-->
      <!--                  <InputText placeholder="Username" disabled></InputText>-->

      <!--                </div>-->
      <!--                <div class="p-inputgroup">-->
      <!--                     <span class="p-inputgroup-addon">-->
      <!--                         <i class="pi pi-user"></i>-->
      <!--                     </span>-->
      <!--                  &lt;!&ndash;<InputText  placeholder="Mail" disabled></InputText>&ndash;&gt;-->
      <!--                  <InputText v-model="userInfos.mailAddress" placeholder="Mail" disabled></InputText>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="col-12 md:col-2">-->
      <!--            <div class="flex flex-row-reverse ">-->
      <!--              <div class="p-inputgroup">-->
      <!--                    <span class="p-inputgroup-addon">-->
      <!--                        <i class="pi pi-user"></i>-->
      <!--                    </span>-->
      <!--                <InputText v-model="userInfos.firstname" placeholder="Prenom" disabled/>-->
      <!--                &lt;!&ndash;<InputText placeholder="Prenom" disabled/>&ndash;&gt;-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="p-inputgroup">-->
      <!--                     <span class="p-inputgroup-addon">-->
      <!--                         <i class="pi pi-user"></i>-->
      <!--                     </span>-->
      <!--              <InputText v-model="userInfos.lastname" placeholder="Nom" disabled/>-->
      <!--              &lt;!&ndash; <InputText placeholder="Nom" disabled/>&ndash;&gt;-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="col-12 md:col-3">-->
      <!--            <Button label="Modifier" type="submit"/>-->

      <!--          </div>-->
      <!--        </div>-->

      <!--      </form>-->
    </div>

  </div>


</template>

<script setup lang="ts">
import Image from "primevue/image";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import userStore from "@/store/user"
import {ref} from "vue";
import accountService from "@/api/services/AccountService";
import {AccountWithPostsAndGroups} from "@/api/types/AccountWithPostsAndGroups";

const isEditable = ref(false);

const setisEditable = (value: boolean) => {
  isEditable.value = value;
};


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
  ProfilPicUrl: ""
}
const userInfos = ref(emptyAccount)
const currentUser = await accountService.getCurrent(userStore.state.jwt)
let initialUser = {...currentUser}
userInfos.value = currentUser
console.log(currentUser)
console.log("pouet1")
console.log(userInfos.value.mailAddress)
console.log(userInfos.value.firstname)
console.log(userInfos.value.lastname)

const setInitalProfileValues = () => {
  console.log(initialUser)
  userInfos.value = initialUser
  setisEditable(false)
}

const onSubmit = async () => {

  // const result = await userStore.login({
  //   mailAddress: userInfos.value.username,
  //   password: form.password,
  // })
  /*onBeforeMount( async  () => {
  const currentUser = await accountService.getCurrent(userStore.state.jwt)
  userInfos.value = currentUser
  console.log(currentUser)
  console.log("pouet1")
  console.log(userInfos.value.mailAddress)
  console.log(userStore)

})*/
}
</script>
<style scoped>

</style>