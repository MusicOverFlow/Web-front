<template>
  <div class="flex">
    <div class=" flex 1">
      <Image :src="refGroup.picUrl" alt="Image" width="250"
             preview/>
    </div>
    <div class="flex-1 card">
      <TabView class="tabview-custom" ref="tabview4">
        <TabPanel>
          <template #header>
            <i class="pi pi-calendar"></i>
            <span>About</span>
          </template>
          <textarea class="form-control" v-model="refGroup.description"></textarea>
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
          </div>
          <MainThread
              v-for="(item) in refPosts"
              :post="item"
              :key="item.id"
          ></MainThread>

        </TabPanel>
      </TabView>
    </div>
    <div class="flex-1 ">
      <Button label="join" icon="pi pi-user-plus" class="p-button-text" @click="join"/>
      <Button label="leave" icon="pi pi-user-minus" class="p-button-text" @click="leave"/>
    </div>

  </div>
</template>

<script setup lang="ts">
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

  const postPublished = await postService.create({Title: title.value, Content: content.value}, userStore.state.jwt,props.id);
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