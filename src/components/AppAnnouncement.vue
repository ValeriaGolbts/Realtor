<template>
  <div class="app">
    <main class="main-content">
      <section class="apartment-details">
        <div class="image-gallery">
          <img :src="currentImage" alt="Main Apartment Image" class="main-image" />
          <div class="thumbnails">
            <img
                v-for="(image, index) in apartment.images"
                :key="index"
                :src="image"
                alt="Apartment Image"
                class="thumbnail"
                :class="{ active: currentImage === image }"
                @click="selectImage(image)"
            />
          </div>
        </div>

        <div class="details">
          <div class="rating">
            <span>{{ apartment.rating }}</span>
            <span v-for="i in 5" :key="i">⭐</span>
          </div>
          <div class="price">
            {{ formattedPrice }} ₽ / мес
            <span class="old-price" v-if="apartment.old_price">{{ formattedOldPrice }} ₽</span>
          </div>
          <div class="address">
            {{ apartment.count_rooms }} комн. {{ apartment.total_square }} м² {{ apartment.floor }}/{{ apartment.max_floor }} эт.
          </div>
          <div class="address-text">{{ formattedAddress }}</div>
          <button class="show-phone-button" @click="togglePhone">
            {{ showPhone ? apartment.contact_phone : 'Показать номер телефона' }}
          </button>
          <div class="author">
            <img :src="apartment.author?.avatar" alt="Author Avatar" class="author-avatar" />
            <span>{{ apartment.author?.name }}</span>
          </div>
          <button v-if="isOwner" @click="editApartment" class="edit-btn">Редактировать</button>
          <button v-if="isOwner" @click="deleteApartment" class="delete-btn">Удалить</button>
        </div>
      </section>

      <section class="amenities">
        <h2>Условия проживания</h2>
        <ul>
          <li>Оплата КЖК: {{ apartment.payment || 'Не указано' }}</li>
          <li>Залог: {{ apartment.deposit || 'Не указано' }}</li>
          <li>Срок аренды: {{ apartment.rental_period || 'Не указано' }}</li>
          <li>Условия проживания:
            <span v-if="apartment.can_have_children">Можно с детьми, </span>
            <span v-if="apartment.can_have_pets">Можно с животными, </span>
            <span v-if="apartment.can_smoke">Можно курить</span>
            <span v-if="!apartment.can_have_children && !apartment.can_have_pets && !apartment.can_smoke">Не указано</span>
          </li>
        </ul>
      </section>

      <section class="description">
        <h2>Описание</h2>
        <p>{{ apartment.description || 'Описание отсутствует' }}</p>
      </section>

      <section class="general-info">
        <h2>Общая информация</h2>
        <ul>
          <li>Кол-во комнат: {{ apartment.count_rooms || 'Не указано' }}</li>
          <li>Общая площадь: {{ apartment.total_square || 'Не указано' }} м²</li>
          <li>Жилая площадь: {{ apartment.living_square || 'Не указано' }} м²</li>
          <li>Площадь кухни: {{ apartment.kitchen_square || 'Не указано' }} м²</li>
          <li>Балкон/лоджия: {{ apartment.balcony ? 'Есть' : 'Нет' }}</li>
          <li>Ремонт: {{ apartment.repair_type || 'Не указано' }}</li>
          <li>Этаж: {{ apartment.floor || 'Не указано' }}</li>
          <li>Год постройки дома: {{ apartment.year_construction || 'Не указано' }}</li>
        </ul>
      </section>

      <section class="map">
        <h2>Расположение на карте</h2>
        <div class="map-container" ref="mapContainer"></div>
      </section>

      <section class="available-items">
        <h2>В квартире есть</h2>
        <ul v-if="apartment.amenities && apartment.amenities.length">
          <li v-for="(item, index) in apartment.amenities" :key="index">{{ item }}</li>
        </ul>
        <p v-else>Информация о доступных предметах отсутствует</p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { thisUrl } from '../url.js';

