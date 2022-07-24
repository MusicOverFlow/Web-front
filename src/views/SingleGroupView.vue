<template>
<div>
  <SingleGroupComponent>

  </SingleGroupComponent>
</div>
</template>

<script lang="ts">
import userStore from "@/store/user"

import {defineAsyncComponent} from "vue";
export default {

  setup(){
    return(userStore)
  },  components:{
    SingleGroupComponent:defineAsyncComponent(() => import('../components/SingleGroupComponent') )
  },
  inheritAttrs: false,

}
</script>

<style scoped>

</style>