<script lang="ts" setup>
import { ref, toRaw } from 'vue'
import { usePostsStore } from '../stores/PostsStore'

const stores = usePostsStore()
const postData = ref({})

function loadInitialData() {
  postData.value = structuredClone(toRaw(stores.currentPost))
}

loadInitialData()
</script>
<template>
  <div
    class="flex flex-col items-center fixed p-6 z-10 inset-0 w-full h-full bg-purple-300/75 scroll-"
  >
    <div
      class="gap-4 flex flex-col items-center bg-purple-400 rounded-xl w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-6"
    >
      <div class="flex justify-end w-full min-h-min">
        <button type="button" @click="stores.showPostDetails = false" class="">
          <span class="text-3xl">&times;</span>
        </button>
      </div>
      <img
        :src="postData.photos.pictureUrl"
        alt=""
        class="w-full aspect-square max-w-sm rounded-xl object-cover"
      />
      <div class="flex flex-row w-4/5 h-auto items-center justify-between p-2 m-5">
        <div class="flex flex-col w-full bg-purple-400 overflow-hidden text-2xl">
          <p class="mb-2">User's Name:</p>
          <p
            class="text-3xl flex-1 text-purple-800 outline-none focus:outline-none rounded-2xl p-4"
          >
            {{ postData.username }}
          </p>
        </div>
      </div>
      <div class="flex flex-row w-4/5 h-2/5 items-center justify-between p-2">
        <span class="w-full bg-purple-400 overflow-hidden">
          <p class="text-2xl">Post Description:</p>
          <span class="flex flex-col pt-2 w-full">
            <div class="flex flex-row flex-1">
              <p
                class="text-2xl text-purple-800 mt-2 p-4 w-full border-none outline-none focus:outline-none rounded-2xl"
              >
                {{ postData.company.catchPhrase }}
              </p>
            </div>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
