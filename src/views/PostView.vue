<template>
  <div id="container">
    <div class="align-items-center justify-content-center">
      <Card>
        <template #content>
          <div class="flex">
            <img id="userIcon" src="https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
              numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
              quas!</p>
          </div>
        </template>
        <template #footer>
          <Button icon="pi pi-heart" class="p-button-text" label="Like" disabled="disabled"/>
        </template>
      </Card>
      <div id="createComment">
        <Textarea v-model="value" :autoResize="true" rows="5" cols="100" maxlength="400"/>
        <Button icon="pi pi-send" class="p-button" label="Envoyer"/>
      </div>
      <template v-if="refComments">
        <MainThread
            v-for="(item) in refComments"
            :post="item"
            :key="item.name"
        ></MainThread>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import MainThread from "@/components/MainThread.vue";
import {defineComponent} from "vue";
import {Post} from "@/api/types/Post"
import {ref} from 'vue'
import Button from "primevue/button";

export default defineComponent({
  setup() {
    /*const comments: Comment[] = [
       {name: "Comment1"},
       {name: "Comment2"}]*/
    let comments: Post[] = []
    comments.push({name: "Comment1"});
    comments.push({name: "Comment1"});
    comments.push({name: "Comment1"});
    comments.push({name: "Comment1"});
    comments.push({name: "Comment1"});
    const refComments = ref(comments)

    return { refComments }
  },
  name: "CommentView",
  components: {
    MainThread,
    Button
  }
})
</script>

<style scoped>
#container{
  margin: 1em 20em 5em 20em;
}

#createComment{
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
</style>