<template>
  <NavbarComponent/>
  <div>
    <EditProfileComponent/>
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
    EditProfileComponent:defineAsyncComponent(() => import('../../components/ProfileComponent/EditProfileComponent.vue') ),
    NavbarComponent
  }
}
</script>


<style scoped>

</style>