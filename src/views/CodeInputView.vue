<template>
  <div>
    <CodeInputComponent :props="id">

    </CodeInputComponent>
  </div>
</template>

<script lang="ts">
import userStore from "@/store/user"
import CodeInputComponent from "@/components/codeInput/CodeInputComponent.vue";
export default {
  components: {CodeInputComponent},
  setup(){
    return(userStore)
  },
  props: {
    id: String,
  },

  inheritAttrs: false,

}
</script>

<style scoped>

</style>