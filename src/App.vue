<template>
<AppHeader></AppHeader>
<main>
  <router-view></router-view>
</main>
  <AppFooter />
</template>

<script setup>
import axios from "axios";
import {thisUrl} from "./url.js";
import { ref, provide } from 'vue';
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

</script>

<style scoped>
body{
  margin: 0;
}
</style>

