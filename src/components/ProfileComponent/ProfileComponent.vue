<template>
  <div id="main">

    <div id="profil" style="background-color: #aaaaaa" class="flex-auto m-10 col-start-1">
      Profile
    </div>
    <div>
      <!--    <div class="flex-auto">
            <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" width="250" preview />
          </div>-->
      <form @submit.prevent="onSubmit">
      <div class="grid p-fluid">

        <div class="col-12 md:col-3 m-12">
          <h5>Informations</h5>
          <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" width="250"
                 preview/>
        </div>
        <!-- <form> -->
         <div class="col-12 md:col-3">

           <div class="flex flex-row-reverse ">
             <div>
               <div class="p-inputgroup">
                     <span class="p-inputgroup-addon">
                         <i class="pi pi-user"></i>
                     </span>
                  <InputText placeholder="Username" disabled> </InputText>

               </div>
               <div class="p-inputgroup">
                     <span class="p-inputgroup-addon">
                         <i class="pi pi-user"></i>
                     </span>
                 <!--<InputText  placeholder="Mail" disabled></InputText>-->
                <InputText v-model="userInfos.mailAddress" placeholder="Mail" disabled></InputText>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-2">
          <div class="flex flex-row-reverse ">
            <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
              <InputText v-model="userInfos.firstname" placeholder="Prenom" disabled/>
              <!--<InputText placeholder="Prenom" disabled/>-->
             </div>
           </div>
           <div class="p-inputgroup">
                     <span class="p-inputgroup-addon">
                         <i class="pi pi-user"></i>
                     </span>
             <InputText v-model="userInfos.lastname" placeholder="Nom" disabled/>
           <!-- <InputText placeholder="Nom" disabled/>-->
          </div>
        </div>
        <div class="col-12 md:col-3">
          <div class="p-input">
            <button label="Modifier" type="submit"/>
          </div>

        </div>
        </div>

      </form>
    </div>

    </div>


  </template>

  <script setup lang="ts">
  import Image from "primevue/image";
  import InputText from "primevue/inputtext";

  import userStore from "@/store/user"
  import {ref} from "vue";
  import accountService from "@/api/services/AccountService";
  import {AccountWithPostsAndGroups} from "@/api/types/AccountWithPostsAndGroups";

  let emptyAccount:AccountWithPostsAndGroups = {
    mailAddress:"",
    firstname:"",
    lastname:"",
    createdAt:"",
    ownedPosts:[],
    likedPosts:[],
    likedCommentaries:[],
    groups:[]
  }
  const userInfos = ref(emptyAccount)
  const currentUser = await accountService.getCurrent(userStore.state.jwt)
  userInfos.value = currentUser
  console.log(currentUser)
  console.log("pouet1")
  console.log(userInfos.value.mailAddress)
  console.log(userInfos.value.firstname)
  console.log(userInfos.value.lastname)
  /*onBeforeMount( async  () => {
    const currentUser = await accountService.getCurrent(userStore.state.jwt)
    userInfos.value = currentUser
    console.log(currentUser)
    console.log("pouet1")
    console.log(userInfos.value.mailAddress)
    console.log(userStore)

  })*/
  </script>
  <style scoped>

  </style>