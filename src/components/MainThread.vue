<template>
  <div class="container">
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
        <Button icon="pi pi-comment" class="p-button-text" label="Commenter" disabled="disabled" @click/>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import router from '@/router';

export default{
  props: ['post'],
  name: "MainThread",
  components: {
    Button,
    Card,
  },
  Methods: {
    comment() {
      router.push({name:"home"})
    }
  }
}
</script>

<style scoped>
.container {
  margin: 1em;
}

#userIcon {
  width: 3em;
  height: 3em;
  margin-right: 1em;
  border-radius: 50%;
}
</style>