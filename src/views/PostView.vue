<template>
  <NavbarComponent/>
  <div id="container">
    <div class="align-items-center justify-content-center">
      <div v-if="refPosts" id="createComment">
        <UserIconComponent/>
        <Textarea v-model="value" :autoResize="true" cols="100" maxlength="400" placeholder="Rédigez votre réponse"
                  rows="3"/>
        <Button class="p-button" icon="pi pi-send" label="Commenter" @click="publishComment"/>
      </div>
      <div>
        <PostReadOnly
            v-for="(item) in refPosts"
            :key="item.id"
            :post="item">

        </PostReadOnly>
      </div>
      <div v-if="refPosts" class="m-2">
        <CommentComponent
            v-for="(item) in refPosts[0].commentaries"
            :key="item.id"
            :comment="item">

        </CommentComponent>
      </div>

    </div>
  </div>
</template>


<script lang="ts" setup>
import {defineProps, onMounted, ref} from 'vue'
import Button from "primevue/button";
import UserIconComponent from "@/components/UserIconComponent.vue";
import postService from "@/api/services/PostService";
import userStore from "@/store/user";
import Textarea from "primevue/textarea";
import PostReadOnly from "@/components/PostReadOnly.vue";
import commentService from "@/api/services/CommentService";
import CommentComponent from "@/components/CommentComponent.vue";
import NavbarComponent from "@/components/Navbar/NavbarComponent.vue";

const refPosts = ref(null)
const props = defineProps({
  id: String,
});

const value = ref(null)

onMounted(async () => {
  console.log("prop : " + props.id)
  refPosts.value = await postService.getById(userStore.state.jwt, props.id);
  console.log(refPosts.value)
  // refPosts.value = refPosts.value.
  console.log("pouet")
  console.log(refPosts.value[0].commentaries)
})

const publishComment = async () => {
  const comment = await commentService.create(value.value, props.id, userStore.state.jwt)
  if (comment.id != null) {
    refPosts.value[0].commentaries.push(comment.commentaries[comment.commentaries.length - 1])
  }
  console.log(comment)

}

</script>
<style scoped>
#container {
  margin: 1em 20em 5em 20em;
}

#createComment {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  padding: 1em;
}
</style>