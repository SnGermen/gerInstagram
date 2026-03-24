import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from './axios'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from './user'

export const useMediaStore = defineStore('mediaStore', () => {
  const auth = useUserStore()
  const { user } = storeToRefs(auth)

  async function createPost(file: File) {
    const formData = new FormData()
    formData.append('file', file)
  }
})
