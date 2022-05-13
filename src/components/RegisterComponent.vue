<template>
  <form  @submit.prevent="onSubmit">
    <div class="grid p-fluid">
      <div class="col-12">
        <h1>S'inscrire</h1>
      </div>
      <div class="col-12 md:col-6">
        <InputText id="last_name" placeholder="Nom" type="text" v-model="form.lastname"/>
      </div>
      <div class="col-12 md:col-6">
        <InputText id="first_name" placeholder="Prénom" type="text" v-model="form.firstname"/>
      </div>
      <div class="col-12">
        <InputText id="email" placeholder="Adresse mail" type="text" v-model="form.email"/>
      </div>
      <div class="col-12">
        <Password id="password" placeholder="Mot de passe" v-model="form.password">
          <template #header>
            <h6>Saisissez un mot de passe</h6>
          </template>
<!--          <template #footer>
            <Divider />
            <p class="mt-2">Suggestions</p>
            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
              <li>Au moins une minuscule</li>
              <li>Au moins une majuscule</li>
              <li>Au moins un chiffre</li>
              <li>Au moins 8 caractères</li>
            </ul>
          </template>-->
        </Password>
      </div>
      <div class="col-12">
        <Button label="S'inscrire" type="submit"/>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import {defineComponent, reactive} from "vue";
import userStore from "@/store/user";
import router from "@/router";

export default defineComponent({
  name: "RegisterComponent",
  components: {
    InputText,
    Button,
    Password
  },
  setup(){
    const form = reactive({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    })
    const onSubmit = async () => {
      const result = await userStore.register({
        firstName: form.firstname,
        lastName: form.lastname,
        mailAddress: form.email,
        password: form.password,
      })
      if (result) {
        await router.push('/home')
      }
    }
    return{ form, userStore, onSubmit}
  }
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