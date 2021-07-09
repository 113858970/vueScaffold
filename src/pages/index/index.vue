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
        <ym-select
          :level1List="level1List"
          :level2List="level2List"
          :level3List="level3List"
          :defaultValue="defaultValue"
          @changeSelect="changeSelect"
          @select="select"
          @cancel="cancel"
          :levelNumber="1"
        ></ym-select>
    </div>
</template>
<script>
import ymSwiper from '../../components/ym-swiper/ym-swiper.vue'
import ymSelect from '../../components/ym-select/ym-select.vue'
import ymPopupDialog from '../../components/ym-popup-dialog/ym-popup-dialog.vue'
export default{
  data () {
    return {
      imgs: ['https://wx1.sinaimg.cn/mw2000/c875cd12gy1grnkdey2xej20m80b40uo.jpg', 'https://wx1.sinaimg.cn/mw2000/001Rziymgy1grnjatx52jj634022ox6p02.jpg', 'https://wx1.sinaimg.cn/mw2000/c875cd12gy1grnkdey2xej20m80b40uo.jpg'],
      level1List: [
        { name: '请选择', value: '' },
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' }
      ],
      level2List: [{ name: '请选择', value: '' }],
      level3List: [{ name: '请选择', value: '' }],
      defaultValue: []
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
    },
    changeSelect (data) {
      if (data.level === 'level1') {
        if (data.selectValue) {
          this.level2List = [
            { name: '请选择', value: '' },
            { name: '11', value: '11' },
            { name: '21', value: '21' },
            { name: '31', value: '31' },
            { name: '41', value: '41' }
          ]
        } else {
          this.level2List = [{ name: '请选择', value: '' }]
        }
        this.level3List = [{ name: '请选择', value: '' }]
      } else if (data.level === 'level2') {
        if (data.selectValue) {
          this.level3List = [
            { name: '请选择', value: '' },
            { name: '111', value: '111' },
            { name: '211', value: '211' },
            { name: '311', value: '311' },
            { name: '411', value: '411' }
          ]
        } else {
          this.level3List = [{ name: '请选择', value: '' }]
        }
      }
    },
    select (data) {
      console.log(data)
    },
    cancel () {

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
