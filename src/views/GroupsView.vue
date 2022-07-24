<template>
<div>
  <GroupsComponent>

  </GroupsComponent>
</div>
</template>

<script lang="ts">
import userStore from "@/store/user"

import {defineAsyncComponent} from "vue";
export default {

  setup(){
    return(userStore)
  },  components:{
    GroupsComponent:defineAsyncComponent(() => import('../components/GroupsComponent') )
  },
  inheritAttrs: false,

}
</script>

<style scoped>

</style>