<template>
  <div class="container">
    <div class="content-container">
      <div class="title">Долгосрочная аренда 1-комн <br> и 2-комн квартир</div>
      <div class="adv">
        <span class="label">{{ filteredListings.length }} ОБЪЯВЛЕНИЯ</span>
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
                    :class="{ active: filters.type_rent_id === 'longTerm' }"
                    @click="setRentType('longTerm')"
                >Долгосрочная</button>
                <button
                    :class="{ active: filters.type_rent_id === 'shortTerm' }"
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
                    :class="{ active: filters.type_realty_id === type.id }"
                    @click="selectPropertyType(type.id)"
                    class="property-type-item"
                >{{ type.title }}</button>
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
                        v-model.number="filters.price_min"
                        @input="updateRange"
                        class="slider-input min"
                    />
                    <input
                        type="range"
                        :min="priceRange.min"
                        :max="priceRange.max"
                        v-model.number="filters.price_max"
                        @input="updateRange"
                        class="slider-input max"
                    />
                  </div>
                </div>
                <div class="price-inputs">
                  <input
                      class="input"
                      type="number"
                      v-model.number="filters.price_min"
                      placeholder="От"
                      @input="updateRange"
                  />
                  <input
                      class="input"
                      type="number"
                      v-model.number="filters.price_max"
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
                    :class="{ active: filters.count_rooms.includes(room.id) }"
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
                      v-model.number="filters.total_square_min"
                      placeholder="От"
                  />
                  <span class="area-unit">м²</span>
                </div>
                <div class="area-input-container">
                  <input
                      class="input"
                      type="number"
                      v-model.number="filters.total_square_max"
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
                      v-model.number="filters.living_square_min"
                      placeholder="От"
                  />
                  <span class="area-unit">м²</span>
                </div>
                <div class="area-input-container">
                  <input
                      class="input"
                      type="number"
                      v-model.number="filters.living_square_max"
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
                    v-model.number="filters.floor_min"
                    placeholder="От"
                />
                <input
                    class="input"
                    type="number"
                    v-model.number="filters.floor_max"
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
                    :class="{ active: filters.repair_id === type.id }"
                    @click="selectRenovationType(type.id)"
                    class="renovation-type-item"
                >{{ type.title }}</button>
              </div>
            </div>

            <button class="apply-filters-btn" @click="applyFilters">
              Применить
            </button>
          </div>
        </div>

        <!-- Объявления -->
        <div class="listings-container">
          <template v-if="filteredListings.length > 0">
            <div
                v-for="(listing, index) in paginatedListings"
                :key="index"
                class="listing"
                @click="viewApartment(listing.id)"
            >
              <div class="listing-image-container">
                <img
                    :src="listing.image || '/images/default-property.jpg'"
                    alt="Квартира"
                    class="listing-image"
                />
                <span
                    v-if="listing.old_price"
                    class="good-price"
                >Хорошая цена</span>
                <img
                    class="heart-on-image"
                    @click="toggleFavorite(index)"
                    :src="listing.isFavorited ? fullShape : shape"
                    alt="Добавить в избранное"
                />
              </div>
              <div class="listing-info">
                <span class="price">{{ formatPrice(listing.price) }} / мес</span>
                <span class="old-price" v-if="listing.old_price">{{ formatPrice(listing.old_price) }}</span>

                <div class="listing-details">
                  <div class="detail-row">
                    <span class="detail-value">{{ formatRooms(listing.count_rooms) }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-value">{{ listing.total_square }} м²</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-value">{{ listing.floor }}</span>
                    <span class="detail-label">этаж</span>
                  </div>
                </div>

                <p class="address">{{ listing.address }}</p>
                <p class="complex-name" v-if="listing.complex">
                  <strong>{{ listing.complex }}</strong>
                </p>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { thisUrl } from "../url.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const viewApartment = (id) => {
  router.push({ name: 'announ', params: { id } });
};
// Reactive state
const listings = ref([]);
const searchQuery = ref('');
const sortOrder = ref('asc');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const loading = ref(false);
const error = ref(null);

const rentTypes = ref([
  { id: 'longTerm', name: 'Долгосрочная' },
  { id: 'shortTerm', name: 'Посуточная' }
]);

const propertyTypes = ref([]);
const renovationTypes = ref([]);

const priceRange = ref({
  min: 0,
  max: 100000,
});

const availableRooms = ref([
  { id: 'студия', name: 'студия' },
  { id: '1', name: '1' },
  { id: '2', name: '2' },
  { id: '3', name: '3' },
  { id: '4', name: '4' },
  { id: '5', name: '5' },
  { id: '6+', name: '6+' },
  { id: 'свободная планировка', name: 'свободная планировка' }
]);

const filters = ref({
  type_rent_id: null,
  type_realty_id: null,
  price_min: 0,
  price_max: 100000,
  count_rooms: [],
  total_square_min: null,
  total_square_max: null,
  living_square_min: null,
  living_square_max: null,
  floor_min: null,
  floor_max: null,
  repair_id: null,
});

