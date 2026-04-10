import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from './axios'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from './user'

export const useMediaStore = defineStore('mediaStore', () => {
  const auth = useUserStore()
  const { user } = storeToRefs(auth)
  const posts = ref<any[]>([])

  async function createPost(file: File, caption = '') {
    const formData = new FormData()
    formData.append('file', file)
    const mediaResponse = await api.post('/media', formData)
    const mediaId = mediaResponse.data.id

    const postResponse = await api.post('/posts', {
      caption: caption,
      mediaIds: [mediaId],
    })
    posts.value.unshift(postResponse.data.post)
    console.log('Post created:', postResponse.data.post)
    if (user.value?.id) {
      await fetchUserPosts(user.value.id)
    }
  }
  async function deletePost(postId: any) {
    await api.delete(`/posts/${postId}`)
    posts.value = posts.value.filter((post) => post.id != postId)
  }

  async function fetchUserPosts(userId: string) {
    const response = await api.get('/posts', {
      params: {
        authorId: userId,
        page: 1,
        size: 50,
      },
    })
    posts.value = response.data.items || response.data.posts || response.data.data || []
    console.log('Posts loaded:', posts.value)
  }

  async function updatePost(postId: string, newPostsText: string) {
    await api.patch(`/posts/${postId}`, {
      caption: newPostsText,
    })
  }
  return {
    posts,
    createPost,
    fetchUserPosts,
    deletePost,
    updatePost,
  }
})
