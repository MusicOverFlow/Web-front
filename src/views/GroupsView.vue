<template>
  <div id="main" class="flex">
    <div id="navbar">
      <NavbarComponent/>
    </div>
    <GroupsComponent>

    </GroupsComponent>
  </div>
</template>

<script lang="ts">
import userStore from "@/store/user"

import {defineAsyncComponent} from "vue";

export default {

  setup() {
    return (userStore)
  }, components: {
    GroupsComponent: defineAsyncComponent(() => import('../components/GroupsComponent')),
    NavbarComponent: defineAsyncComponent(() => import('../components/Navbar'))
  },
  inheritAttrs: false,

}
</script>


<style scoped>
#navbar {
  flex: 1;
  overflow: hidden;
}

#mainThread {
  flex: 4;
  overflow: auto;
}

#ide {
  flex: 4;
  overflow: hidden;
}

#main {
  height: 100vh;
  width: 100vw;
}
</style>