import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from './axios'

const POST_LIKE_KEY = 'likedPosts'
const COMMENT_LIKE_KEY = 'likedComments'

function loadLikes(key: string) {
  const raw = localStorage.getItem(key)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item))
    }
  } catch (error) {
    console.error('Ошибка чтения лайков:', error)
  }

  return []
}

function saveLikes(key: string, arr: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(arr))
  } catch (error) {
    console.error('Ошибка сохранения лайков:', error)
  }
}

export const useLikeStore = defineStore('likeStore', () => {
  const postLikes = ref<string[]>([])
  const commentLikes = ref<string[]>([])

  function initPostLikes() {
    postLikes.value = loadLikes(POST_LIKE_KEY)
    console.log('Initialized post likes:', postLikes.value)
  }

  function isPostLiked(id: string | number) {
    const normalizedId = String(id)
    return postLikes.value.includes(normalizedId)
  }

  async function likePost(id: string | number) {
    const normalizedId = String(id)
    console.log('Liking post', normalizedId)
    await api.post(`/posts/${normalizedId}/likes`)
    if (!postLikes.value.includes(normalizedId)) {
      postLikes.value.push(normalizedId)
      saveLikes(POST_LIKE_KEY, postLikes.value)
      console.log('Post liked, current likes:', postLikes.value)
    }
  }

  async function unlikePost(id: string | number) {
    const normalizedId = String(id)
    console.log('Unliking post', normalizedId)
    await api.delete(`/posts/${normalizedId}/likes`)
    postLikes.value = postLikes.value.filter((item) => item !== normalizedId)
    saveLikes(POST_LIKE_KEY, postLikes.value)
    console.log('Post unliked, current likes:', postLikes.value)
  }

  function initCommentLikes() {
    commentLikes.value = loadLikes(COMMENT_LIKE_KEY)
  }

  function isCommentLiked(id: string | number) {
    return commentLikes.value.includes(String(id))
  }

  async function likeComment(id: string | number) {
    const normalizedId = String(id)
    await api.post(`/comments/${normalizedId}/likes`)
    if (!commentLikes.value.includes(normalizedId)) {
      commentLikes.value.push(normalizedId)
      saveLikes(COMMENT_LIKE_KEY, commentLikes.value)
    }
  }

  async function unlikeComment(id: string | number) {
    const normalizedId = String(id)
    await api.delete(`/comments/${normalizedId}/likes`)
    commentLikes.value = commentLikes.value.filter((item) => item !== normalizedId)
    saveLikes(COMMENT_LIKE_KEY, commentLikes.value)
  }

  return {
    postLikes,
    commentLikes,
    initPostLikes,
    initCommentLikes,
    isPostLiked,
    isCommentLiked,
    likePost,
    unlikePost,
    likeComment,
    unlikeComment,
  }
})
