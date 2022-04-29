<template>
  <main>
    <h1>Bienvenue sur MusicOverflow</h1>
    <div id="container" class="flex">
      <div class="col-5 flex align-items-center justify-content-center">
        <RegisterComponent/>
      </div>
      <div class="col-2">
        <Divider layout="vertical">
          <h1>OU</h1>
        </Divider>
      </div>
      <div class="col-5 flex align-items-center justify-content-center">
        <LoginComponent/>
      </div>
    </div>
  </main>
</template>

<script>
import RegisterComponent from "@/components/RegisterComponent";
import LoginComponent from "@/components/LoginComponent";

import Divider from "primevue/divider";

export default {
  name: 'LoginView',
  components: {
    RegisterComponent,
    LoginComponent,
    Divider
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10em;
}

#container {
  margin-left: 10em;
  margin-right: 10em;
}

h1 {
  font-size: 2em;
  margin: 2em;
}
</style>