<template>
  <div class="flex">
    <div class="flex-1">
      <NavbarComponent/>
    </div>
    <div class="flex-1">
      <MainView>
      </MainView>
    </div>
    <div class="flex-1">
      <p>IDE</p>
    </div>
  </div>
</template>

<script lang="ts">
import userStore from "@/store/user"
import {defineAsyncComponent} from "vue";
export default {
  setup(){
    return(userStore)
  },

  inheritAttrs: false,
  components:{
    MainView:defineAsyncComponent(() => import('../views/MainView') ),
    NavbarComponent:defineAsyncComponent(() => import('../components/Navbar') ),
  }
}
</script>

<style scoped>

</style>