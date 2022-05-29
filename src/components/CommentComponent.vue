<template>
  <div class="container">
    <Card>
      <template #content>
        <div class="flex">
          <UserIconComponent/>
          <p>{{ comment.content }}</p>
        </div>
      </template>
      <template #footer>
        <Button icon="pi pi-heart" class="p-button-text" label="Like" @click="like"/>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import UserIconComponent from "@/components/UserIconComponent.vue";
import Button from "primevue/button";

</script>

<script lang="ts">
import accountService from "@/api/services/AccountService";
import userStore from "@/store/user";

export default {
  props: ['comment'],
  inheritAttrs: false,
  methods:{
    async like(){
      const likeResponse = await accountService.like(this.$props.post.id,userStore.state.jwt)
      console.log(likeResponse)
    }
  }
}
</script>
<style scoped>

</style>