<template>
  <div class="overlay" v-if="$props.isPostSettingOpen == true" @click.self="emit('close')">
    <div class="global" :style="{ left: $props.x + 'px', top: $props.y + 'px' }">
      <button class="global_btn" @click="deleteThisPost()">Delete</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import openPost from './openPost.vue'
const mediaStore = useMediaStore()
const startEditPost = ref(false)
const props = defineProps({
  isPostSettingOpen: Boolean,
  postId: String,

  x: Number,
  y: Number,
})
const emit = defineEmits(['close'])
const currentPost = computed(() => props.postId)
async function deleteThisPost() {
  if (!currentPost.value) return
  await mediaStore.deletePost(currentPost.value)
  emit('close')
}
async function changeThisPost() {
  startEditPost.value = true
}
</script>
<style scoped>
.overlay {
  position: fixed;
  inset: 0;
}
.global {
  position: absolute;
  border-radius: 12px;
  display: flex;
  width: 200px;
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
