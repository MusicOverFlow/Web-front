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
      </template>
    </Card>
  </div>
</template>
<script lang="ts">
import accountService from "@/api/services/AccountService";
import userStore from "@/store/user";

export default {
  props: ['post'],
  inheritAttrs: false,
  methods : {
    async like(){
     const likeResponse = await accountService.like(this.$props.post.id,userStore.state.jwt)
      console.log(likeResponse)
    }
  }
}
</script>
<script setup lang="ts">
import Card from "primevue/card";
import UserIconComponent from "@/components/UserIconComponent.vue";
import Button from "primevue/button";



</script>


<style scoped>

</style>