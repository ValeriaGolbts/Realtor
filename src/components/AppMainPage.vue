<template>
  <main>
    <section class="head_main">
    <div class="decription">
      <div class="decription1">
        <div>Найдите жилье</div>
        <div>для новой поездки в Томске</div>
      </div>
      <div>
        <img src="./icons/TOMSKZONE.svg">
      </div>
      <div class="decription2">
        <div>Ищите спецпредложения </div>
        <div>на квартиры, дома и другие варианты</div>
      </div>
    </div>
    </section>
    <div class="main">
      <p>ОСОБЕННОСТИ СЕРВИСА</p>
      <p class="text">Создаём безопасный, прозрачный <br>
        и удобный процесс аренды квартир <br>
        в Томске для обеих сторон</p>
      <div class="advantages">
        <div class="advantage1">
          <div>
            <div>Аренда для собственника</div>
            <div><img src="./icons/01.svg"></div>
          </div>
          <div>
            <p>Сдадим квартиру<br> безопасно</p>
            <p>Найдем жильца, гарантируем платежи, <br> починим сломанную мебель и технику</p>
          </div>
        </div>

        <div class="advantage2">
          <div>
            <div>Аренда для собственника</div>
            <div><img src="./icons/02.svg"></div>
          </div>
          <div>
            <p>Профессиональная<br> поддержка</p>
            <p>Наша служба поддержки всегда готова <br> помочь вам с любыми вопросами,<br>
              связанными с арендой квартир в <br> Томске</p>
          </div>
        </div>

        <div class="advantage3">
          <div>
            <div>Гарантия платежей</div>
            <div><img src="./icons/03.svg"></div>
          </div>
          <div>
            <p>Прямое взаимодействие <br> с арендодателем</p>
            <p>Оплата за аренду осуществляется <br> непосредственно арендодателю.
              Мы не <br> участвуем в финансовых транзакциях</p>
          </div>
        </div>
      </div>

      <div class="title-name">
        <h2 class="name">ТОП КВАРТИР НА СЕГОДНЯ</h2>
      </div>
      <div class="listings-container">
        <div v-for="(listing, index) in listings.slice(0,3)" :key="index" class="listing">
          <div class="listing-image-container">
            <img :src="imageUrl" alt="Квартира" class="listing-image"/>
            <span v-if="listing.oldPrice && listing.oldPrice.trim() !== ''" class="good-price">Хорошая цена</span>
            <img
                class="heart-on-image"
                @click="toggleFavorite(index)"
                :src="listings[index].isFavorited ? fullShape : shape"
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
        <button class="view-all">СМОТРЕТЬ ВСЕ</button>
      </div>

      <div class="app-section">
        <div class="app-text">
          <div class="app-text-desc">
            <span class="app-text-desc-selection">В приложении ещё удобнее</span>
            <p>Следите за актуальными и выгодными предложениями</p>
          </div>
          <div class="app-stores">
            <img src="@/assets/Google_Play_Black.png" alt="Google Play" class="store-icon">
            <img src="@/assets/App_Store_Black.png" alt="App Store" class="store-icon">
            <img src="@/assets/RuStore_Black.png" alt="RuStore" class="store-icon">
          </div>
        </div>
        <div class="qr-code">
          <img src="@/assets/qr-code.png" alt="QR-код для скачивания приложения">
        </div>
      </div>

    </div>
  </main>

  <AppInteresting
      :listings="listings"
      :image-url="imageUrl"
      :shape="shape"
      :full-shape="fullShape"
      @toggle-favorite="toggleFavorite"
  />

  <AppLastViews
      :listings="listings"
      :image-url="imageUrl"
      :shape="shape"
      :full-shape="fullShape"
      @toggle-favorite="toggleFavorite"
  />


</template>

<script setup>
import imageUrl from "@/assets/appartment.png"
import shape from "@/assets/shape.png"
import fullShape from "@/assets/full_shape.png"
import AppInteresting from "@/components/AppInteresting.vue"
import AppLastViews from "@/components/AppLastViews.vue"
import AppHeader from "@/components/AppHeader.vue";
import {ref} from 'vue';

const listings = ref([
  {
    image: '/icons/appartment.png',
    price: '20 000',
    oldPrice: '21 000',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false
  },
  {
    image: 'icons/appartment.png',
    price: '20 000',
    oldPrice: '',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false
  },
  {
    image: 'icons/appartment.png',
    price: '20 000',
    oldPrice: '21 000',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false
  },

  {
    image: '/icons/appartment.png',
    price: '20 000',
    oldPrice: '',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false
  },
  {
    image: 'icons/appartment.png',
    price: '20 000',
    oldPrice: '21 000',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false
  },
  {
    image: 'icons/appartment.png',
    price: '20 000',
    oldPrice: '21 000',
    details: '1 комн. 35 м2 15/16 эт.',
    complex: 'ЖК "Меркурий Таур"',
    address: 'улица Энергетическая, 13А, Томск, Томская область',
    isFavorited: false
  }
]);

function toggleFavorite(index) {
  listings.value[index].isFavorited = !listings.value[index].isFavorited;
}

</script>

