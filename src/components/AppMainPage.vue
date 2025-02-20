<template>
  <main>
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
  </div>
  </main>
</template>
<script setup>

</script>

<style>
body{
  margin: 0;
}

main{
background-color: rgba(242, 238, 235, 1);
  height: 2623px;
  width: 1920px;
}
.main{
  margin-right: 160px;
  margin-left: 160px;
}
.main:nth-child(1){
  margin-top: 129px;
  font-size: 24px;
}
.text{
  display: flex;
  justify-content: end;
  font-size: 53px;
  font-weight: bold;
}
.advantages>div{
  height: 389px;
  width: 520px;
}
.advantages{
  display: flex;
  flex-direction: row;
justify-content: space-between;
}
.advantage1{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
}
.advantage1 div:first-child{
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 13px;
  margin-top: -12px;
}
.advantage1>div:nth-child(2)>p:nth-child(1){
text-transform: uppercase;
  font-size: 21px;
}
.advantage1>div:nth-child(2)>p:nth-child(2){
  font-size: 16px;
}
.advantage1>div:nth-child(2){
  margin-left: 20px;
}
.advantage2{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
}
.advantage2 div:first-child{
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 13px;
  margin-top: -13px;
}
.advantage2>div:nth-child(2)>p:nth-child(1){
  text-transform: uppercase;
  font-size: 21px;
}
.advantage2>div:nth-child(2)>p:nth-child(2){
  font-size: 16px;
}
.advantage2>div:nth-child(2){
  margin-left: 20px;
  margin-bottom: -30px;
}
.advantage3{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: black;
}
.advantage3 div:first-child{
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 13px;
  margin-top: -13px;
  color: white;
}
.advantage3>div:nth-child(2)>p:nth-child(1){
  text-transform: uppercase;
  font-size: 21px;
  color: white;
}
.advantage3>div:nth-child(2)>p:nth-child(2){
  font-size: 16px;
  color: white;
}
.advantage3>div:nth-child(2){
  margin-left: 20px;
  margin-bottom: -12px;
}
</style>