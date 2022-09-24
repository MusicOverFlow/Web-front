<template>
  <div class="MainView" id="container">
    <form id=createPost
          @submit="$emit('publishPost',localProps.title,localProps.content); clearContent(localProps) ">
      <Textarea id="content" v-model="localProps.content" :autoResize="true" rows="5" cols="50" maxlength="400"
                placeholder="Quoi de neuf ?" required="true"/>
      <div class="col-start-1">
        <Button icon="pi pi-check" label="Publier" type="submit"/>

<!--        <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em"
                @click="clearContent"
        />-->
      </div>
    </form>
    </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import {ref} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
})

let localProps = ref({...props});

const clearContent = async (localProps) => {
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
  padding: 1em;
}
</style>