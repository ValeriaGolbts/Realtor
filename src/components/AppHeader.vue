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
        <!-- Условный рендеринг в зависимости от состояния авторизации -->
        <div v-if="!isAuthenticated" class="auth-buttons">
          <button @click="openModalAuthentication">ВОЙТИ</button>
          <button @click="openModalRegistration">ЗАРЕГИСТРИРОВАТЬСЯ</button>
        </div>
        <div v-else class="user-menu">
          <button class="create-ad">Создать объявление</button>
          <img src="@/assets/shape_black.svg" alt="Избранное" class="icon">
          <img src="@/assets/avatar.png" alt="Аватар" class="avatar" @click="logout">
        </div>
      </div>
      <Registration
          v-model:isOpen="isModalOpenReg"
          @go-to-login="switchToAuthModal"
          @auth-success="handleAuthSuccess"
      />
      <Authentication
          v-model:isOpen="isModalOpenAuth"
          @go-to-register="switchToRegModal"
          @auth-success="handleAuthSuccess"
      />
    </header>
  </template>
<script setup>
import { ref, onMounted } from 'vue';
import Registration from './AppRegistration.vue';
import Authentication from './AppAuthentication.vue';
import Cookies from 'js-cookie';

const isModalOpenReg = ref(false);
const isModalOpenAuth = ref(false);
const isAuthenticated = ref(false);

onMounted(() => {
  const token = Cookies.get('authToken');
  if (token) {
    isAuthenticated.value = true;
  }
});

const openModalRegistration = () => {
  isModalOpenReg.value = true;
};

const openModalAuthentication = () => {
  isModalOpenAuth.value = true;
};

const switchToAuthModal = () => {
  isModalOpenReg.value = false;
  isModalOpenAuth.value = true;
};

const switchToRegModal = () => {
  isModalOpenAuth.value = false;
  isModalOpenReg.value = true;
};

const handleAuthSuccess = (email) => {
  isAuthenticated.value = true;
};

const logout = () => {
  Cookies.remove('authToken');
  isAuthenticated.value = false;
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
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

.title div:first-child {
  cursor: pointer;
}

.city {
  color: black;
}

.links {
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

.authreg {
  display: flex;
  width: 18%;
  flex-direction: row;
  justify-content: space-between;
}

.auth-buttons > button {
  border-radius: 5px;
  width: 83px;
  height: 36px;
  cursor: pointer;
}

.auth-buttons button:nth-child(2) {
  background-color: #FF4A2B;
  width: 195px;
  height: 36px;
  cursor: pointer;
  border: none;
}

</style>