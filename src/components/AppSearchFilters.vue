<template>
  <div class="container">
    <div class="content-container">
      <div class="title">Долгосрочная аренда 1-комн <br> и 2-комн квартир</div>
      <div class="adv">
        <span class="label">{{ itemCount }} ОБЪЯВЛЕНИЯ</span>
      </div>
      <div class="search-and-sort">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Q Адрес, район, улица"
            class="address-search-input"
        />
        <img
            src="./icons/sort.svg"
            alt="Сортировка"
            class="sort-icon"
            @click="toggleSortOrder"
        />
      </div>
      <div class="main-content">
        <!-- Фильтры -->
        <div class="filters">
          <div class="filter-container">
            <div class="filter-header">
              <h3 class="filter-title">Фильтр</h3>
              <button class="clear-btn" @click="resetFilters">Сбросить</button>
            </div>

            <div class="filter-group">
              <label>Тип аренды</label>
              <div class="rent-type-buttons">
                <button
                    :class="{ active: filters.rentType === 'longTerm' }"
                    @click="setRentType('longTerm')"
                >Долгосрочная</button>
                <button
                    :class="{ active: filters.rentType === 'shortTerm' }"
                    @click="setRentType('shortTerm')"
                >Посуточная</button>
              </div>
            </div>

            <div class="filter-group">
              <label>Тип недвижимости</label>
              <div class="property-types">
                <button
                    v-for="type in propertyTypes"
                    :key="type.id"
                    :class="{ active: filters.propertyType === type.id }"
                    @click="selectPropertyType(type.id)"
                    class="property-type-item"
                >{{ type.name }}</button>
              </div>
            </div>

            <div class="filter-group">
              <label>Цена</label>
              <div class="price-range">
                <div class="slider-container">
                  <div class="slider">
                    <div class="slider-track" :style="sliderTrackStyle"></div>
                    <input
                        type="range"
                        :min="priceRange.min"
                        :max="priceRange.max"
                        v-model.number="filters.minPrice"
                        @input="updateRange"
                        class="slider-input min"
                    />
                    <input
                        type="range"
                        :min="priceRange.min"
                        :max="priceRange.max"
                        v-model.number="filters.maxPrice"
                        @input="updateRange"
                        class="slider-input max"
                    />
                  </div>
                </div>
                <div class="price-inputs">
                  <input
                      class="input"
                      type="number"
                      v-model.number="filters.minPrice"
                      placeholder="От"
                      @input="updateRange"
                  />
                  <input
                      class="input"
                      type="number"
                      v-model.number="filters.maxPrice"
                      placeholder="До"
                      @input="updateRange"
                  />
                </div>
              </div>
            </div>

            <div class="filter-group">
              <label>Кол-во комнат</label>
              <div class="rooms-selection">
                <button
                    v-for="room in availableRooms"
                    :key="room.id"
                    :class="{ active: filters.rooms.includes(room.id) }"
                    @click="toggleRoom(room.id)"
                    class="room-item"
                >{{ room.name }}</button>
              </div>
            </div>

            <div class="filter-group">
              <label>Общая площадь</label>
              <div class="area-inputs">
                <div class="area-input-container">
                  <input
                      class="input"
                      type="number"
                      v-model.number="filters.minTotalArea"
                      placeholder="От"
                  />
                  <span class="area-unit">м²</span>
                </div>
                <div class="area-input-container">
                  <input
                      class="input"
                      type="number"
                      v-model.number="filters.maxTotalArea"
                      placeholder="До"
                  />
                  <span class="area-unit">м²</span>
                </div>
              </div>
            </div>

            <div class="filter-group">
              <label>Жилая площадь</label>
              <div class="area-inputs">
                <div class="area-input-container">
                  <input
                      class="input"
                      type="number"
                      v-model.number="filters.minLivingArea"
                      placeholder="От"
                  />
                  <span class="area-unit">м²</span>
                </div>
                <div class="area-input-container">
                  <input
                      class="input"
                      type="number"
                      v-model.number="filters.maxLivingArea"
                      placeholder="До"
                  />
                  <span class="area-unit">м²</span>
                </div>
              </div>
            </div>

            <div class="filter-group">
              <label>Этаж</label>
              <div class="floor-inputs">
                <input
                    class="input"
                    type="number"
                    v-model.number="filters.minFloor"
                    placeholder="От"
                />
                <input
                    class="input"
                    type="number"
                    v-model.number="filters.maxFloor"
                    placeholder="До"
                />
              </div>
            </div>

            <div class="filter-group">
              <label>Ремонт</label>
              <div class="renovation-types">
                <button
                    v-for="type in renovationTypes"
                    :key="type.id"
                    :class="{ active: filters.renovationType === type.id }"
                    @click="selectRenovationType(type.id)"
                    class="renovation-type-item"
                >{{ type.name }}</button>
              </div>
            </div>

            <button class="apply-filters-btn" @click="applyFilters">
              Загрузить ещё
            </button>
          </div>
          <!-- Пагинация -->
          <div class="pagination">
            <!-- Кнопка "Назад" -->
            <button
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)"
                class="pagination-button"
            >
              <img
                  src="./icons/Arrow-left.svg"
                  alt="Назад"
                  class="arrow-icon"
                  :class="{ disabled: currentPage === 1 }"
              />
            </button>

            <!-- Номера страниц -->
            <div class="page-numbers">
              <button
                  v-for="page in visiblePages"
                  :key="page"
                  :class="{ active: page === currentPage }"
                  @click="changePage(page)"
                  class="page-number"
              >
                {{ page }}
              </button>
              <span class="dots" v-if="showEllipsisAfter">...</span>
              <button
                  v-if="showLastPage"
                  @click="changePage(totalPages)"
                  class="page-number"
              >
                {{ totalPages }}
              </button>
            </div>

            <!-- Кнопка "Вперед" -->
            <button
                :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)"
                class="pagination-button"
            >
              <img
                  src="./icons/Arrow-right.svg"
                  alt="Вперед"
                  class="arrow-icon"
                  :class="{ disabled: currentPage === totalPages }"
              />
            </button>
          </div>
        </div>

        <!-- Список объявлений -->
        <div class="listings-container">
          <template v-if="listings.length > 0">
            <div
                v-for="(listing, index) in listings"
                :key="index"
                class="listing"
            >
              <div class="listing-image-container">
                <img
                    :src="listing.image"
                    alt="Квартира"
                    class="listing-image"
                />
                <span
                    v-if="listing.oldPrice && listing.oldPrice.trim() !== ''"
                    class="good-price"
                >Хорошая цена</span
                >
                <img
                    class="heart-on-image"
                    @click="toggleFavorite(index)"
                    :src="listing.isFavorited ? fullShape : shape"
                    alt="Добавить в избранное"
                />
              </div>
              <div class="listing-info">
                <span class="price">{{ listing.price }} ₽ / мес</span><br />
                <span class="old-price" v-if="listing.oldPrice">{{listing.oldPrice }} ₽</span>
                <p class="details">{{ listing.details }}</p>
                <p class="complex-name">
                  <strong>{{ listing.complex }}</strong>
                </p>
                <p class="address">{{ listing.address }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-listings">
              <p>Нет объявлений, соответствующих вашим критериям.</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const itemCount = ref(0);
const priceRange = ref({ min: 5000, max: 1000000 });
const searchQuery = ref('');
const sortOrder = ref('asc'); // 'asc' или 'desc'

const filters = ref({
  rentType: null,
  propertyType: null,
  minPrice: 5000,
  maxPrice: 1000000,
  rooms: [],
  minTotalArea: null,
  maxTotalArea: null,
  minLivingArea: null,
  maxLivingArea: null,
  minFloor: null,
  maxFloor: null,
  renovationType: null,
});

const propertyTypes = ref([]);
const renovationTypes = ref([]);
const roomsByPropertyType = ref({});
const currentPage = ref(1);
const totalPages = ref(20); // Заменить на динамическое значение
const maxVisiblePages = ref(5);
const listings = ref([
  {
    image: './icons/Photo.svg',
    price: '20 000',
    oldPrice: '21 000',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false,
  },
  {
    image: './icons/Photo.svg',
    price: '20 000',
    oldPrice: '',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false,
  },
  {
    image: './icons/Photo.svg',
    price: '20 000',
    oldPrice: '21 000',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false,
  },

  {
    image: './icons/Photo.svg',
    price: '20 000',
    oldPrice: '',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false,
  },
  {
    image: './icons/Photo.svg',
    price: '20 000',
    oldPrice: '21 000',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false,
  },
  {
    image: './icons/Photo.svg',
    price: '20 000',
    oldPrice: '21 000',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false,
  },
  {
    image: './icons/Photo.svg',
    price: '20 000',
    oldPrice: '21 000',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false,
  },
  {
    image: '/icons/Photo.svg',
    price: '20 000',
    oldPrice: '21 000',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false,
  },
]);
// Данные объявлений
// const listings = ref([]);
const fullShape = '/path/to/full-heart-icon.svg';
const shape = '/path/to/empty-heart-icon.svg';

const visiblePages = computed(() => {
  const pages = [];
  const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages.value / 2));
  const endPage = Math.min(totalPages.value, startPage + maxVisiblePages.value - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const showEllipsisAfter = computed(() => {
  return visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1;
});

const showLastPage = computed(() => {
  return visiblePages.value[visiblePages.value.length - 1] < totalPages.value;
});

// Метод для изменения страницы
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchData(page);
  }
};

