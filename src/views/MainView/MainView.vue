<template>

  <CreatePost @publishPost="publishPost"></CreatePost>

  <div class="MainView" id="container">
    <div class="MainView">
      <MainThread
          v-for="(item) in refPosts"
          :post="item"
          :key="item.id"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import postService from "@/api/services/PostService";
import userStore from "@/store/user"
import MainThread from "@/components/MainThread/MainThread.vue";
import {Post} from "@/api/types/Post";
import CreatePost from "@/components/CreatePost/CreatePost.vue";

const refPosts = ref([])


onMounted(async () => {
  const posts: Post[] = await postService.getHomePage(userStore.state.jwt);
  console.log(posts)
  refPosts.value = posts;
  console.log(refPosts.value);
})



const publishPost = async (title,content) => {

  const postPublished = await postService.create({Title: title, Content: content}, userStore.state.jwt);
  refPosts.value.unshift(postPublished)

}


</script>
<style scoped>
.MainView {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

#container {
  margin: 1em 20em 5em 20em;
}

#createPost {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  padding: 1em;
}
</style>