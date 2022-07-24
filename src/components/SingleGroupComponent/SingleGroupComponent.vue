<template>
  <div class="flex">
    <div class=" flex 1">
      <Image :src="refGroup.picUrl" alt="Image" width="250"
        preview/>
    </div>
    <div class="flex-1 card">
      <TabView class="tabview-custom" ref="tabview4">
        <TabPanel>
          <template #header>
            <i class="pi pi-calendar"></i>
            <span>About</span>
          </template>
          <textarea class="form-control" v-model="refGroup.description"></textarea>
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>Main Group thread</span>
            <i class="pi pi-user"></i>
          </template>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
        </TabPanel>
      </TabView>
    </div>
    <div class="flex-1 ">
      <Button label="join" icon="pi pi-user-plus" class="p-button-text" @click="join"/>
      <Button label="leave" icon="pi pi-user-minus" class="p-button-text" @click="leave"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import {defineProps, ref} from "vue";
import userStore from "@/store/user";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import groupService from "@/api/services/GroupService";
import Image from "primevue/image";

const refGroup = ref()
const props = defineProps({
  id: String,
});

const getGroup = async () => {
  refGroup.value = await groupService.getById(userStore.state.jwt, props.id);
  console.log(refGroup.value.picUrl);
  console.log(refGroup.value)
}
await getGroup();
console.log(refGroup.value)

const join = async () => {
 var resJoin = await groupService.join(refGroup.value.id, userStore.state.jwt);
  console.log(resJoin);
}
const leave = async () => {
  var resLeave = await groupService.leave(refGroup.value.id, userStore.state.jwt);
  console.log(resLeave);
}


</script>

<!--<script lang="ts">

//import Button from "primevue/button";
/*import Card from "primevue/card";
import UserIconComponent from "@/components/UserIconComponent.vue";*/
//import router from '@/router';
//import accountService from "@/api/services/AccountService";
/*import userStore from "@/store/user";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import groupService from "@/api/services/GroupService";
export default{
  props: ['group'],
  name: "SingleGroupComponent",
  inheritAttrs: false,
  components: {
    //UserIconComponent,
    TabView,
    TabPanel,
    Button,
    //Card,
  },
  methods: {
    async join() {
      const joinResponse = await groupService.join(this.$props.group.id, userStore.state.jwt)
      console.log(joinResponse)
    },
    async leave() {
      const leaveResponse = await groupService.leave(this.$props.group.id, userStore.state.jwt)
      console.log(leaveResponse)
    }
  }
  }
*/
</script>-->



<style scoped>
.container {
  margin: 1em;
}
</style>