<template>
  <div id="container">
    <div class="align-items-center justify-content-center">
      <div id="createPost">
        <Textarea v-model="value" :autoResize="true" rows="5" cols="100" maxlength="400" placeholder="Quoi de neuf ?"/>
        <Button icon="pi pi-send" class="p-button" label="Envoyer"/>
      </div>
      <template v-if="refPosts">
        <MainThread
            v-for="(item) in refPosts"
            :post="item"
            :key="item.name"
        ></MainThread>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import MainThread from "@/components/MainThread.vue";
import {defineComponent} from "vue";
import {Post} from "@/api/types/Post"
import {ref} from 'vue'
import Button from "primevue/button";
import postService, {PostCreateProps} from "@/api/services/PostService";

export default defineComponent({
  async setup() {
    const xx:Post = null
    console.log(xx)
    /*const posts: Post[] = [
       {name: "Post1"},
       {name: "Post2"}]*/
    const refPosts = ref(null)
    let postProps: PostCreateProps = {
      title: 'postyyy1',
      content: 'postyyycontent1'
    }
    refPosts.value = await postService.create(postProps);
    console.log(refPosts.value)
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

    return {refPosts}
  },
  name: "MainView",
  components: {
    MainThread,
    Button
  }
})
</script>

<style scoped>
#container{
  margin: 1em 20em 5em 20em;
}

#createPost{
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  padding: 1em;
}
</style>