<template>
  <div class="header"><headerGlobal /></div>
  <div class="main">
    <div class="content" v-for="post in mediaStore.feedPosts" :key="post.id">
      <div class="post_header">
        <div class="profile">
          <div class="profile_avatar">
            <img :src="getAuthorAvatarUrl(post.author)" alt="" @click="openPostModal(post)" />
          </div>
          <div class="profile_info">
            <div class="profile_nickname">{{ post.author?.username }}</div>
          </div>
        </div>
      </div>

      <div class="media_container">
        <template v-if="post.media && post.media.length">
          <div class="post_media">
            <img
              @click="openPostModal(post)"
              :src="`http://localhost:3000/api/v1/media/${post.media[0].media.id}?t=${Date.now()}`"
              alt="Post image"
              class="post_img"
            />
          </div>
        </template>
        <template v-else>
          <div class="post_media_empty">No media</div>
        </template>
      </div>

      <div class="post_footer">
        <div class="post_actions">
          <button
            class="action_btn"
            :class="{ liked: likeStore.isPostLiked(post.id) }"
            @click="toggleLike(post)"
          >
            <img src="/src/img/whiteLike.png" alt="Like" />
          </button>
          <div class="like_counter">{{ post._count?.likes || 0 }}</div>
        </div>
        <div class="post_caption">
          <span class="caption_text">{{ post.caption }}</span>
        </div>
      </div>
    </div>
  </div>
  <footerGlobal />
  <openPost v-if="ifOpenPost" :post="selectedPost" @close="ifOpenPost = false" />
</template>

<script setup lang="ts">
import headerGlobal from '@/views/headerGlobal.vue'
import footerGlobal from '@/views/footerGlobal.vue'
import { ref, onMounted } from 'vue'
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'
import openPost from '@/views/openPost.vue'
import { useLikeStore } from '@/stores/likes'

const ifOpenPost = ref(false)
const selectedPost = ref(null)
const auth = useUserStore()
const mediaStore = useMediaStore()
const likeStore = useLikeStore()

function openPostModal(post: any) {
  ifOpenPost.value = true
  selectedPost.value = post
}

async function toggleLike(post: any) {
  if (!post?.id) return
  const liked = likeStore.isPostLiked(post.id)
  console.log('Toggling like for post', post.id, 'currently liked:', liked)

  if (liked) {
    try {
      await likeStore.unlikePost(post.id)
      if (post._count && typeof post._count.likes === 'number') {
        post._count.likes = Math.max(0, post._count.likes - 1)
      }
    } catch (error) {
      console.error('Unlike failed', error)
    }
  } else {
    try {
      await likeStore.likePost(post.id)
      if (post._count && typeof post._count.likes === 'number') {
        post._count.likes += 1
      } else {
        post._count = { ...(post._count || {}), likes: 1 }
      }
    } catch (error) {
      console.error('Like failed', error)
    }
  }

  console.log('Like status after toggle:', likeStore.isPostLiked(post.id))
}

function getAuthorAvatarUrl(author: any) {
  if (!author?.avatarMediaId) {
    return '/src/img/profil_icon.png'
  }
  return `http://localhost:3000/api/v1/media/${author.avatarMediaId}?t=${Date.now()}`
}

onMounted(() => {
  likeStore.initPostLikes()
  mediaStore.fetchFeedPosts()
})
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #000; /* Обязательно добавь фон, чтобы посты «ныряли» под него */
  position: sticky; /* Чтобы шапка замирала наверху при скролле */

  z-index: 1000;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
}
.content:first-of-type {
  margin-top: 80px;
}
.content {
  width: 100%;
  max-width: 500px;
  background-color: #0a0a0a;
  border: 1px solid #222;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

.post_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #222;
}

.profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile_avatar {
  width: 40px;
  height: 40px;
}

.profile_avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.profile_info {
  display: flex;
  flex-direction: column;
}

.profile_nickname {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
}

.profile_location {
  font-size: 12px;
  color: #666;
}

.more_btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.more_btn img {
  width: 20px;
  height: 20px;
  filter: invert(1);
}

.media_container {
  width: 100%;
  background-color: #000;
}

.post_media {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #1a1a1a;
}

.post_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post_media_empty {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
  background: #1a1a1a;
}

.post_footer {
  padding: 8px 16px;
}

.post_actions {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #222;
}

.action_btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
}

.action_btn img {
  width: 24px;
  height: 24px;
  filter: invert(1);
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.action_btn.liked img {
  filter: invert(0.5) sepia(1) hue-rotate(300deg) saturate(5);
  transform: scale(1.2);
}

.action_btn:hover img {
  opacity: 0.7;
}

.post_caption {
  display: flex;
  gap: 8px;
  padding: 8px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #fff;
  word-wrap: break-word;
  align-items: flex-start;
}

.username {
  font-weight: bold;
  flex-shrink: 0;
}

.caption_text {
  color: #ccc;
}
.like_counter {
  font-size: px;
  display: flex;
  align-items: center;
}
</style>
