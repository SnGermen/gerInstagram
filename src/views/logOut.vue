<template>
  <div class="logout" v-if="logOutOpen">
    <div class="logout_box">
      <div class="logout_head">
        <h1 class="logout_title">Log Out</h1>
        <div class="logout_text">Do you really want to Log Out</div>
      </div>
      <div class="logout_main">
        <button @click="auth.logout()" class="logout_button">Yes</button>
        <button @click="$emit('close')" class="logout_button">Not</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const props = defineProps({
  logOutOpen: Boolean,
})
const emits = defineEmits(['close'])
const auth = useUserStore()
</script>

<style scoped>
.logout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  width: 100%;
}
.logout_head {
  width: 100%;
}
.logout_box {
  background: #121212;
  border-radius: 12px;
  padding: 25px;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
}

.logout_title {
  color: white;
  font-size: 25px;
  margin-bottom: 5px;
}

.logout_text {
  color: #aaa;
  font-size: 15px;
}

.logout_main {
  display: flex;
  gap: 10px;
  width: 100%;
}

.logout_button {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: s0.2s;
}

.logout_button {
  background: #ed4956;
  color: white;
}

.logout_button:hover {
  background: #ff5c66;
}

.logout_button:last-child {
  background: #262626;
  color: white;
}

.logout_button:last-child:hover {
  background: #3a3a3a;
}

.logout_button:active {
  transform: scale(0.96);
}
</style>
