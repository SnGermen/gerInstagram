<template>
  <div class="overlay" v-if="props.isCommentSettingOpen" @click.self="emit('close')">
    <div class="global" :style="{ left: props.x + 'px', top: props.y + 'px' }">
      <div class="global_box">
        <button class="global_btn" v-if="canEditComment" @click="changeThisComment()">
          Change
        </button>
        <button class="global_btn" v-if="canDeleteComment" @click="deleteThisComment()">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, type PropType } from 'vue'
import { useCommentStore } from '@/stores/comment'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const props = defineProps({
  isCommentSettingOpen: Boolean,
  comment: Object,
  commentId: String,
  x: Number,
  y: Number,
  isPostOwner: Boolean,
})
const emit = defineEmits(['close', 'changeText'])

const commentStore = useCommentStore()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const currentComment = computed(() => props.commentId)

const isCommentOwner = computed(() => {
  if (!props.comment?.author?.id || !user.value?.id) {
    return false
  }
  return String(props.comment.author.id) === String(user.value.id)
})

const canEditComment = computed(() => isCommentOwner.value)
const canDeleteComment = computed(() => isCommentOwner.value || props.isPostOwner)

async function deleteThisComment() {
  if (!currentComment.value || !canDeleteComment.value) {
    console.warn('No permission to delete this comment')
    emit('close')
    return
  }
  await commentStore.deleteComment(currentComment.value)
  emit('close')
}

async function changeThisComment() {
  if (!canEditComment.value) {
    console.warn('No permission to edit this comment')
    emit('close')
    return
  }
  emit('changeText', props.commentId)
  emit('close')
}
</script>
<style scoped>
.overlay {
  position: fixed;
  inset: 0;
}
.global {
  position: absolute;
}
.global_box {
  border-radius: 12px;
  display: flex;
  width: 200px;
  height: 100px;
  justify-content: center;
  flex-direction: column;
}
.global_btn {
  padding: 12px 24px;
  background-color: #333333;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.global_btn:hover {
  background-color: #555555;
  border-color: #777777;
}
</style>
