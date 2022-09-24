<template>
  <div class="MainView" id="container">
    <form id=createPost
          @submit="$emit('publishPost',localProps.title,localProps.content); clearContent(localProps) ">
        <span class="p-float-label">
          <InputText id="title" type="text" v-model="localProps.title" required="true"/>

          <label for="title">Title</label>
        </span>
      <Textarea id="content" v-model="localProps.content" :autoResize="true" rows="5" cols="50" maxlength="400"
                placeholder="Quoi de neuf ?" required="true"/>
      <div class="col-start-1">
        <Button icon="pi pi-check" label="Publish" type="submit"/>

        <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em"
                @click="clearContent"
        />
      </div>
    </form>
    </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import {ref} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
})

let localProps = ref({...props});

/*const title = ref("");
const content = ref("");*/
// eslint-disable-next-line no-undef


/*const publishPost = async () => {

  const postPublished = await postService.create({Title: title.value, Content: content.value}, userStore.state.jwt);
  props.refPosts.value.unshift(postPublished)

  await clearContent();
}*/

const clearContent = async (localProps) => {
  localProps.title = "";
  localProps.content = "";
}
</script>

<style scoped>
.MainView {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

#container {
  margin: 1em 20em 5em 20em;
}

#createPost {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  padding: 1em;
}
</style>