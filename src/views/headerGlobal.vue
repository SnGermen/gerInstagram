<template>
  <div class="home">
    <div class="header">
      <div class="header_up">
        <div class="logo">Welcome to GerInstagram!</div>
        <div class="iconsUp_container">
          <button class="header_icon">
            <img class="header_icon__img" src="../img\header_addbtn.png" alt="" />
          </button>
          <button class="header_icon">
            <img class="header_icon__img" src="../img\whiteLike.png" alt="" />
          </button>
          <button class="header_icon">
            <img class="header_icon__img" src="../img\header_messagebtn.png" alt="" />
          </button>
        </div>
      </div>
      <div class="header_down">
        <div class="iconsDown_container">
          <div class="iconDown">
            <img class="iconDown_img" src="../img\profil_icon.png" alt="" />
            <div class="iconDown_name">Pablo</div>
          </div>
          <div class="iconDown">
            <img class="iconDown_img" src="../img\profil_icon.png" alt="" />
            <div class="iconDown_name">Pablo</div>
          </div>
          <div class="iconDown">
            <img class="iconDown_img" src="../img\profil_icon.png" alt="" />
            <div class="iconDown_name">Pablo</div>
          </div>
          <div class="iconDown">
            <img class="iconDown_img" src="../img\profil_icon.png" alt="" />
            <div class="iconDown_name">Pablo</div>
          </div>
          <div class="iconDown">
            <img class="iconDown_img" src="../img\profil_icon.png" alt="" />
            <div class="iconDown_name">Pabloooo5555555555000000000000</div>
          </div>
          <div class="iconDown">
            <img class="iconDown_img" src="../img\profil_icon.png" alt="" />
            <div class="iconDown_name">Pablo</div>
          </div>
          <div class="iconDown">
            <img class="iconDown_img" src="../img\profil_icon.png" alt="" />
            <div class="iconDown_name">Pablo</div>
          </div>
          <div class="iconDown">
            <img class="iconDown_img" src="../img\profil_icon.png" alt="" />
            <div class="iconDown_name">Pablo</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style scoped>
.header_up {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: black;
  position: fixed;
  width: 100%;
}
.logo {
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin: 10px;
}
.iconsUp_container {
  display: flex;
  gap: 10px;
}
.header_icon__img {
  width: 30px;
  height: 30px;
}
.header_icon {
  width: 50px;
  height: 50px;
  border: none;
  background: none;
}
.iconDown {
  flex: 0 0 auto; /* ← чтобы не сжимались */
  text-align: center;
}

.iconsDown_container {
  padding: 80px 0 10px 25px;
  display: flex;
  gap: 20px;

  overflow-x: auto;
  overflow-y: hidden;

  white-space: nowrap;
  background-color: black;

  scrollbar-width: none;
}

/* .iconsDown_container::-webkit-scrollbar {
  display: none;
} */

.iconDown_img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: black;
}
.iconDown_name {
  text-align: center;
  color: white;
  margin-top: 5px;
}
</style>
