<template>
  <form @submit.prevent="onSubmit">
    <div class="grid p-fluid">
      <div class="col-12">
        <h1>Se connecter</h1>
      </div>
      <div class="col-12">
        <InputText id="email1" placeholder="Adresse mail" type="text" v-model="form.username" required/>
      </div>
      <div class="col-12">
        <Password id="password1" placeholder="Mot de passe" v-model="form.password" :feedback="false" required/>
      </div>
      <div class="col-12">
        <Button label="Se connecter" type="submit" :loading="isLoading"/>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

import {defineComponent,reactive, ref} from "vue";
import userStore from "@/store/user"
import router from '@/router';
import {useToast} from "primevue/usetoast";
export default defineComponent({
  setup() {
    const isLoading = ref(false);
    const form = reactive({
      username: '',
      password: ''
    })

    const toast = useToast();

    const onSubmit = async () => {
      isLoading.value = true;
      const loggedIn = await userStore.login({
        mailAddress: form.username,
        password: form.password,
      })

      if (loggedIn) {
        await router.push({name:"home"});
      }
      else {
        showWrongCredentials(); // TODO gtouchet: toast not showing
      }
      isLoading.value = false;
    }

    const showWrongCredentials = () => {
      toast.add({severity:'error', summary: 'Wrong credentials', detail:'Try again', life: 3000});
    }

    return{form, userStore, isLoading, onSubmit}
  },
  name: "LoginComponent",
  components: {
    InputText,
    Button,
    Password
  },

})


</script>

<style scoped>
h1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2em;
}
</style>