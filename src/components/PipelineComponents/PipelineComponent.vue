<template>
  <div id="mainDiv">
    <div id="headline">
      <div id="allwaysDisplayed">
        <h1>{{ headingSentence }}</h1>
        <input type="file" @change="onFileChanged">
      </div>
      <div v-if="isPicture()" class="contextuallyDisplayed">
        <img :src="getImage()" alt="Image" width="200"/>
        <Button class="p-button"
                icon="pi pi-download"
                label="Télécharger l'image modifiée"
                :disabled="checkedImageOptions.length === 0"
                @click="downloadPicture"/>
      </div>
      <div v-if="isAudio()" class="contextuallyDisplayed">
        <Button class="p-button"
                icon="pi pi-download"
                label="Télécharger le son modifié"
                :disabled="checkedAudioOptions.length === 0"
                @click="downloadAudio"/>
      </div>
    </div>
    <div id="content">
      <div v-if="isPicture()" class="optionList">
        <label class="optionSelect" for="grayscale">
          <img alt="grayscale" class="optionIllustration" src="@/assets/grayscale.png"/>
          <p>Noir et blanc</p>
          <input
              id="grayscale"
              v-model="checkedImageOptions"
              class="optionCheckbox"
              type="checkbox"
              value="Grayscale"
              @click="imageOptionChecked('Grayscale')">
        </label>
        <label class="optionSelect" for="invert">
          <img alt="invert" class="optionIllustration" src="@/assets/invert.png"/>
          <p>Inversion des couleurs</p>
          <input
              id="invert"
              v-model="checkedImageOptions"
              class="optionCheckbox"
              type="checkbox"
              value="Invert"
              @click="imageOptionChecked('Invert')">
        </label>
        <label class="optionSelect" for="blur">
          <img alt="blur" class="optionIllustration" src="@/assets/blur.jpg"/>
          <p>Flou</p>
          <input
              id="blur"
              v-model="checkedImageOptions"
              class="optionCheckbox"
              type="checkbox"
              value="Blur"
              @click="imageOptionChecked('Blur')">
        </label>
        <label class="optionSelect" for="flipHorizontal">
          <img alt="flipHorizontal" class="optionIllustration" src="@/assets/flip_horizontal.png"/>
          <p>Inversion horizontale</p>
          <input
              id="flipHorizontal"
              v-model="checkedImageOptions"
              class="optionCheckbox"
              type="checkbox"
              value="FlipHorizontal"
              @click="imageOptionChecked('FlipHorizontal')">
        </label>
        <label class="optionSelect" for="flipVertical">
          <img alt="flipVertical" class="optionIllustration" src="@/assets/flip_vertical.png"/>
          <p>Inversion verticale</p>
          <input
              id="flipVertical"
              v-model="checkedImageOptions"
              class="optionCheckbox"
              type="checkbox"
              value="FlipVertical"
              @click="imageOptionChecked('FlipVertical')">
        </label>
        <label class="optionSelect" for="rotate">
          <img alt="rotate" class="optionIllustration" src="@/assets/rotate.png"/>
          <p>Rotation</p>
          <input
              id="rotate"
              v-model="checkedImageOptions"
              class="optionCheckbox"
              type="checkbox"
              value="Rotate-90"
              @click="imageOptionChecked('Rotate-90')">
        </label>
        <label class="optionSelect" for="upSize">
          <img alt="upSize" class="optionIllustration" src="@/assets/stonks.png"/>
          <p>Augmentation de la taille</p>
          <input
              id="upSize"
              v-model="checkedImageOptions"
              class="optionCheckbox"
              type="checkbox"
              value="Resize-200"
              @click="imageOptionChecked('Resize-200')">
        </label>
        <label class="optionSelect" for="downSize">
          <img alt="downSize" class="optionIllustration" src="@/assets/stinks.jpg"/>
          <p>Diminution de la taille</p>
          <input
              id="downSize"
              v-model="checkedImageOptions"
              class="optionCheckbox"
              type="checkbox"
              value="Resize-050"
              @click="imageOptionChecked('Resize-050')">
        </label>
      </div>
      <div v-if="isAudio()" class="optionList">
        <label class="optionSelect" for="downPitch">
          <img alt="downPitch" class="optionIllustration" src="@/assets/down-arrow.png"/>
          <p>Diminuer le ton</p>
          <input
              id="downPitch"
              v-model="checkedAudioOptions"
              class="optionCheckbox"
              type="checkbox"
              value="Pitch-0,75"
              @click="audioOptionChecked('Pitch-0,75')">
        </label>
        <label class="optionSelect" for="upPitch">
          <img alt="upPitch" class="optionIllustration" src="@/assets/down-arrow.png"/>
          <p>Augmenter le ton</p>
          <input
              id="upPitch"
              v-model="checkedAudioOptions"
              class="optionCheckbox"
              type="checkbox"
              value="Pitch-1,25"
              @click="audioOptionChecked('Pitch-1,25')">
        </label>
        <label class="optionSelect" for="fadeIn">
          <img alt="fadeIn" class="optionIllustration" src="@/assets/down-arrow.png"/>
          <p>Augmentation progressive au début</p>
          <input
              id="fadeIn"
              v-model="checkedAudioOptions"
              class="optionCheckbox"
              type="checkbox"
              value="FadeIn-3"
              @click="audioOptionChecked('FadeIn-3')">
        </label>
        <label class="optionSelect" for="fadeIn">
          <img alt="fadeIn" class="optionIllustration" src="@/assets/down-arrow.png"/>
          <p>Diminution progressive à la fin</p>
          <input
              id="fadeIn"
              v-model="checkedAudioOptions"
              class="optionCheckbox"
              type="checkbox"
              value="FadeOut-3"
              @click="audioOptionChecked('FadeOut-3')">
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
  if (isPicture()) {
    getImage();
  }
  headingSentence.value = "Choisissez les options que vous souhaitez appliquer ou changez de fichier";
  checkedImageOptions = ref([])
  checkedAudioOptions = ref([])
};

const imageOptionChecked = (option: String) => {
  if(checkedImageOptions.value.includes(option)) {
    checkedImageOptions.value = checkedImageOptions.value.filter((value) => value !== option);
  } else {
    checkedImageOptions.value.push(option);
  }
}

const audioOptionChecked = (option: String) => {
  if(checkedAudioOptions.value.includes(option)) {
    checkedAudioOptions.value = checkedAudioOptions.value.filter((value) => value !== option);
  } else {
    checkedAudioOptions.value.push(option);
  }
}

const downloadPicture = async () => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('scripts', checkedImageOptions.value.join('.'));
    formData.append('fileInput', selectedFile.value);
    const response = await pipelineService.imagePipeline(formData, userStore.state.jwt);
    if (response.output) {
      window.open("data:image/jpg;base64," + response.output);
    }
  }
}

const downloadAudio = async () => {
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

input[type=checkbox] {
  /* Double-sized Checkboxes */
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  padding: 10px;
}
</style>