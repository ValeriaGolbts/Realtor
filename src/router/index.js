import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue'
import AppReg from '../components/AppReg.vue'
import AppSendEmail from '../components/AppSendEmail.vue'
import AppSearchFilters from '../components/AppSearchFilters.vue'

const routes = [
  {
    path: '/',
    component: () => import('../components/AppMainPage.vue'),
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import('../components/AppReg.vue'),
  },
  {
    path: '/email',
    component: () => import('../components/AppSendEmail.vue'),
  },

  {
    path: '/view',
    name: 'view',
    component: () => import('../components/AppTest.vue'),
  },
  {
    path: '/filters-search',
    name: 'filters',
    component: () => import('../components/AppSearchFilters.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
