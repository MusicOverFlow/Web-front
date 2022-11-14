<template>
  <div>
    <Card class="SearchThread__card">
      <template #content>
        <div class="flex">
          <div class="mr-4 flex flex-column gap-1">
            <img
                :src="user.picUrl"
                alt="imgPost"
                class="card_image"
                @click="goToProfile(user.mailAddress)"
            >
          </div>
          <div class="flex-1 flex flex-column">
            <b class="card_owner" @click="goToProfile(user.mailAddress)">{{ user.pseudonym }}</b>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import 'vue3-audio-player/dist/style.css'
import Card from "primevue/card";
import router from '@/router';


export default {
  props: ['user'],
  name: "SearchThread",
  inheritAttrs: false,
  components: {
    Card,
  },
  methods: {
    goToProfile(mailAddress) {
      router.push({name: "profile", params: {id: mailAddress}});
    },
  },
}

</script>

<style scoped>
.card_image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}


.card_owner {
  cursor: pointer;
}
</style>