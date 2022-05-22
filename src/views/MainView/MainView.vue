
<template>

  <div id="container">
    <div class="align-items-center justify-content-center">
      <div id="createPost">
        <Textarea v-model="value" :autoResize="true" rows="5" cols="100" maxlength="400" placeholder="Quoi de neuf ?"/>
        <Button icon="pi pi-send" class="p-button" label="Envoyer"/>
      </div>
        <template>
         <!-- <MainThread
              v-for="(item) in refPosts.posts"
              :post="item"
              :key="item.id"
          ></MainThread> -->
          <MainThread
              v-for="(item) in refPosts.posts"
              :post="item"
              :key="item.id"
          ></MainThread>
        </template>
    </div>
  </div>

</template>


<script lang="ts">
import MainThread from "@/components/MainThread/MainThread.vue";
//import {defineComponent} from "vue";
import {ref} from 'vue'
import Button from "primevue/button";
import postService from "@/api/services/PostService"
import userStore from "@/store/user"
import Textarea from "primevue/textarea";

export default {
  async setup() {

    const refPosts = ref(null)
    refPosts.value = await postService.getByAccount(userStore.state.jwt);
    console.log(refPosts.value)
    /*
        const xx:Post = null
    console.log(xx)
    const posts: Post[] = [
       {name: "Post1"},
       {name: "Post2"}]*/
    /* const refPosts = ref(null)
     let postProps: PostCreateProps = {
       title: 'postyyy1',
       content: 'postyyycontent1'withSuspen
     }

     console.log(userStore.state.jwt)
     refPosts.value = await postService.create(postProps,userStore.state.jwt);
     console.log(refPosts.value)*/
    /* let posts: Post[] = []

     let requestedPost = await postService.create(postProps)
     posts.push(requestedPost);
     console.log(requestedPost)*/
    /*posts.push({name: "Post1"});
    posts.push({name: "Post1"});
    posts.push({name: "Post1"});
    posts.push({name: "Post1"});
    posts.push({name: "Post1"});*/
    //const refPosts = ref(posts)

    return {refPosts, userStore}
  },
  name: "MainView",
  components: {
    MainThread,
    Button,
    Textarea
  }
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