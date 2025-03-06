<template>
  <AppHeader />
<main>

  <router-view>

  </router-view>
</main>
  <AppFooter />
</template>

<script setup>
import axios from "axios";
import {thisUrl} from "./url.js";
import {ref} from "vue";
import AppAuth from "@/components/AppAuth.vue"
import AppReg from "@/components/AppReg.vue";
import AppSendEmail from "@/components/AppSendEmail.vue";
import AppMainPage from "@/components/AppMainPage.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppTest from "@/components/AppTest.vue";



</script>

<style scoped>
body{
  margin: 0;
}
</style>

