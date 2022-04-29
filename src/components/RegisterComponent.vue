<template>
    <div class="grid p-fluid">
      <div class="col-12">
        <h1>S'inscrire</h1>
      </div>
      <div class="col-12 md:col-6">
        <InputText id="last_name" placeholder="Nom" type="text" v-model="last_name"/>
      </div>
      <div class="col-12 md:col-6">
        <InputText id="first_name" placeholder="Prénom" type="text" v-model="first_name"/>
      </div>
      <div class="col-12">
        <InputText id="email" placeholder="Adresse mail" type="text" v-model="email"/>
      </div>
      <div class="col-12">
        <Password id="password" placeholder="Mot de passe" v-model="password">
          <template #header>
            <h6>Saisissez un mot de passe</h6>
          </template>
          <template #footer>
            <Divider />
            <p class="mt-2">Suggestions</p>
            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
              <li>Au moins une minuscule</li>
              <li>Au moins une majuscule</li>
              <li>Au moins un chiffre</li>
              <li>Au moins 8 caractères</li>
            </ul>
          </template>
        </Password>
      </div>
      <div class="col-12">
        <Button label="S'inscrire"/>
      </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default {
  name: "RegisterComponent",
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