import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@/store';
import toast from '@/plugins/toast';
import loading from '@/plugins/loading';
import VueWechatTitle from 'vue-wechat-title';

Vue.use(VueWechatTitle);
Vue.config.productionTip = false;
Vue.use(toast);
Vue.use(loading);

Vue.prototype.$store = store;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
