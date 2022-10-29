<template>
  <div id="mainDiv">
    <div id="headline">
      <div id="allwaysDisplayed">
        <h1>{{headingSentence}}</h1>
        <input type="file" @change="onFileChanged">
      </div>
      <div class="contextuallyDisplayed" v-if="isPicture()">
        <img :src="getImage()" alt="Image" width="200"/>
        <Button label="Télécharger l'image modifiée"
                icon="pi pi-download"
                class="p-button"
                @click="downloadPicture"/>
      </div>
      <div class="contextuallyDisplayed" v-if="isAudio()">
        <Button label="Télécharger le son modifié"
                icon="pi pi-download"
                class="p-button"
                @click="downloadAudio"/>
      </div>
    </div>
    <div id="content">
      <div class="optionList" v-if="isPicture()">
          <label class="optionSelect" for="grayscale">
            <img class="optionIllustration" src="@/assets/grayscale.png" alt="grayscale"/>
            <p>Noir et blanc</p>
            <input
                type="checkbox"
                id="grayscale"
                class="optionCheckbox"
                value="Grayscale"
                v-model="checkedImageOptions">
          </label>
          <label class="optionSelect" for="invert">
            <img class="optionIllustration" src="@/assets/invert.png" alt="invert"/>
            <p>Inversion des couleurs</p>
            <input
                type="checkbox"
                id="invert"
                class="optionCheckbox"
                value="Invert"
                v-model="checkedImageOptions">
          </label>
          <label class="optionSelect" for="blur">
            <img class="optionIllustration" src="@/assets/blur.jpg" alt="blur"/>
            <p>Flou</p>
            <input
                type="checkbox"
                id="blur"
                class="optionCheckbox"
                value="Blur"
                v-model="checkedImageOptions">
          </label>
          <label class="optionSelect" for="flipHorizontal">
            <img class="optionIllustration" src="@/assets/flip_horizontal.png" alt="flipHorizontal"/>
            <p>Inversion horizontale</p>
            <input
                type="checkbox"
                id="flipHorizontal"
                class="optionCheckbox"
                value="FlipHorizontal"
                v-model="checkedImageOptions">
          </label>
          <label class="optionSelect" for="flipVertical">
            <img class="optionIllustration" src="@/assets/flip_vertical.png" alt="flipVertical"/>
            <p>Inversion verticale</p>
            <input
                type="checkbox"
                id="flipVertical"
                class="optionCheckbox"
                value="FlipVertical"
                v-model="checkedImageOptions">
          </label>
          <label class="optionSelect" for="rotate">
            <img class="optionIllustration" src="@/assets/rotate.png" alt="rotate"/>
            <p>Rotation</p>
            <input
                type="checkbox"
                id="rotate"
                class="optionCheckbox"
                value="Rotate-90"
                v-model="checkedImageOptions">
          </label>
          <label class="optionSelect" for="upSize">
            <img class="optionIllustration" src="@/assets/stonks.png" alt="upSize"/>
            <p>Augmentation de la taille</p>
            <input
                type="checkbox"
                id="upSize"
                class="optionCheckbox"
                value="Resize-200"
                v-model="checkedImageOptions">
          </label>
          <label class="optionSelect" for="downSize">
            <img class="optionIllustration" src="@/assets/stinks.jpg" alt="downSize"/>
            <p>Diminution de la taille</p>
            <input
                type="checkbox"
                id="downSize"
                class="optionCheckbox"
                value="Resize-050"
                v-model="checkedImageOptions">
          </label>
      </div>
      <div class="optionList" v-if="isAudio()">
          <label class="optionSelect" for="downPitch">
            <img class="optionIllustration" src="@/assets/down-arrow.png" alt="downPitch"/>
            <p>Diminuer le ton</p>
            <input
                type="checkbox"
                id="downPitch"
                class="optionCheckbox"
                value="Pitch-0,75"
                v-model="checkedAudioOptions">
          </label>
          <label class="optionSelect" for="upPitch">
            <img class="optionIllustration" src="@/assets/down-arrow.png" alt="upPitch"/>
            <p>Augmenter le ton</p>
            <input
                type="checkbox"
                id="upPitch"
                class="optionCheckbox"
                value="Pitch-1,25"
                v-model="checkedAudioOptions">
          </label>
          <label class="optionSelect" for="fadeIn">
            <img class="optionIllustration" src="@/assets/down-arrow.png" alt="fadeIn"/>
            <p>Augmentation progressive au début</p>
            <input
                type="checkbox"
                id="fadeIn"
                class="optionCheckbox"
                value="FadeIn-3"
                v-model="checkedAudioOptions">
          </label>
          <label class="optionSelect" for="fadeIn">
            <img class="optionIllustration" src="@/assets/down-arrow.png" alt="fadeIn"/>
            <p>Diminution progressive à la fin</p>
            <input
                type="checkbox"
                id="fadeIn"
                class="optionCheckbox"
                value="FadeOut-3"
                v-model="checkedAudioOptions">
          </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Button from "primevue/button";
import pipelineService from "@/api/services/PipelineService";
import userStore from "@/store/user";

const selectedFile = ref<File>();
let checkedImageOptions = ref([]);
let checkedAudioOptions = ref([]);
let headingSentence = ref("Choisissez le fichier que vous souhaitez modifier");

const isPicture = () => {
  if (selectedFile.value) {
    return selectedFile.value.type.startsWith('image');
  }
  return false;
};

const isAudio = () => {
  if (selectedFile.value) {
    return selectedFile.value.type.startsWith('audio');
  }
  return false;
};

const getImage = () => {
  if (selectedFile.value) {
    return URL.createObjectURL(selectedFile.value);
  }
  return '';
};

const onFileChanged = (event: Event) => {
  selectedFile.value = (event.target as HTMLInputElement).files[0];
  if(isPicture()){
    getImage();
  }
  headingSentence.value = "Choisissez les options que vous souhaitez appliquer ou changez de fichier";
  checkedImageOptions = ref([])
  checkedAudioOptions = ref([])
};

const downloadPicture = async() => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('scripts', checkedImageOptions.value.join('.'));
    formData.append('fileInput', selectedFile.value);
    const response = await pipelineService.imagePipeline(formData, userStore.state.jwt);
    if (response.output) {
      window.open(response.output);
    }
  }
}

const downloadAudio = async() => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('scripts', checkedAudioOptions.value.join('.'));
    formData.append('fileInput', selectedFile.value);
    const response = await pipelineService.audioPipeline(formData, userStore.state.jwt);
    if (response.output) {
      window.open(response.output);
    }
  }
}

</script>

<style scoped>
h1 {
  font-size: 2em;
}
#mainDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#mainDiv > input {
  flex: 1;
}

#headline {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 20%;
}

#allwaysDisplayed {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  gap: 1em;
}

.contextuallyDisplayed {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 2;
  gap: 1em;
}

#content {
  flex: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#content > div > img {
  flex: 1;
}

.optionList {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.optionSelect {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  width: 30%;
  text-align: center;
}

.optionSelect:hover {
  transition: 0.5s;
  background: rgba(59, 151, 255, 0.25);
  border-radius: 10px;
}

.optionSelect > p {
  padding: 0.5em;
}

.optionIllustration {
  width: 100px;
  height: 100px;
}
input[type=checkbox]
{
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  padding: 10px;
}
</style>