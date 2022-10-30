<!--<template>
  <NavbarComponent/>
  <div id="container">
    <div class="align-items-center justify-content-center">
      <div v-if="refPosts" id="createComment">
        <UserIconComponent/>
        <Textarea v-model="value" :autoResize="true" cols="100" maxlength="400" placeholder="Rédigez votre réponse"
                  rows="3"/>
        <Button class="p-button" icon="pi pi-send" label="Commenter" @click="publishComment"/>
      </div>
      <div>
        <PostReadOnly
            v-for="(item) in refPosts"
            :key="item.id"
            :post="item">

        </PostReadOnly>
      </div>
      <div v-if="refPosts" class="m-2">
        <CommentComponent
            v-for="(item) in refPosts[0].commentaries"
            :key="item.id"
            :comment="item">

        </CommentComponent>
      </div>

    </div>
  </div>
</template>-->

<template>
  <div id="main" class="flex">
    <div id="navbar">
      <NavbarComponent/>
    </div>
    <div id="commentThread">
      <div>
        <i class="pi pi-arrow-left" id="goBack" @click="$router.go(-1)" style="font-size: 1.5rem; color: #3b97ff"></i>
      </div>
      <PostReadOnly
          v-for="(item) in refPosts"
          :key="item.id"
          :post="item"/>

      <div>
        <CreateComment @publishComment="publishComment"></CreateComment>
      </div>

      <div id="container" class="PostView">
        <div id="PostView">
          <PostReadOnly
              v-for="(item) in refPosts[0].commentaries"
              :key="item.id"
              :post="item"/>
        </div>
      </div>
    </div>
    <div id="ide">
      <CodeInputComponent>

      </CodeInputComponent>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {defineProps, onMounted, ref} from 'vue'
import postService from "@/api/services/PostService";
import userStore from "@/store/user";
import PostReadOnly from "@/components/PostReadOnly.vue";
import commentService from "@/api/services/CommentService";
import NavbarComponent from "@/components/Navbar";
import CodeInputComponent from "@/components/codeInput/CodeInputComponent.vue";
import CreateComment from "@/components/CreateComment/CreateComment.vue";
import {Post} from "@/api/types/Post";

const emptyPost: Post = {
  id: "0",
  content: "",
  scriptLanguage: "",
  script: "",
  commentaries: [],
  title: '',
  createdAt: '',
  owner: {
    mailAddress: "",
    firstname: "",
    lastname: "",
    pseudonym: "",
    picUrl: "",
    createdAt: "",
    follows: undefined,
  },
  group: undefined,
  likes: [],
  likesCount: 0
}

const refPosts = ref([emptyPost])
const props = defineProps({
  id: String,
});

const value = ref(null)

onMounted(async () => {
  console.log("prop : " + props.id)
  refPosts.value = await postService.getById(props.id, userStore.state.jwt);
  console.log(refPosts.value)
  // refPosts.value = refPosts.value.
  console.log("pouet")
  console.log(refPosts.value[0].commentaries)
})

const publishComment = async (title, content) => {
  console.log("publishComment")
  console.log(value.value)
  const comment = await commentService.create(content, props.id, userStore.state.jwt)
  if (comment.id != null) {
    refPosts.value[0].commentaries.push(comment.commentaries[comment.commentaries.length - 1])
  }
  console.log(comment)

}

</script>
<style scoped>
#container {
  margin: 1em 20em 5em 20em;
}

#createComment {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  padding: 1em;
}

#navbar {
  flex: 1;
  overflow: hidden;
}

#commentThread {
  flex: 4;
  overflow: auto;
}

#ide {
  flex: 4;
  overflow: hidden;
}

#main {
  height: 100vh;
  width: 100vw;
}


#PostView {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

#container {
  margin: 1em;
}

#goBack {
  margin-top: 0.25em;
  cursor: pointer;
}
</style>