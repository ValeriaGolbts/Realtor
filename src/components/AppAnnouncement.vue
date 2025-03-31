<template>
  <div class="app">
    <main class="main-content">
      <section class="apartment-details">
        <!-- Галерея изображений -->
        <div class="image-gallery-container">
          <div class="main-image-wrapper">
            <img
                :src="currentImage || defaultImage"
                alt="Apartment photo"
                class="main-image"
                @error="handleImageError"
            />
          </div>

          <div class="thumbnails-scroll-container">
            <div class="thumbnails-wrapper">
              <div
                  v-for="(image, index) in apartment.images"
                  :key="index"
                  class="thumbnail-container"
                  @click="selectImage(image)"
              >
                <img
                    :src="image || defaultImage"
                    alt="Thumbnail"
                    class="thumbnail"
                    :class="{ 'active-thumbnail': currentImage === image }"
                    @error="handleThumbnailError(index)"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="details">
          <div class="detail">
            <div class="rating">
              <span>{{ apartment.rating || 'Нет оценок' }}</span>
              <span v-for="i in 5" :key="i">⭐</span>
            </div>
            <div class="price">
              {{ formattedPrice }} ₽ / мес
              <span class="old-price" v-if="apartment.old_price">{{ formattedOldPrice }} ₽</span>
            </div>

            <div class="details-grid">
              <div class="detail-item">
                <div>{{ apartment.count_rooms }} комн.</div>
                <div class="detail-label">{{ apartment.type_realty?.title || 'Тип не указан' }}</div>
              </div>
              <div class="detail-item">
                <div>{{ apartment.total_square }}</div>
                <div class="detail-label">общая пл</div>
              </div>
              <div class="detail-item">
                <div>{{ apartment.floor }}/{{ apartment.max_floor }}</div>
                <div class="detail-label">этаж</div>
              </div>
            </div>

            <div class="address-text">{{ apartment.address || 'Адрес не указан' }}</div>
            <button class="show-phone-button" @click="togglePhone">
              {{ showPhone ? apartment.contact_phone : 'Показать номер телефона' }}
            </button>
          </div>

          <div class="author">
            <img
                :src="apartment.user?.avatar"
                alt="Author"
                class="author-avatar"
            />
            <span>{{ apartment.user?.name || 'Автор не указан' }}</span>
          </div>
        </div>
      </section>

      <section class="description">
        <h2>Описание</h2>
        <p>{{ apartment.description || 'Описание отсутствует' }}</p>
      </section>

      <section class="general-info">
        <h2>Общая информация</h2>
        <ul>
          <li>Тип аренды: {{ apartment.type_rent?.title || 'Не указано' }}</li>
          <li>Тип недвижимости: {{ apartment.type_realty?.title || 'Не указано' }}</li>
          <li>Кол-во комнат: {{ apartment.count_rooms || 'Не указано' }}</li>
          <li>Общая площадь: {{ apartment.total_square || 'Не указано' }} м²</li>
          <li>Жилая площадь: {{ apartment.living_square || 'Не указано' }} м²</li>
          <li>Площадь кухни: {{ apartment.kitchen_square || 'Не указано' }} м²</li>
          <li>Балкон/лоджия: {{ apartment.balcony ? 'Есть' : 'Нет' }}</li>
          <li>Ремонт: {{ apartment.type_repair?.title || 'Не указано' }}</li>
          <li>Этаж: {{ apartment.floor || 'Не указано' }}</li>
          <li>Год постройки дома: {{ apartment.year_construction || 'Не указано' }}</li>
        </ul>
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

// Дефолтные изображения
const defaultImage = ref('/images/default-apartment.jpg');
const defaultAvatar = ref('/images/default-avatar.jpg');

// Состояние компонента
const apartment = ref({
  id: null,
  images: [],
  price: 0,
  old_price: null,
  count_rooms: '',
  total_square: 0,
  living_square: 0,
  kitchen_square: 0,
  floor: 0,
  max_floor: 0,
  address: '',
  rating: null,
  contact_phone: '',
  payment: '',
  deposit: '',
  rental_period: '',
  description: '',
  balcony: false,
  year_construction: 0,
  type_rent: null,
  type_realty: null,
  type_repair: null,
  user: null
});

const currentImage = ref('');
const showPhone = ref(false);
const isOwner = ref(false);

// Форматированные значения
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU').format(apartment.value.price);
});

const formattedOldPrice = computed(() => {
  return apartment.value.old_price ? new Intl.NumberFormat('ru-RU').format(apartment.value.old_price) : '';
});

// Методы
const fetchApartmentData = async () => {
  try {
    const response = await axios.get(`${thisUrl()}/realty/filter`, {
      params: {
        id: apartmentId
      }
    });

    // Находим нужное объявление (так как /filter возвращает массив)
    const listing = response.data.listings.find(item => item.id == apartmentId);

    if (listing) {
      apartment.value = listing;

      // Обрабатываем изображения
      if (Array.isArray(apartment.value.images)) {
        currentImage.value = apartment.value.images[0] || defaultImage.value;
      } else {
        apartment.value.images = [];
        currentImage.value = defaultImage.value;
      }

      // Проверяем владельца
      const userId = localStorage.getItem('userId');
      isOwner.value = userId && apartment.value.user_id === parseInt(userId);
    } else {
      router.push('/not-found');
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    router.push('/not-found');
  }
};

const selectImage = (image) => {
  currentImage.value = image || defaultImage.value;
};

const togglePhone = () => {
  showPhone.value = !showPhone.value;
};

// Обработчики ошибок изображений
const handleImageError = () => {
  currentImage.value = defaultImage.value;
};

const handleThumbnailError = (index) => {
  apartment.value.images[index] = defaultImage.value;
};


onMounted(() => {
  fetchApartmentData();
});
</script>

<style scoped>
/* Стили остаются без изменений */
.app {
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
}

.main-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10%;
}

.apartment-details {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.image-gallery-container {
  flex: 1;
  min-width: 0;
}

.main-image-wrapper {
  position: relative;
  margin-bottom: 10px;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.thumbnails-scroll-container {
  overflow-x: auto;
}

.thumbnails-wrapper {
  display: flex;
  gap: 10px;
  padding-bottom: 10px;
}

.thumbnail-container {
  cursor: pointer;
}

.thumbnail {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.active-thumbnail {
  border-color: #ff6600;
}

.details {
  flex: 1;
  min-width: 300px;
}

.detail {
  background-color: black;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  color: white;
}

.rating {
  margin-bottom: 10px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.old-price {
  text-decoration: line-through;
  color: #6c757d;
  margin-left: 10px;
  font-size: 16px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin: 20px 0;
}

.detail-item {
  text-align: center;
}

.detail-label {
  font-size: 14px;
  color: #6c757d;
  margin-top: 5px;
}

.address-text {
  margin: 15px 0;
  font-size: 16px;
}

.show-phone-button {
  width: 100%;
  padding: 10px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 15px;
}

.owner-buttons {
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.edit-btn {
  background-color: #28a745;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.author {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 15px;
  border-top: 1px solid #dee2e6;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

section {
  margin-bottom: 30px;
}

h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #343a40;
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

@media (max-width: 768px) {
  .apartment-details {
    flex-direction: column;
  }

  .details-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>