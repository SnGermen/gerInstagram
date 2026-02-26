<template>
  <div class="header">
    <headerGlobal />
  </div>
  <div class="main">
    <div class="content">
      <div class="content_profile">
        <img class="profile_img" src="../img/profil_icon.png" alt="" />Nickname
      </div>
      <div class="content_image"><img class="image" src="../img/anime.png" alt="" /></div>
      <div class="content_settings">
        <button class="setting_btn">
          <img class="content_img" src="../img/whiteLike.png" alt="" />
        </button>
        <button class="setting_btn">
          <img class="content_img" src="../img/comment.png" alt="" />
        </button>
      </div>
    </div>
    <div class="content_description">
      <p class="content_text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Voluptas, voluptate.
      </p>
    </div>
    <div class="content">
      <div class="content_profile">
        <img class="profile_img" src="../img/profil_icon.png" alt="" />Nickname
      </div>
      <div class="content_image"><img class="image" src="../img/anime.png" alt="" /></div>
      <div class="content_settings">
        <button class="setting_btn">
          <img class="content_img" src="../img/whiteLike.png" alt="" />
        </button>
        <button class="setting_btn">
          <img class="content_img" src="../img/comment.png" alt="" />
        </button>
      </div>
    </div>
    <div class="content_description">
      <p class="content_text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Voluptas, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Voluptas, voluptate.
      </p>
    </div>
  </div>
  <footerGlobal />
</template>

<script setup lang="ts">
import headerGlobal from '@/views/headerGlobal.vue'
import footerGlobal from '@/views/footerGlobal.vue'
</script>

<style scoped>
.header {
  top: 0;
  width: 100%;
  background: none;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  padding: 0px 0px 150px 0px;
}
.content {
  margin-top: 30px;
}
.profile_img {
  width: 50px;
  height: 50px;
  border: 1px solid white;
  border-radius: 50%;
}
.content_profile {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
}
.content_settings {
  display: flex;
  gap: 10px;
  margin: 10px 0px 10px 0px;
}

.setting_btn {
  border: none;
  background: none;
  margin-left: 5px;
}
.content_text {
  font-size: 18px;
  max-width: 500px;
}
</style>