const fetchData = async (page) => {
  try {
    const response = await axios.get(
        `https://api.example.com/items?page=${page}&search=${searchQuery.value}&sort=${sortOrder.value}`
    );
    listings.value = response.data.listings;
    console.log('Данные страницы:', response.data);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};
const searchListings = () => {
  // TODO: Реализовать логику поиска здесь
  console.log('Выполняется поиск по запросу:', searchQuery.value);
  // потребуется отфильтровать данные на основе searchQuery.value
  // И обновить массив listings
};

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  // TODO: Реализуйте логику сортировки здесь
  console.log('Изменение порядка сортировки на:', sortOrder.value);
  // потребуется отсортировать массив listings на основе sortOrder.value
};
onMounted(() => {
  fetchData(currentPage.value);
});

const fetchInitialData = async () => {
  try {
    const response = await axios.get('https://api.example.com/initial-data');
    propertyTypes.value = response.data.propertyTypes;
    renovationTypes.value = response.data.renovationTypes;
    roomsByPropertyType.value = response.data.roomsByPropertyType;
    itemCount.value = response.data.itemCount;
    priceRange.value = response.data.priceRange;
  } catch (error) {
    console.error('Ошибка при получении начальных данных:', error);
  }
};

onMounted(fetchInitialData);

const availableRooms = computed(() => {
  return filters.value.propertyType
      ? roomsByPropertyType.value[filters.value.propertyType] || []
      : [];
});

