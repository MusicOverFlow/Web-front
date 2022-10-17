<template>
  <NavbarComponent/>
  <div>
    <ProfileComponent :props="id"/>
  </div>
</template>

<script lang="ts">
import userStore from "@/store/user"
import {defineAsyncComponent} from "vue";
import NavbarComponent from "@/components/Navbar/NavbarComponent.vue";
export default {
  setup(){
    return(userStore)
  },
  props: {
    id: String,
  },
  inheritAttrs: false,
  components:{
    ProfileComponent:defineAsyncComponent(() => import('../../components/ProfileComponent') ),
    NavbarComponent
  }
}
</script>


<style scoped>

</style>