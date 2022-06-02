<template>
<ProfileComponent>

</ProfileComponent>
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
    ProfileComponent:defineAsyncComponent(() => import('../components/ProfileComponent') )
  }
}
</script>


<style scoped>

</style>