const sliderTrackStyle = computed(() => {
  const minPercentage =
      ((filters.value.minPrice - priceRange.value.min) /
          (priceRange.value.max - priceRange.value.min)) *
      100;
  const maxPercentage =
      ((filters.value.maxPrice - priceRange.value.min) /
          (priceRange.value.max - priceRange.value.min)) *
      100;

  return {
    left: `${minPercentage}%`,
    width: `${maxPercentage - minPercentage}%`,
  };
});

const setRentType = (type) => {
  filters.value.rentType = type;
};

const selectPropertyType = (typeId) => {
  filters.value.propertyType = typeId;
  filters.value.rooms = [];
};

const toggleRoom = (roomId) => {
  const index = filters.value.rooms.indexOf(roomId);
  if (index > -1) {
    filters.value.rooms.splice(index, 1);
  } else {
    filters.value.rooms.push(roomId);
  }
};

const selectRenovationType = (typeId) => {
  filters.value.renovationType = typeId;
};

const updateRange = () => {
  if (filters.value.minPrice > filters.value.maxPrice) {
    [filters.value.minPrice, filters.value.maxPrice] = [
      filters.value.maxPrice,
      filters.value.minPrice,
    ];
  }
};

const resetFilters = () => {
  Object.assign(filters.value, {
    rentType: null,
    propertyType: null,
    minPrice: priceRange.value.min,
    maxPrice: priceRange.value.max,
    rooms: [],
    minTotalArea: null,
    maxTotalArea: null,
    minLivingArea: null,
    maxLivingArea: null,
    minFloor: null,
    maxFloor: null,
    renovationType: null,
  });
};

const applyFilters = async () => {
  try {
    const response = await axios.post(
        'https://api.example.com/apply-filters',
        filters.value
    );
    itemCount.value = response.data.itemCount;
    listings.value = response.data.listings;
  } catch (error) {
    console.error('Ошибка при применении фильтров:', error);
  }
};

// Функция для переключения избранного
const toggleFavorite = (index) => {
  listings.value[index].isFavorited = !listings.value[index].isFavorited;
};
</script>

<style scoped>
.dots {
  color: white;
  font-size: 18px;
  margin-top: 7%;
  margin-right: 3%;

}

.title {
  font-size: 40px;
  color: white;
  margin-bottom: 6%;
}

.adv {
  margin-bottom: 2%;
}

