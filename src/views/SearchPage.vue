<template>
  <div class="search-page">
    <div class="search-header">
      <input
        v-model="query"
        @keyup.enter="runSearch"
        placeholder="Search users by name or username"
        class="search-input"
      />
      <button class="search-button" @click="runSearch">Search</button>
    </div>

    <div v-if="loading" class="search-status">Loading...</div>
    <div v-if="error" class="search-status error">{{ error }}</div>

    <div v-if="results.length" class="search-results">
      <div v-for="user in results" :key="user.id" class="search-item" @click="goProfile(user.id)">
        <img :src="getAvatarUrl(user.avatarMediaId)" alt="Avatar" class="search-avatar" />
        <div class="search-info">
          <div class="search-username">{{ user.username }}</div>
          <div class="search-fullname">{{ user.fullName || 'No name' }}</div>
        </div>
      </div>
    </div>

    <div v-else-if="searched && !loading" class="search-status">No users found</div>
  </div>
  <footerGlobal />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/stores/axios'
import footerGlobal from './footerGlobal.vue'
const query = ref('')
const results = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searched = ref(false)
const router = useRouter()

async function runSearch() {
  error.value = null
  loading.value = true
  searched.value = true
  try {
    const response = await api.get('/search/users', {
      params: {
        q: query.value,
      },
    })
    results.value = response.data.items || []
  } catch (err) {
    console.error('Search failed', err)
    error.value = 'Search failed. Try again.'
  } finally {
    loading.value = false
  }
}

function goProfile(userId: string) {
  router.push(`/profile/${userId}`)
}

function getAvatarUrl(avatarMediaId: string | null) {
  if (!avatarMediaId) {
    return '/src/img/profil_icon.png'
  }
  return `http://localhost:3000/api/v1/media/${avatarMediaId}?t=${Date.now()}`
}
</script>

<style scoped>
.search-page {
  padding: 24px 16px 120px;
  min-height: 100vh;
  background: #000;
  color: #fff;
}
.search-header {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.search-input {
  flex: 1;
  padding: 10px 12px;
  background: #121212;
  border: 1px solid #333;
  color: #fff;
  border-radius: 8px;
}
.search-button {
  padding: 10px 16px;
  background: #1900ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.search-results {
  display: grid;
  gap: 12px;
}
.search-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  background: #111;
  border: 1px solid #222;
  border-radius: 10px;
  cursor: pointer;
}
.search-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}
.search-info {
  display: flex;
  flex-direction: column;
}
.search-username {
  font-weight: bold;
}
.search-fullname {
  color: #999;
  font-size: 0.95rem;
}
.search-status {
  color: #999;
  margin-top: 20px;
}
.search-status.error {
  color: #ff6b6b;
}
</style>
