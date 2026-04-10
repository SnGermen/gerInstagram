<template>
  <div class="create" v-if="$props.ifCreatePost">
    <dive class="create_container">
      <div class="create_up">
        <div class="title">Edit Post</div>
      </div>
      <div class="content">
        <input id="create" type="file" @change="onChange" />
        <label v-if="!ifSelected" class="content_create" for="create">Create</label>
        <img v-if="media && fileType === 'image'" :src="media" alt="preview" />
        <video v-if="media && fileType === 'video'" :src="media" controls></video>
      </div>
      <div class="description">
        <input v-model="description" type="text" v-if="media" placeholder="Add description..." />
      </div>
      <div class="content_footer">
        <button class="submit" @click="submit()">Submit</button>

        <button class="close" @click="($emit('close'), (media = false), (ifSelected = false))">
          Close
        </button>
      </div>
    </dive>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useMediaStore } from '@/stores/media'
import postSetting from './postSetting.vue'
const mediaStore = useMediaStore()

const props = defineProps({
  ifCreatePost: Boolean,
})
const emit = defineEmits(['close'])
const media = ref<string | false>(false)
const fileType = ref<string>('')
const ifSelected = ref(false)
const description = ref('')
const selectedFile = ref<File | null>(null)
function onChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('Only images allowed')
    return
  }
  selectedFile.value = file
  media.value = URL.createObjectURL(file)
  fileType.value = file.type.startsWith('image/') ? 'image' : 'video'
  ifSelected.value = true
}
async function submit() {
  if (!selectedFile.value) {
    alert('Please select a file')
    return
  }

  await mediaStore.createPost(selectedFile.value, description.value)
  alert('Post created successfully!')
  emit('close')
  media.value = false
  ifSelected.value = false
  description.value = ''
  selectedFile.value = null
}
</script>
<style scoped>
.create {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.create_container {
  display: flex;
  flex-direction: column;
  width: 500px;
  max-width: 90vw;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.create_up {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #dbdbdb;
  background: white;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #262626;
}

.content {
  position: relative;
  width: 100%;
  height: 400px;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dbdbdb;
}

.content_create {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #0095f6;
  font-size: 24px;
  font-weight: 300;
  cursor: pointer;
  transition: background-color 0.2s;
}

.content_create {
  font-size: 30px;
}
#create {
  display: none;
}

.content img,
.content video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

.description {
  padding: 16px 20px;
  border-bottom: 1px solid #dbdbdb;
}

.description input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: #262626;
  background: transparent;
  padding: 8px 0;
}

.content_footer {
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
}

.submit {
  background: #0095f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.close {
  cursor: pointer;
  background-color: #000000;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  margin-left: 8px;
}
</style>
