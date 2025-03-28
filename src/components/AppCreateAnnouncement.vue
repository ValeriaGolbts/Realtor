<template>
  <div class="container">
    <div class="content-container">
      <!-- Заголовок -->
      <h1 class="title">Разместить объявление</h1>

      <!-- Кнопка "Назад", отображается только на втором шаге -->
      <a href="#" class="back-link" v-if="step === 2" @click.prevent="prevStep">← Назад</a>

      <!-- Шаг 1: Информация о недвижимости -->
      <div v-if="step === 1">
        <div class="section">
          <label for="rent-type" class="label">Тип аренды</label>
          <select id="rent-type" class="select" v-model="form.type_rent_id">
            <option v-for="option in rentTypeOptions" :key="option.id" :value="option.id">
              {{ option.title }}
            </option>
          </select>
          <label for="property-type" class="label">Тип недвижимости</label>
          <select id="property-type" class="select" v-model="form.type_realty_id">
            <option v-for="option in propertyTypeOptions" :key="option.id" :value="option.id">
              {{ option.title }}
            </option>
          </select>
        </div>

        <!-- Параметры квартиры -->
        <div class="section">
          <h3 class="subtitle">Параметры квартиры</h3>
          <div class="form-group">
            <label for="rooms" class="label">Количество комнат</label>
            <select id="rooms" class="select" v-model="form.count_rooms">
              <option v-for="option in roomOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="repair" class="label">Ремонт</label>
            <select id="repair" class="select" v-model="form.repair_id">
              <option v-for="option in repairTypeOptions" :key="option.id" :value="option.id">
                {{ option.title }}
              </option>
            </select>
          </div>

          <!-- Площади и этаж -->
          <div class="form-group-row">
            <div class="form-group area">
              <label for="total-area" class="label">Общая площадь</label>
              <div class="input-wrapper">
                <input
                    id="total-area"
                    type="number"
                    class="input area"
                    placeholder="25"
                    v-model="form.total_square"
                />
                <span class="unit">м²</span>
              </div>
            </div>
            <div class="form-group area">
              <label for="living-area" class="label">Жилая площадь</label>
              <div class="input-wrapper">
                <input
                    id="living-area"
                    type="number"
                    class="input area"
                    placeholder="25"
                    v-model="form.living_square"
                />
                <span class="unit">м²</span>
              </div>
            </div>
            <div class="form-group area">
              <label for="kitchen-area" class="label">Площадь кухни</label>
              <div class="input-wrapper">
                <input
                    id="kitchen-area"
                    type="number"
                    class="input area"
                    placeholder="25"
                    v-model="form.kitchen_square"
                />
                <span class="unit">м²</span>
              </div>
            </div>
          </div>

          <!-- Этаж и год постройки -->
          <div class="form-group-row">
            <div class="form-group small">
              <label for="floor" class="label">Этаж</label>
              <input id="floor" type="number" class="input small" placeholder="2" v-model="form.floor" />
            </div>
            <div class="form-group small">
              <label for="year-built" class="label">Год постройки дома</label>
              <input
                  id="year-built"
                  type="number"
                  class="input small"
                  placeholder="1943"
                  v-model="form.year_construction"
              />
            </div>
          </div>
          <!-- Адрес и цена -->
          <div class="form-group">
            <label for="address" class="label">Адрес</label>
            <input id="address" type="text" class="input" placeholder="Адрес" v-model="form.address" />
          </div>
          <div class="form-group">
            <label for="price" class="label">Цена</label>
            <input id="price" type="number" class="input" placeholder="Цена" v-model="form.price" />
          </div>
        </div>
        <!-- Кнопки -->
        <div class="actions">
          <!-- Кнопка "Продолжить", переход на следующий шаг -->
          <button @click.prevent="nextStep" class="button primary">Продолжить</button>
          <!-- Кнопка "Сохранить и выйти" -->
          <button @click.prevent="saveAndExit" class="button secondary">Сохранить и выйти</button>
        </div>
      </div>

      <!-- Шаг 2: Фотографии, описание и условия аренды -->
      <div v-if="step === 2">
        <div class="section">
          <h3 class="subtitle">Как выглядит недвижимость</h3>
          <div class="photo-upload">
            <div class="photo-previews">
              <!-- Пример превью фотографий -->
              <div class="photo-preview" v-for="(photo, index) in form.photos" :key="index">
                <img :src="photo" alt="Фото квартиры" />
                <div class="photo-actions">
                  <a href="#" @click.prevent="setMainPhoto(index)">↑ Поставить фото первым</a>
                  <a href="#" @click.prevent="rotatePhoto(index)">⟳ Повернуть</a>
                  <a href="#" @click.prevent="removePhoto(index)">🗑 Удалить</a>
                </div>
              </div>
              <div class="add-photo">
                <input type="file" @change="addPhoto" ref="photoInput" style="display: none" accept="image/*" />
                <button @click="openFileSelector">ДОБАВИТЬ</button>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <label for="description" class="label">Описание</label>
          <textarea
              id="description"
              class="textarea"
              placeholder="Расскажите, что есть в квартире и рядом с домом, опишите состояние жилья."
              v-model="form.description"
          ></textarea>
        </div>
        <div class="actions">
          <!-- Кнопка "Опубликовать", отправка данных на сервер -->
          <button @click.prevent="publishAd" class="button primary">Опубликовать</button>
          <!-- Кнопка "Сохранить и выйти" -->
          <button @click.prevent="saveAndExit" class="button secondary">Сохранить и выйти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios'; // Импортируем Axios для HTTP запросов
