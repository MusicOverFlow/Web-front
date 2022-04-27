<template>
  <main>
    <TabView lazy>
      <TabPanel header="S'inscrire">
        <RegisterComponent/>
      </TabPanel>
      <TabPanel header="Se connecter">
        <LoginComponent/>
      </TabPanel>
    </TabView>
  </main>
</template>

<script>
import RegisterComponent from "@/components/RegisterComponent";
import LoginComponent from "@/components/LoginComponent";

import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

export default {
  name: 'LoginView',
  components: {
    RegisterComponent,
    LoginComponent,
    TabView,
    TabPanel
  }
}
</script>

<style scoped>

</style>