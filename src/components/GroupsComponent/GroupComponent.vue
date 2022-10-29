<template>
  <div class="flex">
    <div class="flex flex-column gap-5"></div>
    <div>image</div>
    <div class="flex-1 card">
      <h5>Custom Headers</h5>
      <TabView ref="tabview4" class="tabview-custom">
        <TabPanel>
          <template #header>
            <i class="pi pi-calendar"></i>
            <span>About</span>
          </template>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.</p>
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>Main Group thread</span>
            <i class="pi pi-user"></i>
          </template>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
            odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
        </TabPanel>
      </TabView>
    </div>
    <div class="flex-1 ">
      <Button class="p-button-text" icon="pi pi-user-plus" label="join"/>
      <Button class="p-button-text" icon="pi pi-user-minus" label="leave"/>
    </div>

  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
/*import Card from "primevue/card";
import UserIconComponent from "@/components/UserIconComponent.vue";*/
/*import router from '@/router';
import accountService from "@/api/services/AccountService";
import userStore from "@/store/user";*/
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
//import groupService from "@/api/services/GroupService";

export default {
  props: ['group'],
  name: "GroupComponent",
  inheritAttrs: false,
  components: {
    //UserIconComponent,
    TabView,
    TabPanel,
    Button,
    //Card,
  },
  methods: {}
}

</script>

<style scoped>
.container {
  margin: 1em;
}
</style>