import Vue from 'vue';
import Router from 'vue-router';
import index from '@/pages/index/index';
import form from '@/pages/form/form';
import lottery from '@/pages/lottery/lottery';
import lottery1 from '@/pages/lottery/lottery1';
import lottery2 from '@/pages/lottery/lottery2';
import lottery3 from '@/pages/lottery/lottery3';

Vue.use(Router);
const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: index },
  { path: '/form', component: form },
  { path: '/lottery', component: lottery },
  { path: '/lottery1', component: lottery1 },
  { path: '/lottery2', component: lottery2 },
  { path: '/lottery3', component: lottery3 }
];
export default new Router({routes});
