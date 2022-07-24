<template>
  <div class="container">
    <Card>
      <template #title>
        <p>{{ post.title }}</p>
      </template>
      <template #content>
        <div class="flex">
          <div class="flex-1 flex flex-column gap-5">
          <Image
              :src="post.owner.picUrl"
              style="width: 100px; height: 100px;">
          </Image>
          <b>{{ post.owner.pseudonym }}</b>
            <small v-if="post.group">{{ post.group.name }}</small>
          </div>
          <div class="flex-1 flex flex-column">

            <!-- <UserIconComponent/> -->
            <p>{{ post.content }}</p>
          </div>
        </div>

      </template>
      <template #footer>
        <Button icon="pi pi-heart" class="p-button-text" label="Like" @click="like"/>
        <Button icon="pi pi-comment" class="p-button-text" label="Commenter" @click="comment"/>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
//import UserIconComponent from "@/components/UserIconComponent.vue";
import router from '@/router';
import accountService from "@/api/services/AccountService";
import userStore from "@/store/user";
import Image from "primevue/image";

export default {
  props: ['post'],
  name: "MainThread",
  inheritAttrs: false,
  components: {
    // UserIconComponent,
    Image,
    Button,
    Card,
  },
  methods: {
    comment() {
      console.log("comment");
      router.push({name: "post", params: {id: this.post.id}})
    },
    async like() {
      const likeResponse = await accountService.like(this.$props.post.id, userStore.state.jwt)
      console.log(likeResponse)

    }
  }
}

</script>

<style scoped>
.container {
  margin: 1em;
}
</style>