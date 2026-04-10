<template>
  <div class="openPost">
    <div class="openPost_content">
      <div class="content">
        <img
          v-if="currentPost?.media?.length"
          :src="`http://localhost:3000/api/v1/media/${currentPost.media[0].media.id}?t=${Date.now()}`"
          alt="Post image"
          class="content_media"
        />
      </div>

      <div class="section">
        <div class="section_up">
          <div class="user">
            <div class="user_icon">
              <img :src="avatarUrl" alt="User image" class="user_img" />
            </div>
            <a class="user_name" href="/profile">{{ username }}</a>
          </div>

          <button class="cancel_btn" @click="emit('close')">
            <img src="/src/img/cancel.png" alt="" />
          </button>
        </div>

        <div class="section_middle">
          <div class="section_description">
            <div class="description_label">Post Description</div>

            <textarea v-model="editingNewTextDescription" class="description" v-if="isOwner">
              {{ currentPost?.caption }}
            </textarea>
            <p v-else class="description_notOwn">
              {{ currentPost?.caption || 'No description' }}
            </p>

            <button
              :disabled="!ifEditindDescription"
              @click="editDescription()"
              v-if="isOwner"
              class="description_btn"
            >
              Save
            </button>
          </div>

          <div class="comments_box">
            <div class="comments_header">Comments: {{ comments.length }}</div>

            <div class="comments_list">
              <div v-if="comments.length">
                <div class="comment_item" v-for="comment in comments" :key="comment.id">
                  <div class="comment_up">
                    <div class="comment_up_first">
                      <div class="comment_avatar">
                        <img
                          :src="
                            comment.author?.avatarMediaId
                              ? `http://localhost:3000/api/v1/media/${comment.author.avatarMediaId}?t=${Date.now()}`
                              : '/src/img/profil_icon.png'
                          "
                          alt="Avatar"
                          class="user_img"
                        />
                      </div>

                      <div class="comment_author">
                        {{ comment.author?.username }}
                      </div>
                    </div>
                    <div class="comment_time">{{ comment.createdAt.slice(11, 16) }}</div>
                  </div>
                  <div class="comment_body">
                    {{ comment.text || comment.content || comment.body }}
                  </div>
                  <button class="comment_setting" @click="openSettings(comment, $event)">
                    <img src="/src/img/kebabSsetting.png" alt="" />
                  </button>
                </div>

                <commentSetting
                  :isCommentSettingOpen="isCommentSettingOpen"
                  :comment="commentSetting"
                  :commentId="commentId"
                  @close="isCommentSettingOpen = false"
                  :x="menuPosition.x"
                  :y="menuPosition.y"
                  @changeText="startEdit"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="comment_form">
          <button class="global_like" @click="likePost()">
            <img src="/src/img/whiteLike.png" alt="" />
          </button>
          <input
            v-model="newCommentText"
            @keyup.enter="addComment"
            :placeholder="editingCommentId ? 'Edit comment' : 'Leave a comment'"
            class="comment_input"
          />
          <button type="button" class="comment_submit" @click="addComment">
            {{ editingCommentId ? 'Edit' : 'Send' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, type PropType } from 'vue'
import { useUserStore } from '@/stores/user'
import { useCommentStore } from '@/stores/useCommentStore'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'
import commentSetting from './commentSetting.vue'
const userStore = useUserStore()
const commentStore = useCommentStore()
const mediaStore = useMediaStore()
const openComment = ref(null)
const commentId = ref('')
const isCommentSettingOpen = ref(false)
const editingCommentId = ref()
const editingNewTextDescription = ref('')
const ifEditindDescription = computed(
  () => editingNewTextDescription.value !== (currentPost.value?.caption || ''),
)
const props = defineProps({
  post: Object as PropType<any>,
})
const emit = defineEmits(['close'])

const { username, user } = storeToRefs(userStore)
const { comments } = storeToRefs(commentStore)
const menuPosition = ref({ x: 0, y: 0 })
const currentPost = computed(() => props.post || null)
const isOwner = computed(() => userStore.isOwner(currentPost.value?.userId))
const newCommentText = ref('')
const isLiked = ref(false)
const avatarUrl = computed(() =>
  user.value?.avatarMediaId
    ? `http://localhost:3000/api/v1/media/${user.value.avatarMediaId}?t=${Date.now()}`
    : '/src/img/profil_icon.png',
)
function startEdit(id: string) {
  editingCommentId.value = id
  const comment = comments.value.find((e) => e.id == id)

  if (comment) {
    newCommentText.value = comment.text
  }
}
async function editDescription() {
  await mediaStore.updatePost(currentPost.value.id, editingNewTextDescription.value)
  currentPost.value.caption = editingNewTextDescription.value
}
function openSettings(comment: any, event: MouseEvent) {
  openComment.value = comment
  isCommentSettingOpen.value = true
  commentId.value = comment.id
  async function likePost() {
    isLiked.value = true
  }
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()

  menuPosition.value = {
    x: rect.right,
    y: rect.bottom,
  }
}

onMounted(async () => {
  if (!currentPost.value?.id) return
  editingNewTextDescription.value = currentPost.value?.caption || ''
  await commentStore.fetchComments(currentPost.value.id)
})

const addComment = async () => {
  const text = newCommentText.value.trim()
  if (!text || !currentPost.value?.id) return

  try {
    if (editingCommentId.value) {
      await commentStore.updateComment(editingCommentId.value, text)
      editingCommentId.value = null
    } else {
      await commentStore.createComment(currentPost.value.id, text)
    }
    newCommentText.value = ''
  } catch (error) {
    console.error('Ошибка отправки комментария:', error)
  }
}
</script>

<style scoped>
.openPost {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.openPost_content {
  background: #000;
  border-radius: 12px;
  max-width: 80vw;
  max-height: 80vh;
  display: flex;
  overflow: hidden;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  background: #111;
}

.content_media {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 14px;
  min-width: 360px;
  min-height: 780px;
}

.section {
  width: 440px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: white;
  min-height: 0;
}

.section_up {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user_icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.user_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user_name {
  font-weight: bold;
  color: white;
  text-decoration: none;
  font-size: 20px;
}

.user_name:hover {
  color: #bbb;
}

.cancel_btn {
  background: none;
  border: none;
  cursor: pointer;
}

.cancel_btn img {
  width: 20px;
  filter: invert();
}

.section_middle {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.section_description {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  max-height: 180px;
}

.description_label {
  text-transform: uppercase;
  font-size: 12px;
  padding: 10px 0px 0px 10px;
  color: #8a8f95;
}

.description {
  font-size: 14px;
  line-height: 1.5;
  background: black;
  border: none;
  resize: none;
  min-height: 100px;
  padding: 5px;
  outline: none;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
  overflow-x: hidden;
  padding: 0px 10px 0px 10px;
}
.description_notOwn {
  height: 200px;
  line-height: 1.5;
  word-break: break-all;
  overflow: scroll;
  min-height: 100px;
  padding: 5px;
  outline: none;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
  overflow-x: hidden;
  padding: 0px 10px 0px 10px;
}
.description_btn {
  background: #1f6feb;
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  cursor: pointer;
}
.description_btn:disabled {
  background: #385391;
}
.comments_box {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  word-break: break-all;
}

.comments_header {
  font-size: 14px;
  margin-bottom: 8px;
}

.comments_list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
.comment_avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
.comment_item {
  background: #141414;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
  position: relative;
}
.comment_up {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.comment_up_first {
  display: flex;
  align-items: center;
}
.comment_author {
  font-weight: bold;
  margin-bottom: 4px;
}

.comment_body {
  font-size: 20px;
  color: #ccc;
  white-space: pre-wrap;
}

.comment_form {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.comment_input {
  flex: 1;
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 10px;
  color: white;
}

.comment_submit {
  background: #1f6feb;
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  cursor: pointer;
}
.comment_setting {
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
.comment_setting img {
  width: 22px;
  filter: invert();
}
.global_like {
  background: none;
  border: none;
  cursor: pointer;
}
.global_like img {
  width: 25px;
  filter: invert();
}
</style>
