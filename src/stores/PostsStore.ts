import { defineStore } from 'pinia'
import photos from '../sampleData/imagesUrl.json'
import axios from 'axios'

export const usePostsStore = defineStore('posts', {

  state: () => ({
    users: [],
    photos: photos,
    postDisplayMainDiv: '',
    showEditModal: false,
    showPostDetails:false,
    currentPost: {}
  }),
  getters: {
    postDetailArray: (state) => {
      return state.users.map((user) => {
        return {
          ...user,
          photos: state.photos.find((photo, index) => index + 1 === user.id),
        }
      })
    }
  },
  actions: {
    fetchUsers() {
      return new Promise((resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/users')
          .then((response) => {
            this.users = response.data
            resolve(response)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    openDisplayModal(id: number) {
      console.log(id)
      const post = this.postDetailArray.find((element) => element.id === id)
      Object.assign(this.currentPost,post)
      console.log(this.currentPost)
      this.showEditModal = true
    },
    postDisplayModal(id:number){
      console.log(id)
      const post = this.postDetailArray.find((element) => element.id === id)
      Object.assign(this.currentPost,post)
      console.log(this.currentPost)
      this.showPostDetails = true
    },
    deletePost(id: number) {
      console.log(id)
      this.users = this.users.filter((e) => e.id !== id)
    },
    updatePost(newObject: Object) {
      this.users = this.users.map(user =>
        user.id === newObject.id
          ? { ...user ,...newObject}
          : user
      );
      this.showEditModal=false
    }
  }
})