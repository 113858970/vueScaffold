import loading from '@/components/ym-loading/ym-loading'
export default (Vue) => {
  let LoadingComp = Vue.extend(loading)
  let LoadingDom
  function showLoading ({text = '加载中', isShowBg = true}) {
    LoadingDom = new LoadingComp({
      data () {
        return {
          isShow: true,
          text,
          isShowBg
        }
      }
    }).$mount(document.createElement('div'))
    document.body.appendChild(LoadingDom.$el)
  }
  function hideLoading () {
    LoadingDom.isShow = false
  }
  Vue.prototype.$showLoading = showLoading
  Vue.prototype.$hideLoading = hideLoading
}
