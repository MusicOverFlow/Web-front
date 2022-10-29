<template>
  <main>
    <img src="@/assets/logo.png" id="login-logo" alt="MusicOverflow Logo">
    <h1>Bienvenue sur MusicOverflow</h1>
    <div id="container" class="flex">
      <div class="col-5 flex align-items-center justify-content-center">
        <RegisterComponent/>
      </div>
      <div class="col-2">
      </div>
      <div class="col-5 flex align-items-center justify-content-center">
        <LoginComponent/>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import RegisterComponent from "@/components/RegisterComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";

import { defineComponent } from "vue";
import userStore from "@/store/user"
export default defineComponent( {
  name: 'LoginView',
  components: {
    RegisterComponent,
    LoginComponent,
    // Divider
  },
  setup(){
    return { userStore }
  }
})
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em 10em 10em;
}

#container {
  margin-left: 10em;
  margin-right: 10em;
}

#login-logo {
  width: 5em;
  height: 5em;
  margin-top: 2em;
}

h1 {
  font-size: 2em;
  margin: 2em;
}
</style>