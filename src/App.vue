<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePostsStore } from './stores/PostsStore'
import ModalEdit from './components/ModalEdit.vue'
import Card from './components/PostCard.vue'
import ModalView from './components/ModalView.vue'

const stores = usePostsStore()
const isFetchingData = ref(false)

async function loadInitialData() {
  try {
    isFetchingData.value = true
    await stores.fetchUsers()
  } catch (err) {
    console.log(err)
  } finally {
    isFetchingData.value = false
  }
}

loadInitialData()

const postsDataArray = computed(() => stores.postDetailArray ?? [])
</script>

<template>
  <div
    class="bg-indigo-100 text-sm md:text-base lg:text-lg font-sans text-purple-600 w-screen h-full min-h-screen"
  >
    <p
      v-if="stores.users.length === 0"
      class="flex justify-center pt-10 text-5xl font-serif"
    >
      No Posts To Display!
    </p>
    <div
      v-else
      class="grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 min-w-sm sm:min-w-sm md:min-w-md lg:min-w-lg xl:min-w-xl gap-2 sm:gap-10 m-0 p-2 sm:p-10 place-items-center"
    >
      <Card
        v-for="postValue in postsDataArray"
        :key="postValue.id"
        :post-value="postValue"
      />
    </div>
    <ModalView v-if="stores.showPostDetails === true" />
    <ModalEdit v-if="stores.showEditModal === true" />
  </div>
</template>
