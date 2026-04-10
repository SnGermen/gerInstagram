<template>
  <div class="update" v-if="props.updateProfileOpen">
    <div class="update_content">
      <div class="update_up">
        <button class="back" @click="$emit('close')">
          <img src="/src/img/icon_left.png" alt="" />
        </button>
        <div class="update_title">Profile</div>
        <button class="save" @click="changeProfile()">Save</button>
      </div>
      <div class="foto">
        <img class="foto_img" :src="getAvatarUrl()" alt="" />
        <input id="avatarInput" type="file" @change="onFileChange" />
        <label for="avatarInput" class="file_btn">Change Photo</label>

        <input
          v-model="username"
          type="text"
          class="update_information"
          placeholder="username"
          disabled
        />
        <input
          v-model="email"
          type="email"
          class="update_information"
          placeholder="email"
          disabled
        />
        <input
          v-model="bio"
          type="text"
          class="update_information"
          placeholder="Bio (You can Change)"
        />

        <button class="password" @click="updatePasswordOpen = true">Change Password</button>
        <button @click="logOutOpen = true" class="logoutbtn">Log Out</button>
      </div>
    </div>
  </div>
  <changePassword :updatePasswordOpen="updatePasswordOpen" @close="updatePasswordOpen = false" />
  <logOut :logOutOpen="logOutOpen" @close="logOutOpen = false" />
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import changePassword from './changePassword.vue'
import logOut from './logOut.vue'
import { p } from 'vue-router/dist/router-CWoNjPRp.mjs'

const auth = useUserStore()
const { user } = storeToRefs(auth)
const username = ref(user.value?.username || '')
const bio = ref(user.value?.bio || '')
const email = ref(user.value?.email || '')
const selectedAvatarFile = ref<File | null>(null)
const previewAvatarUrl = ref<string | null>(null)
const updatePasswordOpen = ref(false)
const logOutOpen = ref(false)

const props = defineProps({
  updateProfileOpen: Boolean,
})

const emit = defineEmits(['close'])

async function changeProfile() {
  if (selectedAvatarFile.value) {
    await auth.updateAvatar(selectedAvatarFile.value)
    selectedAvatarFile.value = null
  }

  await auth.updateProfile(username.value, email.value, bio.value)
  emit('close')
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (previewAvatarUrl.value) {
    URL.revokeObjectURL(previewAvatarUrl.value)
  }

  selectedAvatarFile.value = file

  previewAvatarUrl.value = URL.createObjectURL(file)
}

function getAvatarUrl() {
  if (previewAvatarUrl.value) {
    return previewAvatarUrl.value
  }
  if (!user.value?.avatarMediaId) {
    return '/src/img/profil_icon.png'
  }
  return `http://localhost:3000/api/v1/media/${user.value.avatarMediaId}?t=${Date.now()}`
}
onUnmounted(() => {
  if (previewAvatarUrl.value) {
    URL.revokeObjectURL(previewAvatarUrl.value)
  }
})
</script>
<style scoped>
.update {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.update_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  min-height: 450px;
  background: #121212;
  border-radius: 12px;
  padding: 20px;
}

.update_up {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.back,
.save {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.save {
  color: #3797f0;
  font-weight: 600;
}

.update_title {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.foto {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.foto input[type='file'] {
  color: white;
  font-size: 13px;
}

.foto_img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2a2a2a;
}

.update_information {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #1f1f1f;
  color: white;
  font-size: 14px;
}

.update_information::placeholder {
  color: #8e8e8e;
}

.password {
  width: 100%;
  padding: 12px;
  background: #2a2a2a;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.password:hover {
  background: #3a3a3a;
}

.logoutbtn {
  width: 100%;
  padding: 12px;
  background: #ed4956;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.logoutbtn:hover {
  background: #ff5a66;
}

.password:active,
.logoutbtn:active {
  transform: scale(0.96);
}
#avatarInput {
  display: none;
}
.file_btn {
  padding: 8px 14px;
  background: #262626;
  border-radius: 8px;
  color: white;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

.file_btn:hover {
  background: #3a3a3a;
}

.file_btn:active {
  transform: scale(0.95);
}
</style>
