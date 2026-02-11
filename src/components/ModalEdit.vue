<script lang="ts" setup>
import { ref, toRaw } from 'vue'
import { usePostsStore } from '../stores/PostsStore'

const stores = usePostsStore()
const postData = ref({})
const enableName = ref(true)
const enableDescription = ref(true)
const usernameError = ref('')
const catchPhraseError = ref('')

function validateFields() {
  usernameError.value = ''
  catchPhraseError.value = ''

  // username validation
  if (!postData.value.username?.trim()) {
    usernameError.value = 'Username is required'
  } else if (postData.value.username.length > 25) {
    usernameError.value = 'Max 25 characters allowed'
  }

  // catchPhrase validation
  if (!postData.value.company?.catchPhrase?.trim()) {
    catchPhraseError.value = 'Description is required'
  }

  return !usernameError.value && !catchPhraseError.value
}

function loadInitialData() {
  postData.value = structuredClone(toRaw(stores.currentPost))
}

function updatePost() {
  if (validateFields()) {
    stores.updatePost(postData.value)
    console.log(postData.value)
    usernameError.value = ''
    catchPhraseError.value = ''
  }
}

loadInitialData()
</script>
<template>
  <div
    class="flex flex-col items-center fixed p-6 z-10 left-0 top-0 w-full h-full overflow-hidden bg-purple-300/75"
  >
    <div
      class="gap-4 flex flex-col items-center bg-purple-400 rounded-xl w-11/12 max-w-2xl h-5/6 p-6"
    >
      <div class="flex justify-end w-full min-h-min">
        <button type="button" @click="stores.showEditModal = false" class="">
          <span class="text-3xl">&times;</span>
        </button>
      </div>
      <div class="flex flex-row w-4/5 h-auto items-center justify-between p-2 m-5">
        <div class="flex flex-col w-full bg-purple-400 overflow-hidden text-2xl">
          <p class="mb-2">User's Name:</p>
          <div>
            <input
              type="text"
              :disabled="enableName"
              v-model="postData.username"
              class="text-2xl bg-purple-200 disabled:bg-purple-300 text-purple-800 border-none outline-none focus:outline-none rounded-2xl p-2"
            />
            <button @click="enableName = !enableName" class="m-2">
              <i class="fa-solid fa-pen text-lg"></i>
            </button>
          </div>
          <p v-if="usernameError !== ''" class="text-red-600 text-lg">
            {{ usernameError }}
          </p>
        </div>
      </div>
      <div class="flex flex-row w-4/5 h-2/5 items-center justify-between mt-3 p-2">
        <span class="w-full bg-purple-400 overflow-hidden">
          <p class="text-2xl">Post Description:</p>
          <span class="flex flex-col pt-2 w-full">
            <div class="flex flex-row flex-1">
              <textarea
                :disabled="enableDescription"
                rows="5"
                v-model="postData.company.catchPhrase"
                placeholder="Enter New Post Description"
                class="text-2xl bg-purple-200 disabled:bg-purple-300 text-purple-800 placeholder:text-purple-400 mt-2 p-4 w-full border-none outline-none focus:outline-none rounded-2xl"
              />
              <button
                @click="enableDescription = !enableDescription"
                class="flex items-end m-2"
              >
                <i class="fa-solid fa-pen text-lg"></i>
              </button>
            </div>
            <p v-if="catchPhraseError !== ''" class="text-red-600 text-lg">
              {{ catchPhraseError }}
            </p>
            <button
              type="button"
              @click="updatePost"
              class="text-2xl bg-purple-500 text-white p-3 m-5 w-1/3 self-center hover:bg-purple-600 h-min rounded-full"
            >
              Save
            </button>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
