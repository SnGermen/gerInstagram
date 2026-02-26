<template>
  <div class="login">
    <div class="login_box">
      <div class="login_head">
        <h1 class="login_title">GerInstagram</h1>
      </div>
      <div class="login_form">
        <input v-model="username" type="text" placeholder="Username" name="" class="login_input" />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          name=""
          class="login_input"
        />
      </div>
      <div class="login_footer">
        <button @click="login" class="login_btn" :class="{ active: isActive }">Log In</button>
      </div>
      <div>
        <p @click="router.push('/register')" class="link">Don't have an account? Sign up</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/login'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')

const isActive = computed(() => {
  return username.value.trim() !== '' && password.value.trim() !== '' && password.value.length >= 4
})

async function login() {
  if (!isActive.value) return

  try {
    await auth.login(username.value, password.value)
    router.push('/home')
  } catch (e) {
    alert('Invalid credentials')
  }
}
</script>

<style scoped>
.link {
  color: black;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.login_box {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.login_form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0;
}
.login_title {
  text-align: center;
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-bottom: 40px;
  margin-top: 20px;
}
.login_input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  background-color: aliceblue;
  color: black;
}
.login_footer {
  width: 100%;
}
.login_btn {
  padding: 10px 20px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #6e96c4;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
.active {
  background-color: #117efa;
}
</style>