// Computed properties
const filteredListings = computed(() => {
  let filtered = listings.value;

  if (searchQuery.value) {
    filtered = filtered.filter(listing =>
        listing.address.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (filters.value.type_rent_id) {
    filtered = filtered.filter(listing => listing.type_rent === filters.value.type_rent_id);
  }

  if (filters.value.type_realty_id) {
    filtered = filtered.filter(listing => listing.type_realty === filters.value.type_realty_id);
  }

  filtered = filtered.filter(
      listing => listing.price >= filters.value.price_min && listing.price <= filters.value.price_max
  );

  if (filters.value.count_rooms.length > 0) {
    filtered = filtered.filter(listing => filters.value.count_rooms.includes(listing.count_rooms));
  }

  if (filters.value.total_square_min) {
    filtered = filtered.filter(listing => listing.total_square >= filters.value.total_square_min);
  }
  if (filters.value.total_square_max) {
    filtered = filtered.filter(listing => listing.total_square <= filters.value.total_square_max);
  }

  if (filters.value.living_square_min) {
    filtered = filtered.filter(listing => listing.living_square >= filters.value.living_square_min);
  }
  if (filters.value.living_square_max) {
    filtered = filtered.filter(listing => listing.living_square <= filters.value.living_square_max);
  }

  if (filters.value.floor_min) {
    filtered = filtered.filter(listing => listing.floor >= filters.value.floor_min);
  }
  if (filters.value.floor_max) {
    filtered = filtered.filter(listing => listing.floor <= filters.value.floor_max);
  }

  if (filters.value.repair_id) {
    filtered = filtered.filter(listing => listing.repair_id === filters.value.repair_id);
  }

  return filtered;
});

const paginatedListings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredListings.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredListings.value.length / itemsPerPage.value);
});

const sliderTrackStyle = computed(() => {
  const minPercentage = ((filters.value.price_min - priceRange.value.min) / (priceRange.value.max - priceRange.value.min)) * 100;
  const maxPercentage = ((filters.value.price_max - priceRange.value.min) / (priceRange.value.max - priceRange.value.min)) * 100;
  return {
    left: `${minPercentage}%`,
    width: `${maxPercentage - minPercentage}%`,
  };
});

const itemCount = computed(() => filteredListings.value.length);

// Methods
const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const [listingsResponse, filterResponse] = await Promise.all([
      axios.get(`${thisUrl()}/index`),
      axios.get(`${thisUrl()}/realty/filter`),
    ]);

    listings.value = listingsResponse.data;
    propertyTypes.value = filterResponse.data.propertyTypes;
    renovationTypes.value = filterResponse.data.renovationTypes;

    console.log('listings:', listings.value);
    console.log('propertyTypes:', propertyTypes.value);
    console.log('renovationTypes', renovationTypes.value);
  } catch (err) {
    console.error(err);
    error.value = 'Failed to fetch data.';
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  currentPage.value = 1;
};

const resetFilters = () => {
  filters.value = {
    type_rent_id: null,
    type_realty_id: null,
    price_min: 0,
    price_max: 100000,
    count_rooms: [],
    total_square_min: null,
    total_square_max: null,
    living_square_min: null,
    living_square_max: null,
    floor_min: null,
    floor_max: null,
    repair_id: null,
  };
  applyFilters();
};

const setRentType = (type) => {
  filters.value.type_rent_id = type;
};

const selectPropertyType = (typeId) => {
  filters.value.type_realty_id = typeId;
};

const toggleRoom = (roomId) => {
  if (filters.value.count_rooms.includes(roomId)) {
    filters.value.count_rooms = filters.value.count_rooms.filter(id => id !== roomId);
  } else {
    filters.value.count_rooms.push(roomId);
  }
};

const selectRenovationType = (typeId) => {
  filters.value.repair_id = typeId;
};

const updateRange = () => {
  // Validation can be added here
};

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

const changePage = (page) => {
  currentPage.value = page;
};

const formatPrice = (price) => {
  if (!price) return '';
  return new Intl.NumberFormat('ru-RU').format(price);
};

const formatRooms = (count) => {
  if (count === 0) return 'Студия';
  if (count > 6) return '6+';
  if (count > 0 && count < 6) return `${count} комн.`;
  return `${count}`;
};

const toggleFavorite = (index) => {
  listings.value[index].isFavorited = !listings.value[index].isFavorited;
  // Здесь можно добавить вызов API для сохранения в избранное
};

onMounted(fetchData);
</script>

<style scoped>
/* Your existing styles remain unchanged */
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
  flex-grow: 1;
}

.listing {
  display: flex;
  flex-direction: column;
  background: rgb(253, 253, 253);
  border-radius: 5px;
  overflow: hidden;
  height: 540px;
  width: 427px; /* Фиксированная ширина вместо calc(33.33% - 20px) */
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
.listing-details{
  display: flex;
  gap: 25px;
  font-size: 24px;
}
.listing {
  cursor: pointer;  /* Добавляем курсор-указатель */
  transition: transform 0.2s;
}

.listing:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
</style>