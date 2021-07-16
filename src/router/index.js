import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'index',
    component: r => require.ensure([], () => r(require('@/pages/index/index'))),
    meta: { title: '首页' }
  },
  {
    path: '/form',
    name: 'form',
    component: r => require.ensure([], () => r(require('@/pages/form/form'))),
    meta: { title: '表单' }
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: r => require.ensure([], () => r(require('@/pages/swiper/swiper'))),
    meta: { title: '焦点图' }
  },
  {
    path: '/lottery',
    name: 'lottery',
    component: r => require.ensure([], () => r(require('@/pages/lottery/lottery'))),
    meta: { title: '抽奖1' }
  },
  {
    path: '/lottery1',
    name: 'lottery1',
    component: r => require.ensure([], () => r(require('@/pages/lottery/lottery1'))),
    meta: { title: '抽奖2' }
  }
];
export default new Router({routes});
