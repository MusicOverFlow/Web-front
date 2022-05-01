<template>
  <form @submit.prevent="onSubmit">
    <div class="grid p-fluid">
      <div class="col-12">
        <h1>Se connecter</h1>
      </div>
      <div class="col-12">
        <InputText id="email1" placeholder="Adresse mail" type="text" v-model="form.username"/>
      </div>
      <div class="col-12">
        <Password id="password1" placeholder="Mot de passe" v-model="form.password"/>
      </div>
      <div class="col-12">
        <Button label="Se connecter" type="submit"/>
      </div>
    </div>
    </form>
</template>

<script lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

import { defineComponent,reactive} from "vue";
import userStore from "@/store/user"
export default defineComponent({
  setup() {
    const form = reactive({
      username: '',
      password: ''
    })
    const onSubmit = () => {
      console.log(form)
      userStore.login({
        mailAddress:form.username,
        password: form.password,
      })

      console.log(userStore)
      form.username = ''
      form.password = ''
    }
    return{ form, userStore, onSubmit}
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