const route = useRoute();
const router = useRouter();
const apartmentId = route.params.id;

// Состояние компонента
const apartment = ref({
  id: null,
  images: [],
  price: 0,
  old_price: 0,
  count_rooms: 0,
  total_square: 0,
  living_square: 0,
  kitchen_square: 0,
  floor: 0,
  max_floor: 0,
  address: '',
  rating: 0,
  contact_phone: '',
  author: {
    id: null,
    avatar: '',
    name: '',
  },
  payment: '',
  deposit: '',
  rental_period: '',
  can_have_children: false,
  can_have_pets: false,
  can_smoke: false,
  description: '',
  repair_type: '',
  balcony: false,
  year_construction: 0,
  amenities: []
});

const currentImage = ref('');
const showPhone = ref(false);
const isOwner = ref(false);

// Форматированные значения
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU').format(apartment.value.price);
});

const formattedOldPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU').format(apartment.value.old_price);
});

const formattedAddress = computed(() => {
  return apartment.value.address || 'Адрес не указан';
});

// Методы
const fetchApartmentData = async () => {
  try {
    const response = await axios.get(`${thisUrl()}/show/${apartmentId}`);
    apartment.value = response.data;

    // Устанавливаем первое изображение как текущее
    if (apartment.value.images?.length) {
      currentImage.value = apartment.value.images[0];
    }

    // Проверяем, является ли текущий пользователь владельцем
    const userId = localStorage.getItem('userId');
    isOwner.value = userId && apartment.value.author?.id === parseInt(userId);
  } catch (error) {
    console.error('Ошибка при загрузке данных об квартире:', error);
    router.push('/not-found');
  }
};

const selectImage = (image) => {
  currentImage.value = image;
};

const togglePhone = () => {
  showPhone.value = !showPhone.value;
};

const editApartment = () => {
  router.push(`/create_announ/${apartmentId}`);
};

const deleteApartment = async () => {
  try {
    await axios.delete(`${thisUrl()}/realty/delete/${apartmentId}`);
    router.push('/filters-search');
  } catch (error) {
    console.error('Ошибка при удалении объявления:', error);
  }
};

// Хуки жизненного цикла
onMounted(() => {
  fetchApartmentData();
});
</script>

<style scoped>
/* Общие стили */
.app {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
  background-color: #f9f9f9;
  padding: 20px;
}

.main-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Галерея изображений */
.image-gallery {
  margin-bottom: 30px;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.thumbnail {
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
}

.thumbnail.active {
  border-color: #ff6600;
}

/* Детали квартиры */
.details {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.rating {
  font-size: 16px;
  margin-bottom: 10px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.old-price {
  text-decoration: line-through;
  color: #bdc3c7;
  margin-left: 10px;
  font-size: 18px;
}

.address {
  font-size: 16px;
  margin-bottom: 5px;
}

.address-text {
  margin: 10px 0;
  font-size: 14px;
}

.show-phone-button {
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin: 10px 0;
  width: 100%;
}

.author {
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #34495e;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

/* Секции с информацией */
section {
  margin-bottom: 30px;
}

h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #2c3e50;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
}

li:before {
  content: "•";
  color: #ff6600;
  position: absolute;
  left: 0;
}

/* Карта */
.map-container {
  height: 400px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

/* Похожие объявления */
.similar-listings {
  margin-top: 40px;
}

.listings-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.listing-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  position: relative;
}

.listing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.listing-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.listing-details {
  padding: 15px;
}

.listing-price {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
}

.listing-info {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.listing-address {
  font-size: 14px;
  color: #777;
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #aaa;
  cursor: pointer;
  z-index: 10;
}

.favorite-icon.favorited {
  color: #ff6600;
}

/* Адаптивность */
@media (max-width: 768px) {
  .apartment-details {
    flex-direction: column;
  }

  .image-gallery, .details {
    width: 100%;
  }

  .main-image {
    height: 300px;
  }

  .listings-container {
    grid-template-columns: 1fr;
  }
}
</style>
