<template>
   <div class="swiper">
        <ym-swiper height="10rem"  :imgList="imgs" effect="normal" @onClickImg="handleSwiperClick"></ym-swiper>
        <ym-swiper height="10rem"  :imgList="imgs" effect="zoom" @onClickImg="handleSwiperClick" style="margin-top:2rem"></ym-swiper>
    </div>
</template>
<script>
import ymSwiper from '../../components/ym-swiper/ym-swiper.vue';
export default {
  data () {
    return {
      imgs: [require('@/static/images/1.jpeg'), require('@/static/images/2.jpeg'), require('@/static/images/1.jpeg')]
    };
  },
  components: {
    ymSwiper
  },
  methods: {
    handleSwiperClick (data) {
      console.log(data);
    }
  }
};
</script>
<style lang="scss" scoped>
.swiper{
  width:100%;
  margin:1rem auto
}
</style>
