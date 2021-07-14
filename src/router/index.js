import Vue from 'vue';
import Router from 'vue-router';
import index from '@/pages/index/index';
import form from '@/pages/form/form';
import swiper from '@/pages/swiper/swiper';
import lottery from '@/pages/lottery/lottery';
import lottery1 from '@/pages/lottery/lottery1';

Vue.use(Router);
const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: index },
  { path: '/form', component: form },
  { path: '/lottery', component: lottery },
  { path: '/lottery1', component: lottery1 },
  { path: '/swiper', component: swiper }
];
export default new Router({routes});
