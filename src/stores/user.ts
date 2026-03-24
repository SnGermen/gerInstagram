import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from './axios'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<any>(null)
  const router = useRouter()
  const isAuth = computed(() => !!token.value)
  const username = computed(() => user.value?.username)
  const bio = computed(() => user.value?.bio)
  const email = computed(() => user.value?.email)
  if (token.value) {
    api.defaults.headers.common.Authorization = `Bearer ${token.value}`
  }

  async function login(identifier: string, password: string) {
    const { data } = await api.post('/auth/login', {
      identifier,
      password,
    })
    console.log(data)

    token.value = data.token

    localStorage.setItem('token', token.value!)

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
    try {
      const { data } = await api.get('/auth/me')

      user.value = data.user
    } catch (error) {
      logout()
    }
  }

  function logout() {
    token.value = null
    user.value = null

    localStorage.removeItem('token')

    delete api.defaults.headers.common.Authorization
    router.push('/login')
  }

  async function init() {
    if (token.value) {
      await fetchMe()
    }
  }

  async function updateProfile(username: string, email: string, bio: string) {
    const { data } = await api.patch('/auth/me', {
      username,
      email,
      bio,
    })
    user.value = data.user
    console.log(data)
  }
  async function updatePassword(currentPassword: string, newPassword: string) {
    await api.patch('/auth/password', {
      currentPassword,
      newPassword,
    })
  }

  async function updateAvatar(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const mediaResponse = await api.post('/media', formData)
    const mediaId = mediaResponse.data.id

    const { data } = await api.patch('/auth/me/avatar', { mediaId })

    user.value = data.user
  }
  return {
    token,
    user,
    username,
    isAuth,
    bio,
    email,
    login,
    register,
    fetchMe,
    logout,
    init,
    updateProfile,
    updatePassword,
    updateAvatar,
  }
})
