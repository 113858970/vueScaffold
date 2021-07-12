import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import toast from '@/plugins/toast'
import ymLoading from '@/components/ym-loading/ym-loading.vue'
Vue.config.productionTip = false
Vue.use(toast)
Vue.prototype.$store = store

Vue.component('ym-loading', ymLoading)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
