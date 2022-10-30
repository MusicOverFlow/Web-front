<template>
  <!--  <Toast />
    <div id="profil" style="background-color: #aaaaaa" class="flex-auto m-10 col-start-1">
    </div>-->
  <div id="main" class="flex">
    <div id="navbar">
      <NavbarComponent/>
    </div>
    <div id="pipeline">
      <PipelineComponent/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavbarComponent from "@/components/Navbar";
import PipelineComponent from "@/components/PipelineComponents/PipelineComponent.vue";
</script>

<style>
#main {
  height: 100vh;
  width: 100vw;
}

#navbar {
  flex: 1;
  overflow: hidden;
}

#pipeline {
  flex: 8;
}
</style>
