<template>
  <div class="SearchView" style="margin-top: 2em">
    <InputText
        v-model="searched"
        @keydown.enter="search"
        placeholder="Rechercher"
        style="width: 50%"
    />
  </div>
  <div id="container">
    <div class="SearchView">
      <SearchThread
          v-for="(item) in refUsers"
          :key="item.mailAddress"
          :user="item"
          style="width: 50%"
      />
      <div v-if="refUsers.length === 0">
        <p>Aucun résultat</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import InputText from "primevue/inputtext";
import searchService from "@/api/services/SearchService";
import userStore from "@/store/user"
import SearchThread from "@/components/SearchThread/SearchThread.vue";

const refUsers = ref([])

const searched = ref("")

const search = async () => {
  const users = await searchService.search(searched.value, userStore.state.jwt);
  console.log(users)
  refUsers.value = users;
  console.log(refUsers.value);
}

</script>
<style scoped>
.SearchView {
  gap: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

SearchThread {
  width: 100%;
}

#container {
  margin: 1em;
}
</style>