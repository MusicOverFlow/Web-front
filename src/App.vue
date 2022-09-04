<template>
  <div id="app">
    <router-view/>
  </div>
  <FooterComponent/>
</template>

<script>
import FooterComponent from "@/components/FooterComponent";
export default {
  components: {
    FooterComponent
  }
}
</script>