<template>
  <NavbarComponent/>
  <div id="app">
    <router-view/>
  </div>
  <FooterComponent/>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";
export default {
  components: {
    FooterComponent,
    NavbarComponent
  }
}
</script>