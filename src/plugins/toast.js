import toast from '@/components/ym-toast/ym-toast'
export default (Vue) => {
  let ToastComp = Vue.extend(toast)
  function showToast ({title, duration = 1500}) {
    let toastDom = new ToastComp({
      data () {
        return {
          show: true,
          title
        }
      }
    }).$mount(document.createElement('div'))
    document.body.appendChild(toastDom.$el)
    setTimeout(() => {
      toastDom.show = false
    }, duration)
  }
  Vue.prototype.$toast = showToast
}
