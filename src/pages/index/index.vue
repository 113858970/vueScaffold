<template>
    <div class="index1">
        <p @click="setStore">设置store</p>
        <p><router-link to="/form">form</router-link></p>
        <p><router-link to="/lottery">lottery</router-link></p>
        <p @click="loadingShow">loading</p>
        <p @click="dialogShow">dialog</p>
        <ym-loading ref="loading" text="加载中"/>
        <ym-popup-dialog ref = 'dialog'/>
        <!-- <div class="swiper">
          <ym-swiper height="10rem"  :imgList="imgs" effect="normal" @onClickImg="handleSwiperClick"></ym-swiper>
        </div> -->
        <ym-select></ym-select>
    </div>
</template>
<script>
import ymSwiper from '../../components/ym-swiper/ym-swiper.vue'
import ymSelect from '../../components/ym-select/ym-select.vue'
import ymPopupDialog from '../../components/ym-popup-dialog/ym-popup-dialog.vue'
export default{
  data () {
    return {
      imgs: ['https://wx1.sinaimg.cn/mw2000/c875cd12gy1grnkdey2xej20m80b40uo.jpg', 'https://wx1.sinaimg.cn/mw2000/001Rziymgy1grnjatx52jj634022ox6p02.jpg', 'https://wx1.sinaimg.cn/mw2000/c875cd12gy1grnkdey2xej20m80b40uo.jpg']
    }
  },
  components: {
    ymSwiper,
    ymPopupDialog,
    ymSelect
  },
  methods: {
    setStore () {
      this.$store.commit('setPersonInfo', {
        name: 'abc',
        sex: '1'
      })
    },
    loadingShow () {
      this.$refs.loading.show()
    },
    dialogShow () {
      this.$refs.dialog.show({
        reject: () => {
          console.log('reject')
        },
        resolve: () => {
          console.log('resolve')
        }
      })
    },
    handleSwiperClick (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper{
  width:100%;
  margin:1rem auto
}
</style>
