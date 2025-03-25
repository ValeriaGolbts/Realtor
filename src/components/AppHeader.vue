<template>
  <section>
    <header>
      <div class="title">
        <div>
          <img src="./icons/Logo.svg">
        </div>
        <div class="city">
          <img src="./icons/shape.svg"> Томск
        </div>
      </div>
      <div class="links">
        <a>Длительная аренда</a>
        <a>Недвижимость посуточно</a>
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
    <div class="decription">
      <div class="decription1">
        <div>Найдите жилье</div>
        <div>для новой поездки в Томске</div>
      </div>
      <div>
        <img src="./icons/TOMSKZONE.svg">
      </div>
      <div class="decription2">
        <div>Ищите спецпредложения</div>
        <div>на квартиры, дома и другие варианты</div>
      </div>
    </div>
    <div class="filter-container">
      <div class="filter">
        <select name="type">
          <option value="">Вид</option>
          <option value="apartment">Квартира</option>
          <option value="house">Дом</option>
        </select>
        <div class="border"></div>
        <select name="rooms">
          <option value="">Кол-во комнат</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <div class="border"></div>
        <input type="text" name="price" placeholder="Цена до, ₽ в месяц">
        <div class="border"></div>
        <input type="text" name="address" placeholder="Адрес, район, улица">
      </div>
      <button>НАЙТИ</button>
    </div>
  </section>
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

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 760px;
  background-image: url("./icons/Banner_main (1).svg");
  justify-content: space-between;
}

.title {
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
}

.links > a {
  cursor: pointer;
}

.authreg {
  display: flex;
  width: 18%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.auth-buttons {
  display: flex;
  width: 100%;
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

.user-menu {
  display: flex;
  align-items: center;
  gap: 20px
}

.create-ad {
  border: 1px solid #FF4A2B;
  background: none;
  color: #000;
  padding: 10px;
  width: 200px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  transition: all 500ms ease;
  font-family: Noto Sans;
}

.create-ad:hover {
  background-color: rgba(255, 110, 66, 1);
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.decription {
  margin-right: 160px;
  margin-left: 160px;
}

.decription1 {
  color: white;
  font-size: 24px;
}

.decription2 {
  display: flex;
  flex-direction: column;
  color: white;
  flex-wrap: wrap;
  align-content: center;
  font-size: 24px;
  margin-left: 123px;
}

.filter-container {
  display: flex;
  gap: 5px;
  padding: 10px;
  justify-content: center;
  margin-bottom: 44px;
}

.filter-container select,
.filter-container input {
  padding: 8px 10px;
  border: 1px solid #555;
  border-radius: 3px;
  font-size: 16px;
  color: #ddd;
  background-color: #333;
  flex: 1;
}

.filter-container button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
}

.filter > select {
  background-color: white;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("./icons/Vector.svg");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  padding-right: 30px;
  color: #181818;
  border: none;
  transition: none;
}

.filter select:nth-child(1) {
  width: 74px;
}

.filter select:nth-child(2) {
  width: 156px;
}

.filter input:nth-child(1) {
  width: 186px;
}

.border {
  margin-top: 5px;
  border-right: 1px solid red;
  height: 23px;
}

.filter-container select:invalid {
  color: #999;
}

.filter {
  display: flex;
  background-color: white;
  border-radius: 5px;
  width: 726px;
}

.filter > input {
  border: none;
  background-color: white;
}
</style>