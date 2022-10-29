<template>
  <div id="container" class="MainView">
    <form id=createPost
          @submit="$emit('publishPost',localProps.title,localProps.content,checked? userStore.state.codeType : '',checked?userStore.state.codeInput : ''); clearContent(localProps);clear(codeContent) ">

      <div class="flex flex-row">
        <div class="flex flex-1 flex-col">
      <Textarea id="content" v-model="localProps.content" :autoResize="true" cols="30" maxlength="4000"
                placeholder="Quoi de neuf ?"
                required="true" rows="5"/>
          <div class="flex flex-row">
            <Button class="flex w-4" icon="pi pi-check" label="Publier" type="submit"/>
            <div class="field-checkbox">
              <Checkbox v-model="checked" :binary="true" inputId="binary"/>
              <label for="binary">Envoyer le code</label>
            </div>
          </div>
        </div>
        <!--        <div class="flex flex-1 flex-col">-->
        <!--        <Textarea id="content" v-model="userStore.state.codeType" :autoResize="true" rows="5" cols="30"-->
        <!--                  maxlength="4000"-->
        <!--                  placeholder="Insert ton code !" required="true" @change="printBoth()"/>-->
        <!--          <Dropdown class="flex w-6" v-model="selectedLanguage" :options="languages" optionLabel="name" optionValue="code"-->
        <!--                    placeholder="Select language"/>-->
        <!--        </div>-->
      </div>


    </form>
  </div>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import {ref} from "vue";
//import Dropdown from "primevue/dropdown";
import userStore from "@/store/user"
import Checkbox from 'primevue/checkbox';
// eslint-disable-next-line no-undef
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
})
//const selectedLanguage = ref();
let localProps = ref({...props});
const checked = ref(false);

const clearContent = async (localProps) => {
  localProps.content = "";
}

const clear = async (codeContent: string) => {
  console.log(codeContent)
  codeContent = "";
  console.log(codeContent)
}

// const languages = ref([
//   {name: 'Python', code: 'python'},
//   {name: 'C     ', code: 'c'}
// ]);

let codeContent = ref();
codeContent = userStore.state.codeInput
// const printBoth = () => {
//   console.log(codeContent)
//   console.log(userStore.state.codeInput)}
</script>

<style scoped>
.MainView {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

#container {
  margin: 1em 20em 5em 20em;
}

#createPost {
  padding: 1em;
}
</style>