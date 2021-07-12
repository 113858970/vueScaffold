<template>
  <div class="box">
    <img :src="require('@/static/images/lottery/bg.png')" width="100%" />
    <LuckyWheel
      class="luck-draw"
      ref="LuckyWheel"
      width="245px"
      height="245px"
      :default-style="defaultStyle"
      :blocks="blocks"
      :prizes="prizes"
      :buttons="buttons"
      @start="startCallBack"
      @end="endCallBack"
    />
  </div>
</template>

<script>
import { LuckyGrid, LuckyWheel } from 'vue-luck-draw';
export default {
  data () {
    return {
      prizes: [],
      buttons: [{
        radius: '45px',
        imgs: [{ src: require('@/static/images/lottery/btn.png'), width: '102%', top: '-127%' }]
      }],
      blocks: [
        { padding: '3px', background: '#a70c1b' },
        { padding: '6px', background: '#ffb633' }
      ],
      defaultStyle: {
        fontColor: '#a70c1b',
        fontSize: '10px'
      }
    };
  },
  mounted () {
    this.getPrizesList();
  },
  components: {
    LuckyGrid,
    LuckyWheel
  },
  methods: {
    getPrizesList () {
      const prizes = [];
      let data = [
        { name: '谢谢参与', img: require('@/static/images/lottery/icon1.png') },
        { name: '红包', img: require('@/static/images/lottery/icon2.png') },
        { name: '抽奖次数+3', img: require('@/static/images/lottery/icon3.png') },
        { name: '礼物', img: require('@/static/images/lottery/icon4.png') },
        { name: '谢谢参与', img: require('@/static/images/lottery/icon1.png') },
        { name: '红包', img: require('@/static/images/lottery/icon2.png') },
        { name: '抽奖次数+3', img: require('@/static/images/lottery/icon3.png') },
        { name: '礼物', img: require('@/static/images/lottery/icon4.png') }
      ];
      data.forEach((item, index) => {
        prizes.push({
          name: item.name,
          background: index % 2 === 0 ? '#ffd099' : '#fff',
          fonts: [{ text: item.name, top: '8%' }],
          imgs: [{ src: item.img, width: '30%', top: '30%' }]
        });
      });
      this.prizes = prizes;
    },
    startCallBack () {
      this.$refs.LuckyWheel.play();
      setTimeout(() => {
        this.$refs.LuckyWheel.stop(Math.random() * 8 >> 0);
      }, 2000);
    },
    endCallBack (prize) {
      alert(`恭喜你获得${prize.name}`);
    }
  }
};
</script>

<style scoped>
  .box {
    position: relative;
    width: 310px;
    height: 310px;
  }
  .luck-draw {
    width: 245px;
    height: 245px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
  }
</style>
