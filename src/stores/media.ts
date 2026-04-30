import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from './axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from './user'
import { useLikeStore } from './likes'

export const useMediaStore = defineStore('mediaStore', () => {
  const auth = useUserStore()
  const likeStore = useLikeStore()
  const { user } = storeToRefs(auth)
  const posts = ref<any[]>([])
  const feedPosts = ref<any[]>([])
  const profilePosts = ref<Map<string, any[]>>(new Map())

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
    feedPosts.value.unshift(postResponse.data.post)
    console.log('Post created:', postResponse.data.post)
    if (user.value?.id) {
      await fetchUserPosts(user.value.id)
    }
  }
  async function deletePost(postId: any) {
    await api.delete(`/posts/${postId}`)
    posts.value = posts.value.filter((post) => post.id != postId)
    feedPosts.value = feedPosts.value.filter((post) => post.id != postId)
    profilePosts.value.forEach((profilePostsList) => {
      const index = profilePostsList.findIndex((post) => post.id == postId)
      if (index > -1) {
        profilePostsList.splice(index, 1)
      }
    })
  }

  async function fetchUserPosts(userId: string) {
    const response = await api.get('/posts', {
      params: {
        authorId: userId,
        page: 1,
        size: 50,
      },
    })
    const userPosts = response.data.items || response.data.posts || response.data.data || []

    // Если это свой профиль - обновляем posts
    if (userId === user.value?.id) {
      posts.value = userPosts
    }

    // Сохраняем в profilePosts для каждого пользователя
    profilePosts.value.set(userId, userPosts)
    console.log('Posts loaded for user:', userId, userPosts)
  }

  function getProfilePosts(userId: string) {
    return profilePosts.value.get(userId) || []
  }

  async function fetchFeedPosts() {
    const response = await api.get('/posts', {
      params: {
        page: 1,
        size: 50,
      },
    })
    feedPosts.value = response.data.items || response.data.posts || response.data.data || []
    console.log('Feed posts loaded:', feedPosts.value)
  }

  async function fetchLikedPosts() {
    const likedPostIds = likeStore.postLikes
    console.log('Liked post IDs from localStorage:', likedPostIds)
    if (likedPostIds.length === 0) {
      console.log('No liked posts in localStorage')
      return []
    }

    // Загружаем посты по ID
    const likedPostsPromises = likedPostIds.map(async (postId) => {
      try {
        console.log('Fetching post:', postId)
        const response = await api.get(`/posts/${postId}`)
        console.log('Fetched post:', response.data)
        return response.data.post || response.data
      } catch (error) {
        console.error('Error loading liked post:', postId, error)
        return null
      }
    })

    const likedPosts = (await Promise.all(likedPostsPromises)).filter((post) => post !== null)
    console.log('Liked posts loaded:', likedPosts)
    return likedPosts
  }

  async function updatePost(postId: string, newPostsText: string) {
    await api.patch(`/posts/${postId}`, {
      caption: newPostsText,
    })
  }
  return {
    posts,
    feedPosts,
    profilePosts,
    createPost,
    fetchUserPosts,
    fetchFeedPosts,
    getProfilePosts,
    fetchLikedPosts,
    deletePost,
    updatePost,
  }
})
