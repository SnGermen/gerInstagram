<template>
  <div class="register">
    <div class="box">
      <h1>Register</h1>

      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="registration" :disabled="!isValid">Sign Up</button>

      <p @click="goLogin" class="link">Already have an account? Login</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/login'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const username = ref('')
const password = ref('')

const isValid = computed(() => {
  return email.value.trim() !== '' && username.value.trim() !== '' && password.value.length >= 6
})

async function registration() {
  if (!isValid.value) return

  try {
    await auth.register(email.value, username.value, password.value)
  } catch (e: any) {
    console.error(e.response?.data) // <--- log full server response
    alert(e.response?.data?.message || 'Rккккккккккккккккegistration error')
  }
}

function goLogin() {
  router.push('/login')
}
</script>
<style>
input {
  color: black;
}
</style>
