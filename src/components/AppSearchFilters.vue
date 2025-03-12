<template>
  <div class="filter-container">
    <div class="filter-header">
      <h3 class="filter-title">Фильтр</h3>
      <button class="clear-btn" @click="resetFilters">Сбросить</button>
    </div>

    <!-- Search -->
<!--    <div class="filter-group">-->
<!--      <input class="search-input" type="text" v-model="searchQuery" placeholder="Адрес, район, улица" />-->
<!--    </div>-->

    <!-- Rent Type -->
    <div class="filter-group">
      <label>Тип аренды</label>
      <div class="rent-type-buttons">
        <button
            :class="{ active: rentType === 'longTerm' }"
            @click="setRentType('longTerm')"
        >Долгосрочная</button>
        <button
            :class="{ active: rentType === 'shortTerm' }"
            @click="setRentType('shortTerm')"
        >Посуточная</button>
      </div>
    </div>

    <!-- Property Type -->
    <div class="filter-group">
      <label>Тип недвижимости</label>
      <div class="property-types">
        <button
            v-for="type in propertyTypes"
            :key="type.id"
            :class="{ active: selectedPropertyType === type.id }"
            @click="selectPropertyType(type.id)"
            class="property-type-item"
        >{{ type.name }}</button>
      </div>
    </div>

    <!-- Price -->
    <div class="filter-group">
      <label>Цена</label>
      <div class="price-range">
        <div class="slider-container">
          <div class="slider">
            <div class="slider-track" :style="sliderTrackStyle"></div>
            <input
                type="range"
                min="5000"
                max="1000000"
                v-model.number="minPrice"
                @input="updateRange"
                class="slider-input min"
            />
            <input
                type="range"
                min="5000"
                max="1000000"
                v-model.number="maxPrice"
                @input="updateRange"
                class="slider-input max"
            />
          </div>
        </div>
        <div class="price-inputs">
          <input type="number" v-model.number="minPrice" placeholder="От" @input="updateRange"/>
          <input type="number" v-model.number="maxPrice" placeholder="До" @input="updateRange"/>
        </div>
      </div>
    </div>

    <!-- Rooms -->
    <div class="filter-group">
      <label>Кол-во комнат</label>
      <div class="rooms-selection">
        <button
            v-for="room in availableRooms"
            :key="room.id"
            :class="{ active: selectedRooms.includes(room.id) }"
            @click="toggleRoom(room.id)"
            class="room-item"
        >{{ room.name }}</button>
      </div>
    </div>

    <!-- Total Area -->
    <div class="filter-group">
      <label>Общая площадь</label>
      <div class="area-inputs">
        <div class="area-input-container">
          <input type="number" v-model.number="minTotalArea" placeholder="От" />
          <span class="area-unit">м²</span>
        </div>
        <div class="area-input-container">
          <input type="number" v-model.number="maxTotalArea" placeholder="До" />
          <span class="area-unit">м²</span>
        </div>
      </div>
    </div>

    <!-- Living Area -->
    <div class="filter-group">
      <label>Жилая площадь</label>
      <div class="area-inputs">
        <div class="area-input-container">
          <input type="number" v-model.number="minLivingArea" placeholder="От" />
          <span class="area-unit">м²</span>
        </div>
        <div class="area-input-container">
          <input type="number" v-model.number="maxLivingArea" placeholder="До" />
          <span class="area-unit">м²</span>
        </div>
      </div>
    </div>

    <!-- Floor -->
    <div class="filter-group">
      <label>Этаж</label>
      <div class="floor-inputs">
        <input type="number" v-model.number="minFloor" placeholder="От" />
        <input type="number" v-model.number="maxFloor" placeholder="До" />
      </div>
    </div>

    <!-- Renovation -->
    <div class="filter-group">
      <label>Ремонт</label>
      <div class="renovation-types">
        <button
            v-for="type in renovationTypes"
            :key="type.id"
            :class="{ active: selectedRenovationType === type.id }"
            @click="selectRenovationType(type.id)"
            class="renovation-type-item"
        >{{ type.name }}</button>
      </div>
    </div>

    <button class="apply-filters-btn" @click="applyFilters">Загрузить ещё</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Reactive variables
const searchQuery = ref('');
const rentType = ref(null);
const selectedPropertyType = ref(null);
const minPrice = ref(5000);
const maxPrice = ref(1000000);
const selectedRooms = ref([]);
const minTotalArea = ref(null);
const maxTotalArea = ref(null);
const minLivingArea = ref(null);
const maxLivingArea = ref(null);
const minFloor = ref(null);
const maxFloor = ref(null);
const selectedRenovationType = ref(null);

