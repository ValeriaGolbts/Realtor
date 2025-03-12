<template>
  <section class="black-main">
    <div class="wrapper">
      <div class="title-name">
        <h2 class="name">ВАМ БУДЕТ ИНТЕРЕСНО</h2>
      </div>
      <div class="listings-container">
        <div v-for="(listing, index) in listings.slice(0, 3)" :key="index" class="listing">
          <div class="listing-image-container">
            <img :src="imageUrl" alt="Квартира" class="listing-image"/>
            <span v-if="listing.oldPrice && listing.oldPrice.trim() !== ''" class="good-price">Хорошая цена</span>
            <img
                class="heart-on-image"
                @click="$emit('toggle-favorite', index)"
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
  background-image: none;
}

.wrapper {
  margin-right: 160px;
  margin-left: 160px;
  color: rgb(253, 253, 253);
}

.title-name {
  padding-top: 100px;
  margin-bottom: 40px;
}

.name {
  color: rgb(253, 253, 253);
  font-family: Noto Sans;
  font-weight: 500;
  font-size: 21px;
  text-align: left;
}

.listings-container {
  background: rgba(17, 17, 17, 1);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}

.listing {
  display: flex;
  flex-direction: column;
  background: rgb(253, 253, 253);
  border-radius: 5px;
  overflow: hidden;
  height: 540px;
  width: 520px;
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