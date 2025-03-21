<template>
  <section>
  <div class="img_footer">
    <div>
      <img src="./icons/TOMSK.svg">
    </div>
  </div>
  <div class="footer">
    <div class="nav">
      <div class="links_footer">
      <a>Длительная аренда</a>
      <a>Недвижимость посуточно</a>
      <a>Политика конфиденциальности</a>
      </div>
      <div class="icons">
        <img src="./icons/icon_telegram.svg">
        <img src="./icons/icon_vk.svg">
      </div>
    </div>
    <div class="footer_contacts">
      <div class="footer_email">TomskZone@mail.com</div>
      <div class="footer_phone">8 (800) 111-11-11</div>
    </div>
    <div class="idk">© 2011—2025 TomskZone</div>
  </div>
  </section>
</template>

<script setup>

</script>

<style scoped>

section{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(17, 17, 17, 1);
  justify-content: space-between;
}
.img_footer{
  margin-left: 160px;
  margin-right: 160px;
}
.footer{
  margin-left: 160px;
  margin-right: 160px;
  width: 1600px;
  height: 217px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1%;
  border-radius: 5px;
}
.nav{
  display: flex;
  justify-content: space-between;
  margin-left: 475px;
  margin-right: 24px;
  margin-top: 1%;
}
.links_footer{
  display: flex;
  justify-content: space-around;
  width: 700px;
  font-size: 16px;
  margin-left: -2%;
}
.icons>img:nth-child(2){
  margin-left: 20px;
}
.footer_contacts{
  font-size: 45px;
  display: flex;
  justify-content: space-between;
}
.idk{
  display: flex;
  justify-content: center;
  font-size: 16px;
  margin-bottom: 16px;
}
</style>