.label {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

.container {
  display: flex;
  background-color: black;
}

.content-container {
  margin-top: 10%;
  margin-right: 23px;
  margin-left: 23px;
}

.search-and-sort {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.address-search-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  width: 300px;
  margin-right: 10px;
}
.sort-icon {
  width: 24px;
  height: auto;
  cursor: pointer;
}

.main-content {
  display: flex;
  flex-grow: 1;
}

.filters {
  display: flex;
  margin-right: 20px;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
}

.filter-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 427px;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.clear-btn {
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s ease;
}

.clear-btn:hover {
  color: rgba(255, 120, 79, 1);
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group label {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #444;
  margin-bottom: 0.5rem;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 5px;
}

button {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.pagination-button{
  width: 21%;
  height: 90%;
padding: 0px 0px;
}
.page-numbers{
  display: flex;
}
.page-number{
  width: 21px;
  height: 31px;
  border-radius: 2px;
  font-size: 13px;
  padding: 1px;
  margin-right: 8px;
}
button.active {
  background-color: rgba(255, 120, 79, 1);
  color: #fff;
  border-color: rgba(255, 120, 79, 1);
}
.pagination{
  display: flex;
  justify-content: space-between;;
}
.rent-type-buttons,
.property-types,
.rooms-selection,
.renovation-types {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.price-range {
  margin-top: 15px;
}

.slider-container {
  position: relative;
  width: 100%;
}

.slider {
  position: relative;
  width: 100%;
  height: 6px;
  background: #eee;
  border-radius: 3px;
}

.slider-track {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 120, 79, 1);
  border-radius: 3px;
}

.slider-input {
  position: absolute;
  top: -8px;
  width: 100%;
  height: 22px;
  margin: 0;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(255, 120, 79, 1);
  border: none;
  cursor: pointer;
  pointer-events: auto;
}

.price-inputs {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.price-inputs input {
  width: 45%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.area-inputs {
  display: flex;
  gap: 5px;
  align-items: center;
}

.area-inputs .area-input-container {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.area-inputs .area-input-container input {
  border: none;
  border-radius: 0;
  padding: 8px;
  font-size: 14px;
}

.area-inputs .area-input-container span.area-unit {
  padding: 8px;
  border-left: 1px solid #ddd;
  font-size: 14px;
}

.apply-filters-btn {
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 120, 79, 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.apply-filters-btn:hover {
  background-color: rgba(255, 120, 79, 0.8);
}

.listings-container {
  background: rgba(17, 17, 17, 1);
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  flex-grow: 1; /* listings-container занимает всё доступное пространство */
}

.listing {
  display: flex;
  flex-direction: column;
  background: rgb(253, 253, 253);
  border-radius: 5px;
  overflow: hidden;
  height: 540px;
  width: calc(33.33% - 20px);
  box-sizing: border-box;
  flex-grow: 0;
  flex-shrink: 0;
}

.listing-image-container {
  position: relative;
  width: 100%;
  height: 284px;
}

.listing-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.listing-info {
  padding: 15px;
  flex: 1;
  color: rgb(17, 17, 17);
}

.good-price {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 107px;
  height: 22px;
  border-radius: 5px;
  padding: 5px 3px 2px 3px;
  font-family: Noto Sans, sans-serif;
  font-weight: 300;
  font-size: 13px;
  text-align: center;
  background-color: #fff;
  color: rgba(255, 110, 66, 1);
}

.heart-on-image {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: auto;
  cursor: pointer;
}

.heart-on-image:hover {
  opacity: 0.8;
}

.heart-on-image.active {
  opacity: 0.2;
}

.price {
  font-family: Noto Sans, sans-serif;
  font-weight: 500;
  font-size: 32px;
}

.old-price {
  font-family: Noto Sans, sans-serif;
  font-weight: 200;
  font-size: 24px;
  text-decoration: line-through;
}

.details {
  font-family: Noto Sans, sans-serif;
  font-weight: 400;
  font-size: 24px;
}

.address {
  font-family: Noto Sans, sans-serif;
  font-weight: 400;
  font-size: 16px;
}

.complex-name {
  font-family: Noto Sans, sans-serif;
  font-weight: 600;
  font-size: 19px;
}

.view-all {
  width: 220px;
  height: 40px;
  border-radius: 5px;
  padding: 10px 16px;
  border: 1px solid rgb(255, 110, 66);
  font-family: Noto Sans, sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: rgb(253, 253, 253);
  cursor: pointer;
  transition: all 700ms ease;
  background-color: rgb(17, 17, 17);
  margin-left: 690px;
  margin-top: 25px;
  margin-bottom: 132px;
}

.view-all:hover {
  background-color: rgb(255, 110, 66);
}

.no-listings {
  color: #fff;
  padding: 20px;
  text-align: center;
}

/* Slider styles */
.slider-container {
  position: relative;
  width: 100%;
}

.slider {
  position: relative;
  width: 100%;
  height: 6px;
  background: #eee;
  border-radius: 3px;
}

.slider-track {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 120, 79, 1);
  border-radius: 3px;
}

.slider-input {
  position: absolute;
  top: -8px;
  width: 100%;
  height: 22px;
  margin: 0;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(255, 120, 79, 1);
  border: none;
  cursor: pointer;
  pointer-events: auto;
}
</style>
