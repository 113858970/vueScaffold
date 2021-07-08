import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import ymLoading from '@/components/ym-loading/ym-loading.vue'
import hSelect from '@/components/ym-select/select.vue'
import hWrapper from '@/components/ym-select/wrapper.vue'
import hOption from '@/components/ym-select/option.vue'
Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.component('ym-loading', ymLoading)
Vue.component('h-select', hSelect)
Vue.component('h-wrapper', hWrapper)
Vue.component('h-option', hOption)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
