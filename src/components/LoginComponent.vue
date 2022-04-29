<template>
    <div class="grid p-fluid">
      <div class="col-12">
        <h1>Se connecter</h1>
      </div>
      <div class="col-12">
        <InputText id="email" placeholder="Adresse mail" type="text" v-model="email"/>
      </div>
      <div class="col-12">
        <Password id="password" placeholder="Mot de passe" v-model="password"/>
      </div>
      <div class="col-12">
        <Button label="Se connecter"/>
      </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default {
  name: "LoginComponent",
  components: {
    InputText,
    Button,
    Password
  }
}
</script>

<style scoped>
h1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2em;
}
</style>