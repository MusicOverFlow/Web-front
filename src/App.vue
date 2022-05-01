<template>
  <NavbarComponent/>
  <div id="app">
    <router-view/>
  </div>
  <FooterComponent/>
</template>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}*/
</style>
<script>
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";
export default {
  components: {FooterComponent, NavbarComponent}
}
</script>