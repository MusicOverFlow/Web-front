
<template>

  <div id="container">
    <div class="align-items-center justify-content-center">
      <!--<div id="createPost">
        <Textarea v-model="value" :autoResize="true" rows="5" cols="100" maxlength="400" placeholder="Quoi de neuf ?"/>
        <Button icon="pi pi-send" class="p-button" label="Envoyer"/>
      </div>-->

         <!-- <MainThread
              v-for="(item) in refPosts.posts"
              :post="item"
              :key="item.id"
          ></MainThread> -->
          <div>
          <MainThread
              v-for="(item) in refPosts"
              :post="item"
              :key="item.id"
          ></MainThread>
          </div>
    </div>
  </div>

</template>

<!--
<script lang="ts">

import MainThread from "@/components/MainThread/MainThread.vue";
//import {defineComponent} from "vue";
import {ref} from 'vue'
//import Button from "primevue/button";
import postService from "@/api/services/PostService"
import userStore from "@/store/user"
//import Textarea from "primevue/textarea";

export default {
  async setup() {

    const refPosts = ref(null)

      refPosts.value = await postService.getByAccount(userStore.state.jwt);
      console.log(refPosts.value)

    return {refPosts, userStore}
  },
  name: "MainView",
  inheritAttrs: false,
  components: {
    MainThread
    //Button,
    //Textarea
  },

}
</script>
-->
<script setup lang="ts">
import {onMounted, ref} from "vue";
import postService from "@/api/services/PostService";
import userStore from "@/store/user"
import MainThread from "@/components/MainThread/MainThread.vue";

const refPosts = ref(null)

onMounted( async () => {
  refPosts.value = await postService.getByAccount(userStore.state.jwt);
  refPosts.value = refPosts.value.posts
  console.log(refPosts.value)
})
</script>
<style scoped>
#container {
  margin: 1em 20em 5em 20em;
}

#createPost {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  padding: 1em;
}
</style>