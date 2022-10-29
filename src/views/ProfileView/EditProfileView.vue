<template>
  <EditProfileComponent/>
</template>

<script lang="ts">
import userStore from "@/store/user"
import {defineAsyncComponent} from "vue";

export default {
  setup() {
    return (userStore)
  },
  props: {
    id: String,
  },
  inheritAttrs: false,
  components: {
    EditProfileComponent: defineAsyncComponent(() => import('../../components/ProfileComponent/EditComponent'))
  }
}
</script>


<style scoped>

</style>