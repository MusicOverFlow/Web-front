<template>
  <div>
    <Card>
      <template #header>
        <img src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png"
             style="height: 300px;width: 300px"/>
      </template>
      <template #title>
        {{ post.name }}
        Advanced Card
      </template>
      <template #subtitle>
        Card subtitle
      </template>
      <template #content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
          numquam deserunt
          quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
          quas!</p>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Save"/>
        <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em"/>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";


export default{
  props: ['post'],
  name: "MainThread",
  components: {
    Button,
    Card,
  }
}
</script>

<style scoped>

</style>