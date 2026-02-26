import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from './axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const user = ref<any>(null)
  const isAuth = computed(() => !!token.value)

  async function login(identifier: string, password: string) {
    const { data } = await api.post('/auth/login', {
      identifier,
      password,
    })

    token.value = data.token
    localStorage.setItem('token', token.value)

    api.defaults.headers.common.Authorization = `Bearer ${token.value}`

    await fetchMe()
  }

  async function register(email: string, username: string, password: string) {
    await api.post('/auth/register', {
      email,
      username,
      password,
    })

    await login(username, password)
  }

  async function fetchMe() {
    const { data } = await api.get('/auth/me')
    user.value = data
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    delete api.defaults.headers.common.Authorization
  }

  return {
    token,
    user,
    isAuth,
    login,
    register,
    fetchMe,
    logout,
  }
})
