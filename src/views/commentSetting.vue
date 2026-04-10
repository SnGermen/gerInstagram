<template>
  <div class="overlay" v-if="props.isCommentSettingOpen" @click.self="emit('close')">
    <div class="global" :style="{ left: props.x + 'px', top: props.y + 'px' }">
      <div class="global_box">
        <button class="global_btn" @click="changeThisComment()">Change</button>
        <button class="global_btn" @click="deleteThisComment()">Delete</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, type PropType } from 'vue'
import { useCommentStore } from '@/stores/useCommentStore'
import { storeToRefs } from 'pinia'
const props = defineProps({
  isCommentSettingOpen: Boolean,
  comment: Object,
  commentId: String,
  x: Number,
  y: Number,
})
const emit = defineEmits(['close', 'changeText'])
const commentStore = useCommentStore()
const { comments } = storeToRefs(commentStore)

const currentComment = computed(() => props.commentId)
async function deleteThisComment() {
  if (!currentComment.value) return
  await commentStore.deleteComment(currentComment.value)
  emit('close')
}
async function changeThisComment() {
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
