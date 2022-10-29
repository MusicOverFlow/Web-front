<template>
  <div class="flex">
    <div class=" flex 1">
      <Image :src="refGroup.picUrl" alt="Image" preview
             width="250"/>
    </div>
    <div class="flex-1 card">
      <TabView ref="tabview4" class="tabview-custom">
        <TabPanel>
          <template #header>
            <i class="pi pi-calendar"></i>
            <span>About</span>
          </template>
          <textarea v-model="refGroup.description" class="form-control"></textarea>
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>Main Group thread</span>
            <i class="pi pi-user"></i>

          </template>
          <div class="container">
            <form id=createPost
                  @submit="publishPost">
<span class="p-float-label">
	<InputText id="title" v-model="title" required="true" type="text"/>

	<label for="title">Title</label>
</span>
              <Textarea id="content" v-model="content" :autoResize="true" cols="50" maxlength="400" placeholder="Quoi de neuf ?"
                        required="true" rows="5"/>
              <div class="col-start-1">
                <Button icon="pi pi-check" label="Publish" type="submit"/>

                <Button class="p-button-secondary" icon="pi pi-times" label="Cancel" style="margin-left: .5em"
                        @click="clearContent"
                />
              </div>
            </form>
          </div>
          <MainThread
              v-for="(item) in refPosts"
              :key="item.id"
              :post="item"
          ></MainThread>

        </TabPanel>
      </TabView>
    </div>
    <div class="flex-1 ">
      <Button class="p-button-text" icon="pi pi-user-plus" label="join" @click="join"/>
      <Button class="p-button-text" icon="pi pi-user-minus" label="leave" @click="leave"/>
    </div>

  </div>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import {ref} from "vue";
import userStore from "@/store/user";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import groupService from "@/api/services/GroupService";
import Image from "primevue/image";
import {useRoute} from "vue-router";
import MainThread from "@/components/MainThread/MainThread.vue";
import {Post} from "@/api/types/Post";
import postService from "@/api/services/PostService";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

const refGroup = ref()
/*const props = defineProps({
  id: String,
});*/

const title = ref("");
const content = ref("");
const publishPost = async () => {

  const postPublished = await postService.create({
    Title: title.value,
    Content: content.value
  }, userStore.state.jwt, props.id);
  refPosts.value.unshift(postPublished)
  await clearContent();
}

const clearContent = async () => {
  title.value = "";
  content.value = "";
}

const props = useRoute().params as { id: string };
console.log(props.id)


const getGroup = async () => {
  refGroup.value = await groupService.getById(userStore.state.jwt, props.id);
  console.log(refGroup.value.picUrl);
  console.log(refGroup.value)
}
await getGroup();
console.log(refGroup.value)

const join = async () => {
  var resJoin = await groupService.join(refGroup.value.id, userStore.state.jwt);

  const posts: Post[] = await groupService.getPosts(props.id, userStore.state.jwt);
  refPosts.value = posts;
  console.log(resJoin);
}
const leave = async () => {
  var resLeave = await groupService.leave(refGroup.value.id, userStore.state.jwt);
  refPosts.value = [];
  console.log(resLeave);
}


const refPosts = ref([])


const posts: Post[] = await groupService.getPosts(props.id, userStore.state.jwt);
console.log(posts);

if (posts.length > 0) {
  refPosts.value = posts;
}
//refPosts.value = posts;

</script>

<style scoped>
.container {
  margin: 1em;
}
</style>