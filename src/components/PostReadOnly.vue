<template>
  <div class="container">
    <Card>
      <template #title>
        <p>{{ post.title }}</p>
      </template>
      <template #content>
        <div class="flex">
          <UserIconComponent/>
          <p>{{ post.content }}</p>
        </div>
      </template>
      <template #footer>
        <Button icon="pi pi-heart" class="p-button-text" label="Like" disabled="disabled"/>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import UserIconComponent from "@/components/UserIconComponent.vue";
import Button from "primevue/button";

</script>

<script lang="ts">
export default {
  props: ['post'],
  inheritAttrs: false
}
</script>
<style scoped>

</style>