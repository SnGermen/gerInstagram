<template>
  <div class="header">
    <div class="setting">
      <button class="setting_btn" @click="updateProfileOpen = true">
        <img class="setting_img" src="/src/img/setting.png" alt="" />
      </button>
    </div>
    <div class="profil">
      <div class="profil_foto">
        <img class="main_foto" :src="getAvatarUrl()" alt="Profil" />
      </div>
      <div class="statistic">
        <div class="statistic_item">
          <div class="statistic_number">100</div>
          <div class="statistic_label">Posts</div>
        </div>
        <div class="statistic_item">
          <div class="statistic_number">500</div>
          <div class="statistic_label">Followers</div>
        </div>
        <div class="statistic_item">
          <div class="statistic_number">300</div>
          <div class="statistic_label">Following</div>
        </div>
      </div>
    </div>
    <div class="description">
      <div class="nickname">{{ username }}</div>
      <div class="bio">{{ bio }}</div>
    </div>
    <div class="actions">
      <button class="subscribe_btn">Subscribe</button>
    </div>
  </div>
  <div class="content">
    <!-- <div v-for="post in posts" :key="post.id" class="post"></div> -->
    <div class="section">
      <div class="section_all" @click="activeSection = 'all'">
        <img src="/src/img/section_all.png" alt="" />
      </div>
      <div class="section_like" @click="activeSection = 'likes'">
        <img src="/src/img/whiteLike.png" alt="" />
      </div>
      <input id="create" type="file" class="section_create" @click="onChangeFile()"> </input >
    <label for="create">
      <img class="create_img" src="/src/img/header_addbtn.png" alt="" />
    </label >

    </div>
  </div>
  <updateProfile :updateProfileOpen="updateProfileOpen" @close="updateProfileOpen = false" />
  <footerGlobal />
</template>

<script setup lang="ts">
import footerGlobal from '@/views/footerGlobal.vue'
import updateProfile from '@/views/updateProfile.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const auth = useUserStore()
const updateProfileOpen = ref(false)
const { username, bio, user } = storeToRefs(auth)
const selectedMedia = ref<File>()

function getAvatarUrl() {
  if (!user.value?.avatarMediaId) {
    return '/src/img/profil_icon.png'
  }
  return `http://localhost:3000/api/v1/media/${user.value.avatarMediaId}?t=${Date.now()}`
}
function onChangeFile(e: Event){
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if(!file) return
  selectedMedia.value = file
}
const activeSection = ref<'all' | 'likes'>('all')
console.log(activeSection.value)
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: black;
}
.profil {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 360px;
}
.main_foto {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.statistic {
  display: flex;
  gap: 20px;
  align-items: center;
}
.statistic_item {
  text-align: center;
}
.statistic_number {
  font-size: 1.2em;
  font-weight: bold;
}
.setting {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  max-width: 360px;
}
.setting_btn {
  background: none;
  border: none;
  cursor: pointer;
}
.setting_img {
  width: 20px;
  height: 20px;
}
.statistic_label {
  font-size: 0.9em;
  color: #666;
}
.description {
  margin-top: 10px;
  max-width: 360px;
  width: 100%;
}
.nickname {
  font-size: 1.5em;
  font-weight: bold;
  display: flex;
  justify-content: left;
}
.bio {
  margin: 10px 10px 0px 0px;
  color: #ffffff;
  font-size: 15px;
  width: 100%;
  word-wrap: break-word;
}
.actions {
  margin-top: 20px;
}
.subscribe_btn {
  background-color: #1900ff;
  color: white;
  border: none;
  padding: 10px 150px;
  border-radius: 5px;
  margin: 5px;
}
.content {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  justify-content: center;
}
.post {
  width: 150px;
  height: 150px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  background-color: rgb(0, 0, 0);
  height: 100%;
}
.section {
  display: flex;
  width: 50%;
  justify-content: space-around;
}
.section_up {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.section_create{
  display: none;
}

</style>
