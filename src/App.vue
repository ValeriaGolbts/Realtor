<template>
<main>
  <AppHeader></AppHeader>
  <AppMainPage></AppMainPage>

  <AppFooter></AppFooter>
</main>
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



</script>

<style scoped>
body{
  margin: 0;
}
</style>

