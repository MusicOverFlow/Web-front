<template>
  <form @submit.prevent="onSubmit">
    <div class="grid p-fluid">
      <Toast/>
      <div class="col-12">
        <h1>S'inscrire</h1>
      </div>
      <div class="col-12 md:col-6">
        <InputText id="last_name" v-model="form.lastname" placeholder="Nom" required type="text"/>
      </div>
      <div class="col-12 md:col-6">
        <InputText id="first_name" v-model="form.firstname" placeholder="Prénom" required type="text"/>

      </div>
      <div class="col-12">
        <InputText id="pseudo" v-model="form.pseudonym" placeholder="Pseudo" required type="text"/>
      </div>
      <div class="col-12 ">
        <InputText id="email" v-model="form.email" placeholder="Adresse mail" required type="text"/>
      </div>
      <div class="col-12">
        <Password id="password" v-model="form.password" placeholder="Mot de passe" required>
          <template>
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
      <input accept="image/x-png,image/gif,image/jpeg" type="file" @change="onFileChanged">
      <div v-if="isError">
        <p style="color: red">Une erreur est servenue</p>
      </div>
      <div class="col-12">
        <Button :loading="isLoading" label="S'inscrire" type="submit"/>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import {defineComponent, reactive, ref} from "vue";
import userStore from "@/store/user";
import accountService from "@/api/services/AccountService";
import {useToast} from "primevue/usetoast";
import Toast from "primevue/toast";
import router from '@/router';

export default defineComponent({
  name: "RegisterComponent",
  components: {
    InputText,
    Button,
    Password
  },
  setup() {
    const isLoading = ref(false);
    const isError = ref(false);
    const form = reactive({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      pseudonym: ''
    })
    const toast = useToast();

    const selectedFile = ref<File>();

    const onFileChanged = (event: Event) => {
      selectedFile.value = (event.target as HTMLInputElement).files[0];
    };
    const onSubmit = async () => {
      isLoading.value = true;
      const result = await accountService.register({
        firstname: form.firstname,
        lastname: form.lastname,
        mailAddress: form.email,
        password: form.password,
        pseudonym: form.pseudonym,
        picture: selectedFile.value
      });

      if (result < 300) {
        showSuccess()
        // Auto connect after account register
        const loggedIn = await userStore.login({
          mailAddress: form.email,
          password: form.password,
        })
        if (loggedIn) {
          await router.push({name: "home"});
        }
        else {
          isError.value = true;
        }
      }
      isLoading.value = true;
    }

    const showSuccess = () => {
      toast.add({severity: 'success', summary: 'Success', detail: 'Changes saved', life: 3000});
    }

    return {form, userStore, onSubmit, onFileChanged, isError, selectedFile, toast, Toast, isLoading}
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