<template>
  <div>
    <Card class="MainThread__card">
      <template #content>
        <div class="flex">
          <div class="mr-4 flex flex-column gap-1">
            <img
                class="card_image"
                @click="goToProfile(post.owner.mailAddress)"
                :src="post.owner.picUrl"
                alt="imgPost"
            >
          </div>
          <div class="flex-1 flex flex-column">
            <b class="card_owner" @click="goToProfile(post.owner.mailAddress)">{{ post.owner.pseudonym }}</b>
            <small v-if="post.group">{{ post.group.name }}</small>
            <!-- <UserIconComponent/> -->
            <p>{{ post.content }}</p>
          </div>
        </div>

      </template>
      <template #footer>
        <div class="flex">
          <Button v-bind:class="liked ? 'pi pi-heart-fill ':'pi pi-heart'" class="p-button-text" label="Like"
                  @click="like"/>
          <Button icon="pi pi-comment" class="p-button-text" label="Commenter" @click="comment"/>
          <div v-if="post.musicUrl">
            <AudioPlayer :option="{
        src: post.musicUrl,
        title: post.musicUrl.split('.').reverse()[1],
   }"
            />
          </div>
          <div v-else>
            <input type="file" @change="onFileChanged">
            <Button @click="onUpload(post.id)">Add music</Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>


<script setup lang="ts">


import postService from "@/api/services/PostService";
const selectedFile = ref<File>();

const onFileChanged = (event: Event) => {
  const file = (event.target as HTMLInputElement).files[0];
  selectedFile.value = file;
};

const onUpload = async (id:string) => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    const music = await postService.updateMusic(formData,userStore.state.jwt,id);
    console.log(music)
  }
};

</script>

<script lang="ts">
import AudioPlayer from 'vue3-audio-player'
import 'vue3-audio-player/dist/style.css'
import Button from "primevue/button";
import Card from "primevue/card";
import router from '@/router';
import accountService from "@/api/services/AccountService";
import userStore from "@/store/user";
import {ref} from "vue";

export default {
  props: ['post'],
  name: "MainThread",
  inheritAttrs: false,
  data() {
    return {
      liked: false,
      commented: false,
      selectedFile : ref<File>()
    }
  },
  components: {
    // UserIconComponent,
    Button,
    Card,
    AudioPlayer
  },
  methods: {
    comment() {
      router.push({name: "post", params: {id: this.post.id}})
    },
    async like() {
      const likeResponse = await accountService.like(this.$props.post.id, userStore.state.jwt)
      this.liked = !this.liked
      console.log(likeResponse)

    },
    goToProfile(mailAddress) {
      router.push({name: "profile", params: {id: mailAddress}});
    },
    /* onFileChanged(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
       console.log(file.type)
       this.props.selectedFile.value = file;
    },

     async onUpload() {
      if (this.selectedFile.value) {
        const formData = new FormData();
        formData.append('file', this.selectedFile.value);
        const music = await postService.updateMusic(formData,userStore.state.jwt);
        console.log(music)
        this.$props.musicUrl = music.musicUrl
       // const response = await accountService.updatePic(formData, userStore.state.jwt);

      }
    }*/
  }
}

</script>

<style scoped>
.card_image {
  width: 50px;
  height: 50px;
  border-radius:50%;
  object-fit: cover;
  cursor: pointer;
}

.card_owner {
  cursor: pointer;
}

.MainThread__card {
  box-shadow: white !important;
}

.container {
  margin: 1em;
}
</style>