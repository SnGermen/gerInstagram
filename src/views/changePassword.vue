<template>
  <div class="update" v-if="props.updatePasswordOpen">
    <div class="update_content">
      <div class="update_up">
        <button class="back" @click="$emit('close')">
          <img src="/src/img/icon_left.png" alt="" />
        </button>
        <div class="update_title">Change Password</div>
        <button class="save" @click="changePassword()">Save</button>
      </div>
      <div class="update_down">
        <input
          v-model="currentPassword"
          type="password"
          class="update_information"
          placeholder="Old Password"
        />
        <input
          v-model="newPassword"
          type="password"
          class="update_information"
          placeholder="New Password"
        />
        <input
          v-model="repeatPassword"
          type="password"
          class="update_information"
          placeholder="Repeat New Password"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const auth = useUserStore()
const { user } = storeToRefs(auth)
const currentPassword = ref('')
const newPassword = ref('')
const repeatPassword = ref('')
const props = defineProps({
  updatePasswordOpen: Boolean,
})

const emit = defineEmits(['close'])

async function changePassword() {
  if (newPassword.value && currentPassword.value) {
    if (repeatPassword.value !== newPassword.value) {
      alert('Passwords do not match')
      return
    }
    await auth.updatePassword(currentPassword.value, newPassword.value)
    console.log('Password updated successfully')
    emit('close')
    currentPassword.value = ''
    newPassword.value = ''
    repeatPassword.value = ''
  } else {
    alert('Bad')
  }
}
</script>
<style scoped>
.update {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.update_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  width: 400px;
  height: 370px;
  background: rgba(0, 0, 0, 0.832);
  border-radius: 10px;
  padding: 20px;
}
.update_up {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 360px;
}
.back,
.save {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
.update_title {
  color: white;
  font-size: 18px;
  font-weight: bold;
}
.update_down {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 360px;
  margin-top: 20px;
}

.update_information {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  background-color: aliceblue;
  color: black;
}
</style>
