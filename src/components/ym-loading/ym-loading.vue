<template>
  <div class="mask" v-if="isShow">
    <div :class="{ loading: true, loadingBg: isShowBg }">
      <div class="content">
            <div class="lds-default">
            <div class="lds lds1"></div>
            <div class="lds lds2"></div>
            <div class="lds lds3"></div>
            <div class="lds lds4"></div>
            <div class="lds lds5"></div>
            <div class="lds lds6"></div>
            <div class="lds lds7"></div>
            <div class="lds lds8"></div>
        </div>
      </div>
      <p :style="isShowBg ? 'color:#fff' : 'color:#000'">{{ text }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: false,
      text: '加载中',
      isShowBg: true
    }
  }
}
</script>
<style lang="scss">
.mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 6rem;
  padding: 1rem 0 0;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1rem;
  border-radius: 0.5rem;
  .content {
    width: 2rem;
    height: 2rem;
    margin: 0 auto 0.5rem;
  }
  .lds-default {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .lds {
    display: inline-block;
    width: 20%;
    height: 20%;
    border-radius: 100%;
    background: #333;
    position: absolute;
    transform: scale(0.5);
    animation: lds-default 1.04s ease infinite;
  }
  .lds1 {
    left: 0;
    top: 50%;
    margin-top: -10%;
    animation-delay: 0.13s;
  }
  .lds2 {
    left: 12%;
    top: 12%;
    animation-delay: 0.26s;
  }
  .lds3 {
    left: 50%;
    top: 0;
    margin-left: -10%;
    animation-delay: 0.39s;
  }
  .lds4 {
    top: 12%;
    right: 12%;
    animation-delay: 0.52s;
  }
  .lds5 {
    right: 0;
    top: 50%;
    margin-top: -10%;
    animation-delay: 0.65s;
  }
  .lds6 {
    right: 12%;
    bottom: 12%;
    animation-delay: 0.78s;
  }
  .lds7 {
    bottom: 0;
    left: 50%;
    margin-left: -10%;
    animation-delay: 0.91s;
  }
  .lds8 {
    bottom: 12%;
    left: 12%;
    animation-delay: 1.04s;
  }
  @keyframes lds-default {
    0% {
      transform: scale(1.2);
      opacity: 1;
    }

    100% {
      transform: scale(0.5);
      opacity: 0.5;
    }
  }
}
.loadingBg {
  background: rgba(0, 0, 0, 0.4);
}
</style>
