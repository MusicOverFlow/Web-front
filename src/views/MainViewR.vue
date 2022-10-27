<template>
  <div class="flex" id="main">
    <div id="navbar">
      <NavbarComponent/>
    </div>
    <div id="mainThread">
      <MainView>
      </MainView>
    </div>
    <div id="ide">
      <CodeInputComponent>

      </CodeInputComponent>
    </div>
  </div>
</template>

<script lang="ts">
import userStore from "@/store/user"
import {defineAsyncComponent} from "vue";
import CodeInputComponent from "@/components/codeInput/CodeInputComponent.vue";
export default {
  setup(){
    return(userStore)
  },

  inheritAttrs: false,
  components:{
    CodeInputComponent,
    MainView:defineAsyncComponent(() => import('../views/MainView') ),
    NavbarComponent:defineAsyncComponent(() => import('../components/Navbar') ),
  }
}
</script>

<style scoped>
#navbar{
  flex: 1;
  overflow: hidden;
}
#mainThread{
  flex: 4;
  overflow: auto;
}
#ide{
  flex: 4;
  overflow: hidden;
}
#main {
  height: 100vh;
  width: 100vw;
}
</style>