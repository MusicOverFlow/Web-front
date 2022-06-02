<template>

  <div id="container">
    <form id=createPost
          @submit="publishPost">
        <span class="p-float-label">
	<InputText id="title" type="text" v-model="title" required="true"/>

	<label for="title">Title</label>
</span>
      <Textarea id="content" v-model="content" :autoResize="true" rows="5" cols="50" maxlength="400"
                placeholder="Quoi de neuf ?" required="true"/>
      <div class="col-start-1">
        <Button icon="pi pi-check" label="Publish" type="submit"/>

        <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em"
                @click="clearContent"
        />
      </div>
    </form>
    <div>
      <MainThread
          v-for="(item) in refPosts"
          :post="item"
          :key="item.id"
      ></MainThread>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import postService from "@/api/services/PostService";
import userStore from "@/store/user"
import MainThread from "@/components/MainThread/MainThread.vue";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import {AccountWithPosts} from "@/api/types/AccountWithPosts";

const refPosts = ref(null)
const title = ref(null);
const content = ref(null);

onMounted(async () => {
  const posts: AccountWithPosts = await postService.getByAccount(userStore.state.jwt);
  console.log(posts.ownedPosts)
  posts.ownedPosts = posts.ownedPosts.sort((firstPost, secondPost) => {
    return new Date(secondPost.createdAt).getDate() - new Date(firstPost.createdAt).getDate();
  })
  console.log(posts.ownedPosts)
  refPosts.value = posts.ownedPosts;

})

const publishPost = async () => {

  const postPublished = await postService.create({Title: title.value, Content: content.value}, userStore.state.jwt);
  refPosts.value.unshift(postPublished)
  await clearContent();
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