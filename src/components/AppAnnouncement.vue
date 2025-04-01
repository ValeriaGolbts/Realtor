<template>
  <div class="container">
    <div class="content-container">
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
              <a href="#" class="leave-review-link" @click.prevent="openReviewModal">Оставить отзыв</a>
            </div>
            <div class="price">
              {{ formattedPrice }} ₽ / мес
              <span class="old-price" v-if="apartment.old_price">{{ formattedOldPrice }} ₽</span>
            </div>

            <div class="details-grid">
              <div class="detail-item">
                <div class="data">{{ apartment.count_rooms }} комн.</div>
                <div class="detail-label">{{ apartment.type_realty?.title || 'Тип не указан' }}</div>
              </div>
              <div class="detail-item">
                <div class="data">{{ apartment.total_square }}</div>
                <div class="detail-label">общая пл</div>
              </div>
              <div class="detail-item">
                <div class="data">{{ apartment.floor }}{{ apartment.max_floor }}</div>
                <div class="detail-label">этаж</div>
              </div>
            </div>

            <div class="address-text">{{ apartment.address || 'Адрес не указан' }}</div>
            <button class="show-phone-button" @click="togglePhone">
              {{ showPhone ? apartment.owner.phone : 'ПОКАЗАТЬ НОМЕР ТЕЛЕФОНА' }}
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
          <li>Ремонт: {{ apartment.type_repair?.title || 'Не указано' }}</li>
          <li>Этаж: {{ apartment.floor || 'Не указано' }}</li>
          <li>Год постройки дома: {{ apartment.year_construction || 'Не указано' }}</li>
        </ul>
      </section>
    </div>
    <ReviewModal
        v-if="apartment.id"
        :isOpen="reviewModalOpen"
        :realtyId="apartment.id"
        @update:isOpen="reviewModalOpen = $event"
        @review-submitted="handleReviewSubmitted"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { thisUrl } from '../url.js';
import ReviewModal from '/src/components/AppReviews.vue'

const route = useRoute();
const router = useRouter();
const apartmentId = route.params.id;
const reviewModalOpen = ref(false);
// Дефолтные изображения
const defaultImage = ref('/images/default-apartment.jpg');

// Состояние компонента
const apartment = ref({
  id: null,
  images: [],
  price: 0,
  count_rooms: '',
  total_square: 0,
  living_square: 0,
  kitchen_square: 0,
  floor: 0,
  max_floor: 0,
  address: '',
  rating: null,
  contact_phone: '',
  description: '',
  year_construction: 0,
  type_rent: null,
  type_realty: null,
  type_repair: null,
});

const currentImage = ref('');
const showPhone = ref(false);
const isOwner = ref(false);

// Форматированные значения
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU').format(apartment.value.price);
});



const openReviewModal = () => {
  reviewModalOpen.value = true;
};

const handleReviewSubmitted = () => {
  fetchApartmentData();
};

// Методы
const fetchApartmentData = async () => {
  try {
    // Используем endpoint для получения конкретной квартиры
    const response = await axios.get(`${thisUrl()}/realty/show/${apartmentId}`);

    if (response.data) {
      apartment.value = response.data;

      // Проверяем наличие изображений
      if (Array.isArray(apartment.value.images) && apartment.value.images.length > 0) {
        currentImage.value = apartment.value.images[0];
      } else {
        currentImage.value = defaultImage.value;
      }

      // Логируем полученные данные для отладки
      console.log('Данные квартиры:', response.data);
    } else {
      router.push('/not-found');
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    router.push('/not-found');
  }
};

// Переключение видимости телефона
const togglePhone = () => {
  showPhone.value = !showPhone.value;

  // Можно добавить логирование для отладки
  if (showPhone.value) {
    console.log('Показан телефон:', apartment.value.user?.phone);
  }
};



onMounted(() => {
  fetchApartmentData();
});
</script>

<style scoped>
main{
  background-color: rgba(242, 240, 238, 1);
}
/* Стили остаются без изменений */
.container {
  display: flex;
  background-color: rgba(242, 240, 238, 1);
}

.content-container {
  margin-top: 6%;
  margin-right: 23px;
  margin-left: 160px;
}

.apartment-details {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.image-gallery-container {
  flex: 1;
  min-width: 0;
  width: 790px;
}

.main-image-wrapper {
  position: relative;
  margin-bottom: 10px;
}

.main-image {
  width: 100%;
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
  width: 150px;
  height: 90px;
  object-fit: cover;
  border-radius: 4px;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.active-thumbnail {
  border-color: #ff6600;
}
.data{
  font-size: 21px;
}
.details {
  flex: 1;
  width: 790px;
}

.detail {
  background-color: black;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  color: white;
  height: 449px;
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
  display: flex;
  gap: 15px;
  margin: 20px 0;
}

.detail-item {
  width: 120px;
  height: 62px;
  text-align: center;
  border: 1px solid rgba(67, 67, 67, 1);
  border-radius: 5px;
}

.detail-label {
  font-size: 17px;
  color: #6c757d;
  margin-top: 5px;
}

.address-text {
  margin: 15px 0;
  font-size: 16px;
  margin-bottom: 17%;
}

.show-phone-button {
  width: 100%;
  max-width: 750px;
  height: 56px;
  padding: 10px;
  background-color: rgba(255, 120, 79, 1);
  color: black;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 15px;
  font-size: 13px;
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
  position: relative;
}

.rating {
  margin-bottom: 7%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.leave-review-link {
  color: #ff6600;
  text-decoration: none;
  font-size: 14px;
}

.leave-review-link:hover {
  text-decoration: underline;
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