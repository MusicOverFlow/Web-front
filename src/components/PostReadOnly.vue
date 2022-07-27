<template>
  <div class="container">
    <Card>
      <template #title>
        <p>{{ post.title }}</p>
      </template>
      <template #content>
        <!-- <div class="flex">
           <UserIconComponent/>
           <p>{{ post.content }}</p>
         </div> !-->
        <div class="flex">
          <div class="flex-1 flex flex-column gap-5">
            <Image
                :src="post.owner.picUrl"
                style="width: 100px; height: 100px;"
                @click="goToProfile(post.owner.mailAddress)">
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
      </template>
    </Card>
  </div>
</template>
<script lang="ts">
import accountService from "@/api/services/AccountService";
import userStore from "@/store/user";
import router from '@/router';

export default {
  props: ['post'],
  inheritAttrs: false,
  methods: {
    async like() {
      const likeResponse = await accountService.like(this.$props.post.id, userStore.state.jwt)
      console.log(likeResponse)
    },
    goToProfile(mailAddress) {
      router.push({ name: "profile", params: { id: mailAddress } });
    }
  }
}
</script>
<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import Image from "primevue/image";

</script>


<style scoped>

</style>