<style scoped>
body {
  margin: 0;
}
.head_main{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 760px;
  background-image: url("./icons/Banner_main (1).svg");
  justify-content: space-between;
}
.decription{
  margin-right: 160px;
  margin-left: 160px;
  margin-top: 15%;
}
.decription1{
  color: white;
  font-size: 24px;
}
.decription2{
  display: flex
;
  flex-direction: column;
  color: white;
  flex-wrap: wrap;
  align-content: center;
  font-size: 24px;
  margin-left: 123px;
}
.filter-container {
  display: flex;
  gap: 5px;
  padding: 10px;
  justify-content: center;
  margin-bottom: 44px;
}

.filter-container select,
.filter-container input {
  padding: 8px 10px;
  border: 1px solid #555;
  border-radius: 3px;
  font-size: 16px;
  color: #ddd;
  background-color: #333;
  flex: 1;
}

.filter-container button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
}

.filter>select {
  background-color: white;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("./icons/Vector.svg");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  padding-right: 30px;
  color: #181818;
  border: none;
  transition: none;
}

.filter select:nth-child(1){
  width: 74px;
}
.filter select:nth-child(2){
  width: 156px;
}
.filter input:nth-child(1){
  width: 186px;
}
.border{
  margin-top: 5px;
  border-right: 1px solid red;
  height: 23px;
}


.filter-container select:invalid {
  color: #999;
}
.filter{
  display: flex;
  background-color: white;
  border-radius: 5px;
  width: 726px;
}
.filter>input{
  border: none;
  background-color: white;
}
main {
  background-color: rgba(242, 238, 235, 1);
  width: 100%;
}

.main {
  margin-right: 160px;
  margin-left: 160px;
  margin-top: 128px;
}

.main:nth-child(1) {
  margin-top: 129px;
  font-size: 24px;
}

.text {
  display: flex;
  justify-content: end;
  font-size: 53px;
  font-weight: bold;
}

.advantages > div {
  height: 389px;
  width: 520px;
}

.advantages {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 128px;
}

.advantage1 {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
}

.advantage1 div:first-child {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 13px;
  margin-top: -12px;
}

.advantage1 > div:nth-child(2) > p:nth-child(1) {
  text-transform: uppercase;
  font-size: 21px;
}

.advantage1 > div:nth-child(2) > p:nth-child(2) {
  font-size: 16px;
}

.advantage1 > div:nth-child(2) {
  margin-left: 20px;
}

.advantage2 {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
}

.advantage2 div:first-child {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 13px;
  margin-top: -13px;
}

.advantage2 > div:nth-child(2) > p:nth-child(1) {
  text-transform: uppercase;
  font-size: 21px;
}

.advantage2 > div:nth-child(2) > p:nth-child(2) {
  font-size: 16px;
}

.advantage2 > div:nth-child(2) {
  margin-left: 20px;
  margin-bottom: -30px;
}

.advantage3 {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: black;
}

.advantage3 div:first-child {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 13px;
  margin-top: -13px;
  color: white;
}

.advantage3 > div:nth-child(2) > p:nth-child(1) {
  text-transform: uppercase;
  font-size: 21px;
  color: white;
}

.advantage3 > div:nth-child(2) > p:nth-child(2) {
  font-size: 16px;
  color: white;
}

.advantage3 > div:nth-child(2) {
  margin-left: 20px;
  margin-bottom: -12px;
}

.listings-container {
  background: #f5f2ee;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
}


.name {
  color: rgba(17, 17, 17, 1);
  margin-bottom: 20px;
  font-family: Noto Sans;
  font-weight: 500;
  font-size: 21px;
  text-align: left;
}

.listing {
  display: flex;
  background: rgba(253, 253, 253, 1);
  border-radius: 5px;
  margin-bottom: 30px;
  overflow: hidden;
  height: 370px;
  width: 100%;
  flex-shrink: 0;
}

.listing-image-container {
  position: relative;
  width: 50%;
  height: 100%;
}

.listing-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.listing-info {
  padding: 15px;
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
  color: rgb(255, 110, 66);
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
  color: rgba(17, 17, 17, 1);
  cursor: pointer;
  transition: all 500ms ease;
  margin: 0 auto;
}

.view-all:hover {
  background-color: rgba(255, 110, 66, 1);
}

.app-section {
  margin-top: 128px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  height: 277px;
  padding-left: 16px;
  margin-bottom: 28px;
}

.app-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.app-text-desc {
  margin-top: 20px;
}

.app-text-desc-selection {
  font-family: Noto Sans;
  font-weight: 600;
  font-size: 40px;
  color: rgba(17, 17, 17, 1);

}

.app-text p {
  font-family: Noto Sans;
  font-weight: 400;
  font-size: 16px;
  color: rgba(17, 17, 17, 1);

}

.app-stores {
  display: flex;
  gap: 16px;
  margin-bottom: 17px;
}

.store-icon {
  width: 140px;
  height: 40px;
  transition: transform 0.3s ease;
}

.store-icon:hover {
  transform: scale(1.1);
}

.qr-code {
  background-color: #ff6e42;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qr-code img {
  width: 179px;
  height: 179px;
}

</style>