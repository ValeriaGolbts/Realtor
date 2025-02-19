import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue'
import AppReg from '../components/AppReg.vue'
import AppSendEmail from '../components/AppSendEmail.vue'

const routes = [
  {
    path: '/',
    component: () => import('../App.vue'),
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
