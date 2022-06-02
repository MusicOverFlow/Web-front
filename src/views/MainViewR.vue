<template>
  <div>
  <MainView>
  </MainView>
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
    MainView:defineAsyncComponent(() => import('../views/MainView') )
  }
}
</script>

<style scoped>

</style>