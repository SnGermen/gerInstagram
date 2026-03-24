<template>
  <div class="register">
    <div class="register_box">
      <h1 class="register_login">Register</h1>
      <div class="register_form">
        <input class="register_input" v-model="email" type="email" placeholder="Email" />
        <input class="register_input" v-model="username" type="text" placeholder="Username" />
        <input class="register_input" v-model="password" type="password" placeholder="Password" />
      </div>
      <button class="register_btn" @click="registration" :class="{ isActive }">Sign Up</button>

      <p class="link" @click="goLogin">Already have an account? Login</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const auth = useUserStore()
const email = ref('')
const username = ref('')
const password = ref('')

const isValid = computed(() => {
  return email.value.trim() !== '' && username.value.trim() !== '' && password.value.length >= 6
})
const isActive = computed(() => {
  return (
    email.value.trim() !== '' &&
    username.value.trim() !== '' &&
    password.value.trim() !== '' &&
    password.value.length >= 4
  )
})

async function registration() {
  if (!isValid.value) return

  try {
    await auth.register(email.value, username.value, password.value)
    alert('Registration successful!.')
    router.push('/main')
  } catch (e: any) {
    console.error(e.response?.data)
    alert(e.response?.data.error || 'Registration error')
  }
}

function goLogin() {
  router.push('/login')
}
</script>
<style>
.register {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgb(255, 255, 255);
}
.register_box {
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.register_form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0;
}
.register_login {
  text-align: center;
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-bottom: 40px;
  margin-top: 20px;
}
.register_input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  background-color: aliceblue;
  color: black;
}
.register_btn {
  padding: 10px 20px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #6e96c4;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
.link {
  color: black;
  cursor: pointer;
  width: fit-content;
  margin-top: 5px;
}
.isActive {
  background-color: #117efa;
}
</style>
