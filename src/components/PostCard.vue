<script lang="ts" setup>
import { usePostsStore } from '../stores/PostsStore'

const postsStore = usePostsStore()
const props = defineProps({
  postValue: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <div
    class="flex flex-col w-full h-full lg:w-full justify-center items-center rounded-3xl transition hover:-translate-y-1 hover:shadow-xl bg-purple-300 shadow-xl"
  >
    <div class="flex flex-col w-full p-6 sm:p-8 md:p-6 2xl:w-4/6 lg:w-5/6 md:w-4/5">
      <div class="flex flex-row items-center">
        <img :src="postValue.photos.profileUrl" alt="" class="h-8 w-8 m-2 rounded-full" />
        <p class="font-serif text-lg font-bold max-w-60 truncate">
          {{ postValue.username }}
        </p>
      </div>
      <img
        :src="postValue.photos.pictureUrl"
        alt=""
        class="w-full aspect-square max-w-sm rounded-xl object-cover"
      />
      <div class="">
        <div
          class="flex justify-end gap-4 text-purple-500 opacity-70 hover:opacity-100 p-2"
        >
          <button @click="postsStore.postDisplayModal(postValue.id)">
            <i class="fa-solid fa-eye text-lg"></i>
          </button>
          <button @click="postsStore.openDisplayModal(postValue.id)">
            <i class="fa-solid fa-pen text-lg"></i>
          </button>
          <button
            @click="postsStore.deletePost(postValue.id)"
            class="hover:text-red-500 transition"
          >
            <i class="fa-solid fa-trash-alt text-lg"></i>
          </button>
        </div>
        <span class="w-full max-w-full">
          <p
            class="text-xl wrap-break-word whitespace-normal max-w-full leading-relaxed line-clamp-2"
          >
            <span class="font-serif text-3xl mr-2 font-bold">
              {{ postValue.username }}
            </span>
            <span @click="postsStore.postDisplayModal(postValue.id)">{{
              postValue.company.catchPhrase
            }}</span>
          </p>
        </span>
      </div>
    </div>
  </div>
</template>
