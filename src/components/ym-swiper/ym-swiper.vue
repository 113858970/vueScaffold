<template>
  <div
    class="swiper-component"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    :style="{ height: height }"
    ref="swiper"
  >
    <ul :style="[ulStyle, swiperStyle]">
      <li
        v-for="(item, ind) in imgList"
        :key="ind"
        :style="{ width: itemWidth + 'px' }"
        :class="[index === ind ? 'active' : '', effect]"
        @click="handleClick(item)"
      >
        <img :src="item" />
      </li>
    </ul>
    <div v-show="options.showDots" class="swiper-dots">
      <div
        v-for="(item, ind) in imgList"
        :key="ind"
        class="dots-item"
        :class="{ active: index === ind }"
      ></div>
    </div>
  </div>
</template>
<script>
/*
  imgList array 轮播图数据列表
  options object 轮播图配置项
  height string 控制显示轮播图的高度，默认3rem
  effect string 轮播图显示效果，两种类型：normal，zoom

  options参数说明
  showDots Boolean 控制是否显示分页器
  autopaly Boolean 控制是否自动播放
  interval Number 轮播间隔时间，默认3000

  onClickImg fun 返回焦点图索引
*/
export default {
  data () {
    return {
      ulStyle: { width: '', paddingLeft: '' }, // 轮播图容器宽度
      itemWidth: 0, // 单个轮播图容器的宽度，默认屏幕宽度,
      swiperStyle: {},
      index: 0,
      touchStart: {},
      touchEnd: {},
      intervalTime: ''
    };
  },
  props: {
    height: {
      type: String,
      default: '6rem'
    },
    options: {
      type: Object,
      default: () => {
        return {
          showDots: true,
          interval: 4000,
          autoplay: true
        };
      }
    },
    imgList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    effect: {
      type: String,
      default: 'normal'
    }
  },
  mounted () {
    this.calcWidth();
    this.handleLoopMove();
  },
  methods: {
    calcWidth () {
      this.$nextTick(() => {
        this.effect === 'normal' ? this.itemWidth = this.$refs.swiper.offsetWidth : this.itemWidth = this.$refs.swiper.offsetWidth - 40;
        this.handleType();
        let length = this.imgList.length;
        this.ulStyle.width = parseInt((this.itemWidth + 40) * length) + 'px';
      });
    },
    handleClick (val) {
      this.$emit('onClickImg', val);
    },
    handleType () {
      this.effect === 'normal' ? this.ulStyle.paddingLeft = 0 : this.ulStyle.paddingLeft = '20px';
    },
    handleMove () {
      let moveX = this.itemWidth * this.index;
      if (this.index === 0) {
        moveX = 0;
        this.handleType();
      } else {
        this.ulStyle.paddingLeft = 0; // 将起始位置左侧的padding置为0
        if (this.effect === 'zoom') {
          moveX = moveX - 20;
        }
      }
      this.swiperStyle = {
        transform: 'translateX(-' + moveX + 'px)'
      };
    },
    handleLoopMove () {
      if (this.options.autoplay) {
        let interval = this.options.interval ? this.options.interval : 3000;
        this.intervalTime = setInterval(() => {
          this.index++;
          if (this.index > this.imgList.length - 1) {
            this.index = 0;
          }
          this.handleMove();
        }, interval);
      }
    },
    onTouchStart (e) {
      this.touchStart = e.changedTouches[0];
      clearInterval(this.intervalTime);
    },
    onTouchEnd (e) {
      this.touchEnd = e.changedTouches[0];
      // 比较移动的点位差，正数就是右滑，负数就是左滑
      if (this.touchEnd.clientX - this.touchStart.clientX > 60) {
        this.index--;
        if (this.index <= 0) {
          this.index = 0;
        }
      } else if (this.touchEnd.clientX - this.touchStart.clientX < -60) {
        this.index++;
        if (this.index >= this.imgList.length - 1) {
          this.index = this.imgList.length - 1;
        }
      }
      this.handleMove();
      this.handleLoopMove();
    }
  },
  watch: {
    imgList: (e) => {
      this.calcWidth();
    }
  },
  destroyed () {
    if (this.autoplay) {
      clearInterval(this.intervalTime);
    }
  }
};
</script>
<style lang="scss" scoped>
.swiper-component {
  overflow: hidden;
  position: relative;
  ul {
    white-space: nowrap;
    height: 100%;
    transition: 0.5s ease;
    li {
      list-style: none;
      height: 100%;
      float: left;
      overflow: hidden;
      img {
        width: 100%;
      }
      &.zoom {
        border-radius: 0.16rem;
        transform: scale(0.93);
        transition: 0.5s ease;
        &.active {
          transform: scale(1);
        }
      }
    }
  }
  .swiper-dots {
    position: absolute;
    bottom: 0.16rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    .dots-item {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.7);
      margin: 0rem 0.2rem;
      &.active {
        background: #409eff;
      }
    }
  }
}
</style>
