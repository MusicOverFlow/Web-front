<template>

  <div id="container">


    <Card style="width: 25em">
      <template #title>
        <span class="p-float-label">
	<InputText id="title" type="text" v-model="title"/>
	<label for="title">Title</label>
</span>

      </template>
      <template #content>
        <Textarea id ="content" v-model="content" :autoResize="true" rows="5" cols="50" maxlength="400" placeholder="Quoi de neuf ?"/>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Publish" @click="publishPost"/>
        <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" @click="clearContent"
                />
      </template>
    </Card>

    <div>
      <MainThread
          v-for="(item) in refPosts"
          :post="item"
          :key="item.id"
      ></MainThread>
    </div>
<!--
    <div class="block">
              <span class="p-float-label">
             <InputText id="title" type="text" v-model="title" />
             <label for="title">Title</label>
          </span>
    </div>
     <div class="align-items-center justify-content-center">
       <div id="createPost" class="">

         <Textarea v-model="value" :autoResize="true" rows="5" cols="50" maxlength="400" placeholder="Quoi de neuf ?"/>
         <Button icon="pi pi-send" class="p-button" label="Envoyer" @submit="publishPost"/>
       </div>
           <div>
           <MainThread
               v-for="(item) in refPosts"
               :post="item"
               :key="item.id"
           ></MainThread>
           </div>
     </div> -->
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
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
const refPosts = ref(null)
const title = ref(null);
const content = ref(null);
import Card from "primevue/card";

onMounted(async () => {
  refPosts.value = await postService.getByAccount(userStore.state.jwt);
  console.log(refPosts.value)
  refPosts.value = refPosts.value.ownedPosts
  console.log(refPosts.value)
})

const publishPost = async () => {
  const postPublished = await postService.create({Title: title.value, Content: content.value}, userStore.state.jwt);
  refPosts.value.push(postPublished)
}

const clearContent = async () => {
  title.value = "";
  content.value = "";
}
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