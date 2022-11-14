<template>
  <div id="search" class="flex">
    <div id="navbar">
      <NavbarComponent/>
    </div>
    <div id="searchThread">
      <SearchView/>
    </div>
  </div>
</template>

<script lang="ts">
import userStore from "@/store/user"
import {defineAsyncComponent} from "vue";

export default {
  setup() {
    return (userStore)
  },

  inheritAttrs: false,
  components: {
    SearchView: defineAsyncComponent(() => import('../views/SearchView')),
    NavbarComponent: defineAsyncComponent(() => import('../components/Navbar')),
  }
}
</script>

<style scoped>
#navbar {
  flex: 1;
  overflow: hidden;
}

#searchThread {
  flex: 8;
  overflow: auto;
}

#search {
  height: 100vh;
  width: 100vw;
}
</style>