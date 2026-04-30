import { ref } from 'vue'
import api from './axios'
import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comments', () => {
  const comments = ref<any[]>([])

  async function createComment(postId: string, text: string) {
    const commentData = await api.post(`/posts/${postId}/comments`, { text })
    const created = commentData.data.comment || commentData.data
    comments.value.push(created)
    console.log('Comment created:', created)
    await fetchComments(postId)
  }

  async function fetchComments(postId: string) {
    const response = await api.get(`/posts/${postId}/comments`)
    comments.value = response.data.items || response.data.comments || response.data.data || []
  }

  async function deleteComment(commentId: string) {
    await api.delete(`/comments/${commentId}`, {
      data: {
        commentId,
      },
    })
    comments.value = comments.value.filter((comment) => comment.id !== commentId)
  }

  async function updateComment(commentId: string, newText: string) {
    await api.patch(`/comments/${commentId}`, {
      text: newText,
    })
    const index = comments.value.findIndex((comment) => comment.id == commentId)
    comments.value[index].text = newText
  }

  return {
    comments,
    createComment,
    fetchComments,
    deleteComment,
    updateComment,
  }
})