import { thisUrl } from '../url.js'; // Путь к файлу с URL API
import Cookies from 'js-cookie'; // Импортируем js-cookie для работы с куками

// ref для управления текущим шагом формы
const step = ref(1);
// ref для доступа к элементу input type="file"
const photoInput = ref(null);

// reactive для хранения данных формы
const form = reactive({
  type_rent_id: '',
  type_realty_id: '',
  address: '',
  price: '',
  count_rooms: '',
  total_square: '',
  living_square: '',
  kitchen_square: '',
  floor: '',
  repair_id: '',
  year_construction: '',
  image: null,
  description: '',
  photos: [],

  rent_price: '',
  deposit: '',
  utilities_payer: '',
  other_utilities_payer: '',
  rent_duration: '',
  can_have_children: false,
  can_have_pets: false,
  can_smoke: false,
  contact_name: '',
  contact_phone: '',
});

// ref для хранения опций для select-ов
const rentTypeOptions = ref([]);
const propertyTypeOptions = ref([]);
const repairTypeOptions = ref([]);
const roomOptions = ref(['студия', '1', '2', '3', '4', '5', '6+', 'свободная планировка']);


// Функция для получения данных с сервера (типы недвижимости, типы ремонта и т.д.)
const fetchData = async () => {
  try {
    const response = await axios.get(`${thisUrl()}/realty/filter`);
    console.log('Data from API:', response.data);

    setSelectOptions(response.data);
  } catch (error) {
    console.error('Fetching data error:', error);
  }
};

// Функция для установки опций для select-ов
const setSelectOptions = (data) => {
  propertyTypeOptions.value = data.propertyTypes;
  rentTypeOptions.value = data.rentTypes;
  repairTypeOptions.value = data.renovationTypes;
  console.log(rentTypeOptions.value);
};

// Функция для открытия файлового менеджера
const openFileSelector = () => {
  photoInput.value.click();
};

// Вызываем fetchData при монтировании компонента
onMounted(fetchData);

// Методы для навигации по шагам
const nextStep = () => {
  step.value = 2;
};

const prevStep = () => {
  step.value = 1;
};

// Функция для добавления фотографии в массив form.photos
const addPhoto = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.photos.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

// Функции для работы с фотографиями (заглушки)
const setMainPhoto = (index) => {
  console.log('Set main photo', index);
};

const rotatePhoto = (index) => {
  console.log('Rotate photo', index);
};

const removePhoto = (index) => {
  form.photos.splice(index, 1);
};

// Функция для отправки данных на сервер
const publishAd = async () => {
  try {
    const formData = new FormData();

    // Добавляем все текстовые поля
    Object.entries(form).forEach(([key, value]) => {
      if (key !== 'photos' && value !== null) {
        formData.append(key, value);
      }
    });

    // Обрабатываем фотографии
    if (form.photos && form.photos.length > 0) {
      form.photos.forEach((photo, index) => {
        if (photo instanceof File) {
          formData.append('images[]', photo); // Отправляем как массив файлов
        } else if (typeof photo === 'string' && photo.startsWith('data:image')) {
          // Конвертируем base64 в Blob
          const byteString = atob(photo.split(',')[1]);
          const mimeString = photo.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          const file = new File([blob], `image_${index}.${mimeString.split('/')[1]}`, { type: mimeString });
          formData.append('images[]', file);
        }
      });
    }

    const token = Cookies.get('authToken');
    const response = await axios.post(`${thisUrl()}/realty/store`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });

    console.log('Success:', response.data);

  } catch (error) {
    console.error('Error:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      alert(`Ошибка: ${error.response.data.message || 'Неизвестная ошибка сервера'}`);
    }
  }
};
// Функция для сохранения данных и выхода (заглушка)
const saveAndExit = () => {
  console.log('Save and exit');
  // Здесь должен быть код для сохранения данных и перенаправления пользователя
};
</script>

<style scoped>
/* Стили для компонента (оставлены без изменений) */
.container {
  display: flex;
  background-color: rgba(242, 240, 238, 1);
}

.content-container {
  margin-top: 10%;
  margin-right: 23px;
  margin-left: 23px;
  margin-bottom: 17%;
  font-family: Arial, sans-serif;
  background-color: rgba(242, 240, 238, 1);
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.section {
  margin-bottom: 30px;
}

.label {
  display: block;
  font-size: 16px;
  margin-bottom: 10px;
}

.input,
.select,
.textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  max-width: 650px;
}

.checkbox-group h4 {
  margin: 5px 0;
  font-size: 18px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.actions {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.button {
  padding: 15px 30px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  border: none;
}

.button.primary {
  background-color: #ff6b00;
  color: white;
}

.button.secondary {
  background-color: #f2f2f2;
  color: #333;
}

.form-group {
  margin-bottom: 2%;
}

.form-group-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.form-group.small {
  flex: 1;
  width: 100%;
  max-width: 200px;
}

.input.small {
  width: 100%;
}

/* Стили для полей с площадью */
.form-group.area {
  flex: 1;
  position: relative;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input.area {
  width: 100%;
  padding-right: 35px;
  box-sizing: border-box;
}

.unit {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: black;
}

/* Стили для второго этапа (фотографии и описание) */
.photo-upload {
  margin-bottom: 20px;
}

.photo-previews {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.photo-preview {
  width: 150px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.photo-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.photo-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 12px;
}

.photo-actions a {
  color: white;
  text-decoration: none;
}

.add-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #888;
  cursor: pointer;
}

.textarea {
  height: 150px;
  resize: vertical;
}

.back-link {
  display: block;
  margin-bottom: 20px;
  color: #007bff;
  text-decoration: none;
}
</style>
