<template>
  <div class="text-center pb-8"> Groups</div>
  <div class="flex">
    <div class="p-8"></div>
    <div class="flex-1"> Group search
      <div>List/Result of group
        <Listbox v-model="selectedGroups" :options="allGroups" :multiple="false" :filter="true" optionLabel="name"
                 listStyle="max-height:250px" style="width:15rem" filterPlaceholder="Search" @click="goToGroup">
          <template #optiongroup="slotProps">
            <div class="flex align-items-center country-item">
              <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="18" class="mr-2"/>
              <div>{{ slotProps.option.label }}</div>
            </div>
          </template>
        </Listbox>
      </div>
    </div>
    <div class="flex-1">
      <div>
        <div class="MainView">
        <MainThread
            v-for="(item) in refPosts"
            :post="item"
            :key="item.id"
        ></MainThread>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <Button label="create" icon="pi pi-plus" class="p-button-text" @click="openResponsiveCreate"/>
      <Dialog header="Create group" v-model:visible="displayResponsiveCreate"
              :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
        <div class="flex flex flex-column gap-5 align-items-center">
          <div class="flex-1">
            <InputText v-model="groupCreateInfos.Name" placeholder="Group name"/>
          </div>
          <div class="flex-1">
            <InputText v-model="groupCreateInfos.Description" placeholder="Group description"/>
          </div>
          <div class="flex-1">
            <input type="file" @change="onFileChanged">
          </div>
          <div class="flex-1">
            <Button label="Create" icon="pi pi-check" class="p-button-text" @click="createGroup"/>
            <Button label="Cancel" icon="pi pi-times" @click="closeResponsiveCreate" class="p-button-text"/>
            <Toast />
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">

import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import {ref} from "vue";
import GroupService from "@/api/services/GroupService";
import userStore from "@/store/user";
import Listbox from "primevue/listbox";
import router from '@/router';
import accountService from "@/api/services/AccountService";
import {Post} from "@/api/types/Post";
import MainThread from "@/components/MainThread/MainThread.vue";
import {useToast} from "primevue/usetoast";
import Toast from "primevue/toast";
const groupCreateInfos = ref({
  Name: '',
  Description: ''
});
const toast = useToast();

const selectedFile = ref<File>();
const allGroups = ref([
  {
    name: 'Group 1',
    code: 'Group 1'
  },
  {
    name: 'Group 2',
    code: 'Group 2'
  },
  {
    name: 'Group 3',
    code: 'Group 3'
  },
  {
    name: 'Group 4',
    code: 'Group 4'
  }]);
const selectedGroups = ref();


const onFileChanged = (event: Event) => {
  const file = (event.target as HTMLInputElement).files[0];
  selectedFile.value = file;
};

const showSuccess = () => {
  toast.add({severity:'success', summary: 'Success', detail:'Changes saved', life: 3000});
}
const getAllGroups = async () => {
  var groups = await GroupService.getAll(userStore.state.jwt);
  allGroups.value = [];
  groups.forEach(group => {
    allGroups.value.push({name: group.name, code: group.id});
  });
  console.log(groups);
  //allGroups.value = groups;
}
await getAllGroups();
const displayResponsiveCreate = ref(false);
const openResponsiveCreate = () => {
  displayResponsiveCreate.value = true;
};
const closeResponsiveCreate = () => {
  displayResponsiveCreate.value = false;
  groupCreateInfos.value = {
    Name: '',
    Description: ''
  };
};

const goToGroup = () => {
  router.push({name: "group", params: {id: selectedGroups.value.code}});
}

const createGroup = async () => {
  console.log(groupCreateInfos.value);
  console.log(selectedFile.value.name)
  var createdGroup = await GroupService.create(selectedFile.value, userStore.state.jwt,groupCreateInfos.value.Name, groupCreateInfos.value.Description);
  console.log(createdGroup);
  if (createdGroup < 300) {
    showSuccess();
  }
};


const refPosts = ref([])


const posts: Post[] = await accountService.getCurrentPostFromGroups(userStore.state.jwt);
console.log(posts);


refPosts.value = posts;

</script>

<style scoped>
.MainView {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}
</style>r