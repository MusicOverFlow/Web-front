<template>
  <div class="container">
    <Card>
      <template #title>
        <p>{{ post.title }}</p>
      </template>
      <template #content>
        <div class="flex">
          <UserIconComponent/>
          <p>{{ post.content }}</p>
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
import UserIconComponent from "@/components/UserIconComponent.vue";
import router from '@/router';
import accountService from "@/api/services/AccountService";
import userStore from "@/store/user";

export default{
  props: ['post'],
  name: "MainThread",
  inheritAttrs: false,
  components: {
    UserIconComponent,
    Button,
    Card,
  },
  methods: {
    comment() {
      console.log("comment");
      router.push({name:"post",params: { id : this.post.id }})
    },
    async like(){
      const likeResponse = await accountService.like(this.$props.post.id,userStore.state.jwt)
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