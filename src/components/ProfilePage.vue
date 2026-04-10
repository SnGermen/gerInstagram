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
          <div class="statistic_number">{{ mediaStore.posts.length }}</div>
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
    <div class="section">
      <div class="section_all" @click="activeSection = 'all'">
        <img src="/src/img/section_all.png" alt="" />
      </div>
      <div class="section_like" @click="activeSection = 'likes'">
        <img class="like" src="/src/img/whiteLike.png" alt="" />
      </div>
      <div class="section_create" @click="ifCreatePost = true">
        <img class="create_img" src="/src/img/header_addbtn.png" alt="" />
      </div>
    </div>

    <div class="posts-grid" v-if="mediaStore.posts.length">
      <div v-for="post in mediaStore.posts" :key="post.id" class="post">
        <template v-if="post.media && post.media.length">
          <div v-for="pm in post.media" :key="pm.id" class="post-media-item">
            <img
              @click="openPostModal(post)"
              :src="`http://localhost:3000/api/v1/media/${pm.media.id}?t=${Date.now()}`"
              alt="Post image"
              class="post_img"
            />
            <button class="post_setting" @click="openSettingOfPost(post, $event)">
              <img src="/src/img/kebabSsetting.png" alt="" />
            </button>
            <postSetting
              :isPostSettingOpen="isPostSettingOpen"
              :postId="postId"
              @close="isPostSettingOpen = false"
              :x="menuPosition.x"
              :y="menuPosition.y"
            />
          </div>
        </template>
        <template v-else>
          <div class="post_empty">No media</div>
        </template>
      </div>
    </div>
  </div>
  <updateProfile :updateProfileOpen="updateProfileOpen" @close="updateProfileOpen = false" />
  <createPost :ifCreatePost="ifCreatePost" @close="ifCreatePost = false" />
  <openPost v-if="ifOpenPost" :post="selectedPost" @close="ifOpenPost = false" />
  <footerGlobal />
</template>

<script setup lang="ts">
import footerGlobal from '@/views/footerGlobal.vue'
import updateProfile from '@/views/updateProfile.vue'
import { useUserStore } from '@/stores/user'
import { ref, onMounted, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'
import createPost from '@/views/createPost.vue'
import openPost from '@/views/openPost.vue'
import postSetting from '@/views/postSetting.vue'

const auth = useUserStore()
const mediaStore = useMediaStore()
const updateProfileOpen = ref(false)
const ifCreatePost = ref(false)
const ifOpenPost = ref(false)
const selectedPost = ref<any>(null)
const { username, bio, user } = storeToRefs(auth)
const { posts } = storeToRefs(mediaStore)
const selectedMedia = ref<File>()
const postId = ref()
const isPostSettingOpen = ref(false)
const menuPosition = ref({ x: 0, y: 0 })
const editPost = ref(null)
function openSettingOfPost(post: any, event: MouseEvent) {
  isPostSettingOpen.value = true
  postId.value = post.id
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()

  menuPosition.value = {
    x: rect.right,
    y: rect.bottom,
  }
}

function openPostModal(post: any) {
  selectedPost.value = post
  ifOpenPost.value = true
}
onMounted(() => {
  if (user.value?.id) {
    mediaStore.fetchUserPosts(user.value.id)
  }
})

function getAvatarUrl() {
  if (!user.value?.avatarMediaId) {
    return '/src/img/profil_icon.png'
  }
  return `http://localhost:3000/api/v1/media/${user.value.avatarMediaId}?t=${Date.now()}`
}
function onChangeFile(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  selectedMedia.value = file
}
const activeSection = ref<'all' | 'likes'>('all')
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px 18px;
  background: linear-gradient(180deg, #000 0%, #050505 100%);
  border-bottom: 1px solid #222;
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
.section {
  display: flex;
  gap: 120px;
  justify-content: center;
  margin-top: 20px;
  height: 20px;
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
.like {
  filter: invert(1);
  width: 24px;
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
  width: 100%;
  background-color: #050505;
  padding: 16px 8px 32px;
  height: 100%;
}
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  width: 100%;
  max-width: 1000px;
  margin: 16px auto 0;
}
.post {
  width: 100%;
  min-height: 150px;
  background-color: #111;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
}
.post-media-item {
  position: relative;
  width: 100%;
  height: 150px;
  position: relative;
}
.post_img,
.post_video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.post_setting {
  position: absolute;
  top: 0px;
  right: 0px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 6px;
  padding: 5px;
  cursor: pointer;
}
.post_setting img {
  width: 20px;
  height: 20px;
  filter: invert();
}
.post_empty {
  color: #bbb;
  text-align: center;
  font-size: 14px;
  width: 100%;
  padding: 35px 0;
}
.section_up {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.post_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.post_video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
