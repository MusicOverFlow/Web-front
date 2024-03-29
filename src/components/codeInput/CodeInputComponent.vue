<template>
  <div id="app">

    <div class="flex flex-col my-4">
      <div id="editor" class="flex-1">
        <Panel v-if="isLiveCoding === true" :toggleable="true" header="Session ID">
          <template #icons>
            <button class="pi pi-copy mr-2" @click="copy"/>
          </template>
          <p>{{ userStore.state.connection }}</p>
        </Panel>
        <v-ace-editor
            v-model:value="content"
            :lang=selectedLanguage
            :theme=selectedTheme
            style="height: 300px"
            @change="editorChange"
            @init="editorInit"
        />
      </div>
      <div id="run" class="flex-1 pr-10  flex-row flex-none mb-4">
        <Dropdown v-model="selectedLanguage" :options="languages" optionLabel="name" optionValue="code"
                  placeholder="Langage"/>
        <Dropdown v-model="selectedTheme" :options="themes" optionLabel="name" optionValue="code"
                  placeholder="Select theme"/>

        <Button class="p-button-info" icon="pi pi-play" label="Exécuter" @click="run"/>
      </div>
      <div id="output" class="flex-1 flex-grow">

        <Panel header="Résultat">
          <p>{{ result }}</p>
        </Panel>

      </div>
    </div>
  </div>
</template>


<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';
import {VAceEditor} from 'vue3-ace-editor';
import Button from "primevue/button";
//import { useSignalR } from '@dreamonkey/vue-signalr';
import userStore from "@/store/user"
import connection from "@/main";

import {ref} from 'vue';
import CodeExecutionService from "@/api/services/CodeExecutionService";
import {useRoute} from "vue-router";

const result = ref('');
let selectedLanguage = ref();
let content = ref();

let isLiveCoding = ref(false);
userStore.state.codeInput = content;
userStore.state.codeType = selectedLanguage;

if(useRoute().name == "ide") {
  isLiveCoding.value = true;
}

const copy = () => {
  navigator.clipboard.writeText(userStore.state.connection);
}

const params = useRoute().params as { id: string };

if (params.id == "new") {
  params.id = null
}

if(useRoute().name != "post") {

  connection.invoke("JoinGroup", params.id).then(r => {
    if (params.id) {
      userStore.state.connection = params.id
      content.value = r
    } else {
      userStore.state.connection = r
    }
  }).catch(function (err) {
    return console.error(err.toString());
  });
}

const editorChange = (e) => {
  onChangeSignalR();
  //content.value = e;
}
const languages = ref([
  {name: 'Python', code: 'python'},
  {name: 'C         ', code: 'c'}
]);

const onChangeSignalR = () => {
  console.log(userStore.state.connection)
  connection.invoke('UpdateContent', userStore.state.connection, content.value).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  });
}

connection.on('ReceiveContent', (message) => {
  if (message != content.value) {
    content.value = message
  }
  console.log(message);
});

connection.on('Execute', () => runCommandFromServer())
connection.on('ReceiveContent', (message) => content.value = message)

// Does not call back the server to avoid the execution loop
const runCommandFromServer = async () => {
  const resultCode = await CodeExecutionService.execute(content.value, selectedLanguage.value);
  result.value = resultCode.data.toString();
}

const run = async () => {
  const resultCode = await CodeExecutionService.execute(content.value, selectedLanguage.value);
  result.value = resultCode.data.toString();
  await connection.invoke('RunCode', userStore.state.connection)
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