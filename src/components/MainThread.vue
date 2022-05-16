<template>
  <div class="container">
    <Card>
      <template #content>
        <div class="flex">
          <UserIconComponent/>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
            numquam deserunt
            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!</p>
        </div>
      </template>
      <template #footer>
        <Button icon="pi pi-heart" class="p-button-text" label="Like" disabled="disabled"/>
        <Button icon="pi pi-comment" class="p-button-text" label="Commenter" @click="comment"/>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import router from '@/router';
import UserIconComponent from "@/components/UserIconComponent.vue";

export default{
  props: ['post'],
  name: "MainThread",
  components: {
    UserIconComponent,
    Button,
    Card,
  },
  methods: {
    comment() {
      console.log("comment");
      router.push({name:"post"})
    }
  }
}
</script>

<style scoped>
.container {
  margin: 1em;
}
</style>