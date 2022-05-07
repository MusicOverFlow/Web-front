<template>


  <div id="main" class="m-8 grid grid-cols-3">
    <div class="bg-green-300 rounded-lg h-12 w-1/6">1</div>
    <div class="bg-green-500 rounded-lg h-12 w-4/6">
    <template v-if="refPosts">
      <MainThread
          v-for="(item) in refPosts"
          :post="item"
          :key="item.name"
      ></MainThread>
    </template>

    </div>
    <div class="bg-green-300 rounded-lg h-12 w-1/6">3</div>
  </div>
</template>

<script lang="ts">
import MainThread from "@/components/MainThread.vue";
import {defineComponent} from "vue";
import {Post} from "@/api/types/Post"
import {ref} from 'vue'

export default defineComponent({
  setup() {
   /*const posts: Post[] = [
      {name: "Post1"},
      {name: "Post2"}]*/
    const post1:Post = {name: "Post3"};
    const post2:Post = {name: "Post4"};
    const posts: Post[] = [post1,post2]
    console.log(posts)
    const refPosts = ref(posts)

    return { refPosts }
  },
  name: "MainView",
  components: {MainThread}
})
</script>

<style scoped>

</style>