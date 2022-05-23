<template>
  <div class="container">
    <Card>
      <template #content>
        <div class="flex">
          <UserIconComponent/>
          <p>Title 1 : {{ $props.post
            }}</p>
        </div>
      </template>
      <template #footer>
        <Button icon="pi pi-heart" class="p-button-text" label="Like" disabled="disabled"/>
       <!-- <Button icon="pi pi-comment" class="p-button-text" label="Commenter" @click="comment"/> -->
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import UserIconComponent from "@/components/UserIconComponent.vue";
//import router from '@/router';
//import UserIconComponent from "@/components/UserIconComponent.vue";

export default{
  props: ['post'],
  name: "MainThread",
  inheritAttrs: false,
  components: {
    UserIconComponent,
    Button,
    Card,
  }/*,
  methods: {
    comment() {
      console.log("comment");
      router.push({name:"post"})
    }
  }*/
}

</script>

<style scoped>
.container {
  margin: 1em;
}
</style>