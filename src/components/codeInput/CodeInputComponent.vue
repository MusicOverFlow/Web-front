<template>
  <div id="app">

    <div class="flex">
      <div id="editor" class="flex-1">
        <v-ace-editor
            v-model:value="content"
            @init="editorInit"
            :lang=selectedLanguage
            :theme=selectedTheme
            style="height: 300px"
        />
      </div>
      <div id="run" class="flex-1 pl-10 pr-10 flex-col flex-none">
        <Dropdown v-model="selectedLanguage" :options="languages" optionLabel="name" optionValue="code"
                  placeholder="Select language"/>
        <Dropdown v-model="selectedTheme" :options="themes" optionLabel="name" optionValue="code"
                  placeholder="Select theme"/>

        <Button label="Run" @click="run" icon="pi pi-play" class="p-button-text"/>
      </div>
      <div id="output" class="flex-1 flex-grow">
        <v-ace-editor
            v-model:value="result"
            @init="editorInit"
            :lang=selectedLanguage
            :theme=selectedTheme
            style="height: 300px"
            readonly
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import {VAceEditor} from 'vue3-ace-editor';
import Button from "primevue/button";

import {ref} from 'vue';
import CodeExecutionService from "@/api/services/CodeExecutionService";
const result = ref('');
const selectedLanguage = ref();
let content = ref();
const languages = ref([
  {name: 'Python', code: 'python'},
  {name: 'C     ', code: 'c'}
]);

const run = async () => {
  const resultCode = await CodeExecutionService.execute(content.value, selectedLanguage.value);
  console.log(resultCode);
  console.log(resultCode.data);
  result.value = resultCode.data.toString();
  console.log(result.value);
}

const selectedTheme = ref('chrome');
const themes = ref([
  {name: 'Ambiance', code: 'ambiance'},
  {name: 'Chaos', code: 'chaos'},
  {name: 'Chrome', code: 'chrome'},
  {name: 'Cloud9 Day', code: 'cloud9_day'},
  {name: 'Cloud9 Night', code: 'cloud9_night'},
  {name: 'Cloud9 Night Low Color', code: 'cloud9_night_low_color'},
  {name: 'Clouds Midnight', code: 'clouds_midnight'},
  {name: 'Cobalt', code: 'cobalt'},
  {name: 'Crimson Editor', code: 'crimson_editor'},
  {name: 'Dawn', code: 'dawn'},
  {name: 'Dracula', code: 'dracula'},
  {name: 'Dreamweaver', code: 'dreamweaver'},
  {name: 'Eclipse', code: 'eclipse'},
  {name: 'Github', code: 'github'},
  {name: 'Gob', code: 'gob'},
  {name: 'Gruvbox', code: 'gruvbox'},
  {name: 'Gruvbox Dark Hard', code: 'gruvbox_dark_hard'},
  {name: 'Gruvbox Light Hard', code: 'gruvbox_light_hard'},
  {name: 'Idle Fingers', code: 'idle_fingers'},
  {name: 'Iplastic', code: 'iplastic'},
  {name: 'Katzenmilch', code: 'katzenmilch'},
  {name: 'Kr Theme', code: 'kr_theme'},
  {name: 'Kuroir', code: 'kuroir'},
  {name: 'Merbivore', code: 'merbivore'},
  {name: 'Merbivore Soft', code: 'merbivore_soft'},
  {name: 'Mono Industrial', code: 'mono_industrial'},
  {name: 'Monokai', code: 'monokai'},
  {name: 'Nord Dark', code: 'nord_dark'},
  {name: 'One Dark', code: 'one_dark'},
  {name: 'Pastel On Dark', code: 'pastel_on_dark'},
  {name: 'Solarized Dark', code: 'solarized_dark'},
  {name: 'Solarized Light', code: 'solarized_light'},
  {name: 'Sqlserver', code: 'sqlserver'},
  {name: 'Terminal', code: 'terminal'},
  {name: 'Textmate', code: 'textmate'},
  {name: 'Tomorrow', code: 'tomorrow'},
  {name: 'Tomorrow Night', code: 'tomorrow_night'},
  {name: 'Tomorrow Night Blue', code: 'tomorrow_night_blue'},
  {name: 'One Tomorrow Night Bright', code: 'tomorrow_night_bright'},
  {name: 'Tomorrow Night Eighties', code: 'tomorrow_night_eighties'},
  {name: 'Twilight', code: 'twilight'},
  {name: 'Vibrant Ink', code: 'vibrant_ink'},
  {name: 'Xcode', code: 'xcode'},
]);
const editorInit = () => {
  return "init";
}

</script>

<style scoped>
* {
  margin: 0;
}


#editor {
  height: 400px;
}


</style>