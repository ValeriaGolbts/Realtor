<template>
  <section class="black-main">
    <div class="wrapper">
      <div class="title-name">
        <h2 class="name">НЕДАВНО ПРОСМОТРЕННЫЕ</h2>
      </div>
      <div class="special-listing" v-if="listings[0]">
        <div class="listing-image-container">
          <img :src="imageUrl" alt="Квартира" class="listing-image special-listing"/>
          <span class="good-price">Хорошая цена</span>
          <img
              class="heart-on-image"
              @click="$emit('toggle-favorite', 0)"
              :src="listings[0].isFavorited ? fullShape : shape"
              alt="Добавить в избранное"
          />
        </div>
        <div class="listing-info">
          <span class="price">{{ listings[0].price }} ₽ / мес</span><br>
          <span class="old-price" v-if="listings[0].oldPrice">{{ listings[0].oldPrice }} ₽</span>
          <p class="details">{{ listings[0].details }}</p>
          <p class="complex-name"><strong>{{ listings[0].complex }}</strong></p>
          <p class="address">{{ listings[0].address }}</p>
        </div>
      </div>

      <div class="listings-grid">
        <div v-for="(listing, index) in listings.slice(1, 5)" :key="index + 1" class="listing">
          <div class="listing-image-container">
            <img :src="imageUrl" alt="Квартира" class="listing-image"/>
            <span v-if="listing.oldPrice && listing.oldPrice.trim() !== ''" class="good-price">Хорошая цена</span>
            <img
                class="heart-on-image"
                @click="$emit('toggle-favorite', index + 1)"
                :src="listing.isFavorited ? fullShape : shape"
                alt="Добавить в избранное"
            />
          </div>
          <div class="listing-info">
            <span class="price">{{ listing.price }} ₽ / мес</span><br>
            <span class="old-price" v-if="listing.oldPrice">{{ listing.oldPrice }} ₽</span>
            <p class="details">{{ listing.details }}</p>
            <p class="complex-name"><strong>{{ listing.complex }}</strong></p>
            <p class="address">{{ listing.address }}</p>
          </div>
        </div>
      </div>

      <button class="view-all">СМОТРЕТЬ ВСЕ</button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  listings: {
    type: Array,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  shape: {
    type: String,
    required: true
  },
  fullShape: {
    type: String,
    required: true
  }
})

defineEmits(['toggleFavorite'])
</script>

<style scoped>
body {
  margin: 0;
}

.black-main {
  background-color: rgb(17, 17, 17);
  width: 100%;
}

.wrapper {
  margin-right: 160px;
  margin-left: 160px;
  color: rgb(253, 253, 253);
}

.title-name {
  padding-top: 1px;
  margin-bottom: 40px;
}

.name {
  color: rgb(253, 253, 253);
  font-family: Noto Sans;
  font-weight: 500;
  font-size: 21px;
  text-align: left;
}

.listing {
  background: rgb(253, 253, 253);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  color: rgb(17, 17, 17);
}

.special-listing {
  background-color: rgb(253, 253, 253);
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  color: rgb(17, 17, 17);
}

.special-listing .listing-image-container {
  width: 50%;
  height: 370px;
}

.special-listing .listing-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.listings-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 16px;
}

.listing {
  height: 540px;
  width: 100%;
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

.good-price {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 107px;
  height: 22px;
  border-radius: 5px;
  padding: 5px 3px 2px 3px;
  font-family: Noto Sans;
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
  transition: opacity 0.3s ease;
}

.heart-on-image:active {
  opacity: 0.2;
}

.price {
  font-family: Noto Sans;
  font-weight: 500;
  font-size: 32px;
}

.old-price {
  font-family: Noto Sans;
  font-weight: 200;
  font-size: 24px;
  text-decoration: line-through;
}

.details {
  font-family: Noto Sans;
  font-weight: 400;
  font-size: 24px;
}

.address {
  font-family: Noto Sans;
  font-weight: 400;
  font-size: 16px;
}

.complex-name {
  font-family: Noto Sans;
  font-weight: 600;
  font-size: 19px;
}

.view-all {
  width: 220px;
  height: 40px;
  border-radius: 5px;
  padding: 10px 16px;
  border: 1px solid rgb(255, 110, 66);
  font-family: Noto Sans;
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
</style>