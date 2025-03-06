import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue'
import AppReg from '../components/AppReg.vue'
import AppSendEmail from '../components/AppSendEmail.vue'

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
    component: () => import('../components/AppTest.vue'),
    name: 'view'
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
