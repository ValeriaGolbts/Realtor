<template>
  <header>
    <div class="listings-container">
      <div class="listing-info">
        <span class="price">{{ user_id }} ₽ / мес</span><br>
        <span class="old-price">{{ realty_id }} ₽</span>
        <p class="details">ID пользователя: {{ user_id }}</p>
        <p class="complex-name"><strong>ID недвижимости: {{ realty_id }}</strong></p>
        <p class="address">Адрес: пока не определен</p>
        <button @click="takeData">View</button>
      </div>
    </div>
    <!-- Блок для отображения полученных данных -->
    <div v-if="showData" class="response-data">
      <h2>Полученные данные:</h2>
      <pre>{{ responseData }}</pre>
      <p>Данные пользователя и недвижимости:</p>
      <p>ID пользователя: {{ user_id }}</p>
      <p>ID недвижимости: {{ realty_id }}</p>
    </div>
  </header>
</template>

<script setup>
import axios from "axios";
import { thisUrl } from "../url.js";
import { ref } from "vue";

let user_id = ref('');
let realty_id = ref('');

// Переменные для отображения полученных данных
let responseData = ref(null);
let showData = ref(false);

const takeData = async () => {
  try {
    console.log(user_id.value, realty_id.value);

    const response = await axios.get(`${thisUrl()}/index`, {
      params: {
        user_id: user_id.value,
        realty_id: realty_id.value,
      }
    });

    if (response.status === 200) {
      console.log('Данные успешно получены:', response.data);

      // Обработка успешного ответа
      responseData.value = response.data;
      showData.value = true; // Отображаем блок с данными
    } else {
      console.log('Ошибка при получении данных:', response.status);
      // Обработка ошибки
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    // Обработка ошибки
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: small;
}

.auth {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.auth h2 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.auth form {
  display: flex;
  flex-direction: column;
}

.reg {
  color: white;
  text-decoration: none;
}

.auth input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.auth input:focus {
  border-color: #007bff;
  outline: none;
}

.auth button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 5px;
}

.auth button:hover {
  background-color: #0056b3;
}

.auth p {
  text-align: center;
}

.auth a {
  display: block;
  text-align: center;
}

@media (max-width: 600px) {
  .auth {
    width: calc(100% - 40px);
    padding: 15px;
  }

  .auth h2 {
    font-size: 20px;
  }

  .auth input,
  .auth button {
    font-size: 14px;
    padding: 8px;
  }

  .auth button {
    margin-bottom: 10px;
  }
}
</style>

<!--<style scoped>-->
<!--header {-->
<!--  line-height: 1.5;-->
<!--}-->

<!--.logo {-->
<!--  display: block;-->
<!--  margin: 0 auto 2rem;-->
<!--}-->

<!--@media (min-width: 1024px) {-->
<!--  header {-->
<!--    display: flex;-->
<!--    place-items: center;-->
<!--    padding-right: calc(var(&#45;&#45;section-gap) / 2);-->
<!--  }-->

<!--  .logo {-->
<!--    margin: 0 2rem 0 0;-->
<!--  }-->

<!--  header .wrapper {-->
<!--    display: flex;-->
<!--    place-items: flex-start;-->
<!--    flex-wrap: wrap;-->
<!--  }-->
<!--}-->
<!--</style>-->
