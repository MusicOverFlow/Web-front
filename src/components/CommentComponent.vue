<template>
  <div class="container">
    <Card>
      <template #content>
        <!-- <div class="flex">
           <UserIconComponent/>
           <p>{{ comment.content }}</p>
         </div> -->
        <div class="flex">
          <div class="flex-1 flex flex-column gap-5">
            <Image
                :src="comment.owner.picUrl"
                style="width: 100px; height: 100px;"
                @click="goToProfile(comment.owner.mailAddress)">
            </Image>
            <b>{{ comment.owner.pseudonym }}</b>
            <small v-if="comment.group">{{ comment.group.name }}</small>
          </div>
          <div class="flex-1 flex flex-column">

            <!-- <UserIconComponent/> -->
            <p>{{ comment.content }}</p>
          </div>
        </div>
      </template>
      <template #footer>
        <Button class="p-button-text" icon="pi pi-heart" label="Like" @click="like"/>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import Card from "primevue/card";
import Button from "primevue/button";
import Image from "primevue/image";</script>

<script lang="ts">
import accountService from "@/api/services/AccountService";
import userStore from "@/store/user";
import router from '@/router';

export default {
  props: ['comment'],
  inheritAttrs: false,
  methods: {
    async like() {
      const likeResponse = await accountService.like(this.$props.post.id, userStore.state.jwt)
      console.log(likeResponse)
    },
    goToProfile(mailAddress) {
      router.push({name: "profile", params: {id: mailAddress}});
    }
  }
}
</script>
<style scoped>

</style>