// Data for filters
const propertyTypes = [
  { id: 'apartment', name: 'Квартира' },
  { id: 'room', name: 'Комната' },
  { id: 'house', name: 'Дом, дача' },
  { id: 'apartments', name: 'Апартаменты' }
];

const renovationTypes = [
  { id: 'cosmetic', name: 'Косметический' },
  { id: 'euro', name: 'Евро' },
  { id: 'designer', name: 'Дизайнерский' }
];

const roomsByPropertyType = {
  apartment: [
    { id: 'studio', name: 'Студия' },
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
    { id: '6+', name: '6+' }
  ],
  room: [
    { id: '1', name: '1' }
  ],
  house: [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
    { id: '6+', name: '6+' },
    { id: 'freeLayout', name: 'Свободная планировка' }
  ],
  apartments: [
    { id: 'studio', name: 'Студия' },
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' }
  ]
};

// Computed properties
const availableRooms = computed(() => {
  return selectedPropertyType.value ? roomsByPropertyType[selectedPropertyType.value] || [] : [];
});

const sliderTrackStyle = computed(() => {
  const minPercentage = ((minPrice.value - 5000) / (1000000 - 5000)) * 100;
  const maxPercentage = ((maxPrice.value - 5000) / (1000000 - 5000)) * 100;

  return {
    left: `${minPercentage}%`,
    width: `${maxPercentage - minPercentage}%`
  };
});

// Methods
const setRentType = (type) => {
  rentType.value = type;
};

const selectPropertyType = (typeId) => {
  selectedPropertyType.value = typeId;
  selectedRooms.value = [];
};

const toggleRoom = (roomId) => {
  if (selectedRooms.value.includes(roomId)) {
    selectedRooms.value = selectedRooms.value.filter(id => id !== roomId);
  } else {
    selectedRooms.value = [...selectedRooms.value, roomId];
  }
};

const selectRenovationType = (typeId) => {
  selectedRenovationType.value = typeId;
};

const updateRange = () => {
  if (minPrice.value > maxPrice.value) {
    const temp = minPrice.value;
    minPrice.value = maxPrice.value;
    maxPrice.value = temp;
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  rentType.value = null;
  selectedPropertyType.value = null;
  minPrice.value = 5000;
  maxPrice.value = 1000000;
  selectedRooms.value = [];
  minTotalArea.value = null;
  maxTotalArea.value = null;
  minLivingArea.value = null;
  maxLivingArea.value = null;
  minFloor.value = null;
  maxFloor.value = null;
  selectedRenovationType.value = null;
};

const applyFilters = () => {
  const filters = {
    searchQuery: searchQuery.value,
    rentType: rentType.value,
    propertyType: selectedPropertyType.value,
    priceRange: { min: minPrice.value, max: maxPrice.value },
    rooms: selectedRooms.value,
    totalArea: { min: minTotalArea.value, max: maxTotalArea.value },
    livingArea: { min: minLivingArea.value, max: maxLivingArea.value },
    floor: { min: minFloor.value, max: maxFloor.value },
    renovationType: selectedRenovationType.value
  };
  console.log('Применены фильтры:', filters);
  // Здесь бы вы отправили запрос на сервер и получили бы данные
};
</script>

<style scoped>
.filter-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 427px;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  height: 1091px;
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

/* Form elements */
input[type="text"],
input[type="number"] {
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
  border-radius: 20px;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

button.active {
  background-color: rgba(255, 120, 79, 1);
  color: #fff;
  border-color: rgba(255, 120, 79, 1);
}

/* Specific filter sections */
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

/*Area Input*/
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
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-top: 22px;
}
.floor-inputs{
  display: flex;
  gap: 5px;
}
.apply-filters-btn:hover {
  background-color: #FF784F;
}

/*Resposive*/
@media (max-width: 427px) {
  .filter-container {
    max-width: 100%;
    padding: 10px;
    height: auto;
  }

  .filter-title {
    font-size: 20px;
  }

  .filter-group {
    margin-bottom: 15px;
  }

  .filter-group label {
    font-size: 14px;
  }

  input[type="text"],
  input[type="number"] {
    font-size: 12px;
    padding: 8px;
  }

  button {
    font-size: 12px;
    padding: 8px 12px;
  }

  .price-inputs {
    flex-direction: column;
  }

  .price-inputs input {
    width: 100%;
    margin-bottom: 5px;
  }
}

</style>
