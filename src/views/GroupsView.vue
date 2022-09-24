<template>
<div>
  <NavbarComponent/>
  <GroupsComponent>

  </GroupsComponent>
</div>
</template>

<script lang="ts">
import userStore from "@/store/user"
import NavbarComponent from "@/components/Navbar/NavbarComponent.vue";

import {defineAsyncComponent} from "vue";
export default {

  setup(){
    return(userStore)
  },  components:{
    GroupsComponent:defineAsyncComponent(() => import('../components/GroupsComponent') ),
    NavbarComponent
  },
  inheritAttrs: false,

}
</script>

<style scoped>

</style>