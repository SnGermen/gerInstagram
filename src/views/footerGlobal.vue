<template>
  <div class="footer">
    <div class="footer_content">
      <button class="footer_icon">
        <img class="footer_icon__img" src="../img\home_icon.png" alt="" />
      </button>
      <button class="footer_icon">
        <img class="footer_icon__img" src="../img\footer_search.png" alt="" />
      </button>
      <button class="footer_icon">
        <img class="footer_icon__img" src="../img\footer_reels.png" alt="" />
      </button>

      <button class="footer_icon">
        <img class="footer_icon__img" src="../img\profil_icon.png" alt="" />
      </button>
    </div>
  </div>
</template>

<script type="ts"></script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 120px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer_content {
  display: flex;
  gap: 30px;
}
.footer_icon__img {
  width: 35px;
  height: 35px;
}
.footer_icon {
  width: 50px;
  height: 50px;
  border: none;
  background: none;
}
</style>
