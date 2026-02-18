<script lang="ts" setup>
import { computed, ref, toRaw } from 'vue'
import { usePostsStore } from '../stores/PostsStore'
import useVuelidate from '@vuelidate/core'
import { helpers, required, maxLength } from '@vuelidate/validators'

const stores = usePostsStore()
const postData = ref({})
const enableName = ref(true)
const enableDescription = ref(true)

const rules = computed(() => ({
  username: {
    required: helpers.withMessage('* Please enter some text', required),
    maxLength: helpers.withMessage('* Character limit is 25', maxLength(25)),
  },
  company: {
    catchPhrase: {
      required: helpers.withMessage('* Please enter some text', required),
    },
  },
}))

const v$ = useVuelidate(rules, postData)

function validateFields() {
  v$.value.$touch()
  if (v$.value.$invalid) return

  v$.value.$reset()
  return true
}

function loadInitialData() {
  postData.value = structuredClone(toRaw(stores.currentPost))
}

function updatePost() {
  if (validateFields()) {
    stores.updatePost(postData.value)
    console.log(postData.value)
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
              @blur="v$.username.$touch()"
              v-model="postData.username"
              class="text-2xl bg-purple-200 disabled:bg-purple-300 text-purple-800 border-none outline-none focus:outline-none rounded-2xl p-2"
            />
            <button @click="enableName = !enableName" class="m-2">
              <i class="fa-solid fa-pen text-lg"></i>
            </button>
          </div>
          <p class="text-red-600 text-lg">
            <span v-for="err in v$.username.$errors" :key="err.$uid">
              {{ err.$message }}
            </span>
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
                @blur="v$.company.catchPhrase.$touch()"
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
            <p class="text-red-600 text-lg">
              <span v-for="err in v$.company.catchPhrase.$errors" :key="err.$uid">
                {{ err.$message }}
              </span>
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
