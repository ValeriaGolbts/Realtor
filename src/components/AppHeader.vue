<template>
    <header>
      <div class="title">
        <router-link to="/">
          <img src="./icons/Logo.svg">
        </router-link>
        <div class="city">
          <img src="./icons/shape.svg"> Томск
        </div>
      </div>
      <div class="links">
        <router-link class="router-link" to="/filters-search">Длительная аренда</router-link>
        <router-link class="router-link" to="/filters-search">Недвижимость посуточно</router-link>
      </div>
      <div class="authreg">
        <button>ВОЙТИ</button>
        <button>ЗАРЕГИСТРИРОВАТЬСЯ</button>
      </div>
    </header>
  </template>
<script setup>

</script>
<style scoped>
header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius:5px ;
  background-color: white;
  width: 1600px;
  height: 52px;
  padding-inline-start: 32px;
  padding-inline-end: 32px;
  margin-top: 12px;
  margin-right: 160px;
  margin-left: 160px;
}
.title{
  display: flex;
  width: 18%;
  flex-direction: row;
  justify-content: space-between;
}
.title div:first-child{
  cursor: pointer;
}
.city{
  color: black;
}
.links{
  display: flex;
  justify-content: space-between;
  color: black;
  font-size: 16px;
  width: 21%;
}
.router-link{
  text-decoration: none;
  color: black;
  cursor: pointer;
}
.authreg{
  display: flex;
  width: 18%;
  flex-direction: row;
  justify-content: space-between;
}
.authreg > button{
  border-radius: 5px;
  width: 83px;
  height: 36px;
  cursor: pointer;
}
.authreg button:nth-child(2){
  background-color: #FF4A2B;
  width: 195px;
  height: 36px;
  cursor: pointer;
  border: none;
}

</style>