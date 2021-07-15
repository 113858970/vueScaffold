<template>
    <div>
      <LuckyWheel
        ref="LuckyWheel"
        width="300px"
        height="300px"
        :prizes="prizes"
        :default-style="defaultStyle"
        :blocks="blocks"
        :buttons="buttons"
        @start="startCallBack"
        @end="endCallBack"
      />
      <div class="box">
        <img :src="require('@/static/images/lottery/l1_bg.png')" width="100%" />
        <LuckyWheel
          class="luck-draw"
          ref="LuckyWheel1"
          width="245px"
          height="245px"
          :default-style="defaultStyle1"
          :blocks="blocks1"
          :prizes="prizes1"
          :buttons="buttons1"
          @start="startCallBack1"
          @end="endCallBack1"
        />
      </div>
    </div>
</template>
<script>
/*
  blocks 边框样式，array(obj) [{padding:内边距, background:背景色}] 支持多层
  prizes 奖品，array(obj) [{
    background:扇形背景色,
    fonts:[{
      text:内容,top:距离顶部的高度,fontColor:字体,fontSize:字体大小
      }],
    imgs:[{
      src:图片路径,top:距离顶部的高度,width:图片宽度,height:图片高度
    }]
  }]
  buttons 按钮列表，array(obj) [{radius:按钮半径,pointer:是否显示指针,background:背景色,fonts:[{
      text:内容,top:距离顶部的高度,fontColor:字体,fontSize:字体大小,lineHeight:字体行高
    }],
    imgs:[{
      src:图片路径,top:距离顶部的高度,width:图片宽度,height:图片高度
    }]
  }]
  defaultConfig 整体配置 obj {gutter:扇形之间的缝隙,stopRange:扇形区域的停止范围,offsetDegree:转盘的偏移角度,speed:旋转速度峰值,accelerationTime:开始旋转时间,decelerationTime:缓慢停止时间}
  default-style 默认样式 obj {fontColor:字体颜色,fontSize:字体大小,fontStyle:字体样式,fontWeight:字体粗细,lineHeight:字体行高,background:奖品区域背景颜色}
  strat?: Function 开始抽奖前 （当点击抽奖按钮时，触发该回调）
  end?: Function 抽奖结束后 （当九宫格完全停止时，触发该回调，返回中奖索引）
  play() 开始抽奖 （调用该方法时，游戏才会开始, 没有参数）
  stop(index) 缓慢停止抽奖 （调用该方法时，才会缓慢停止, 参数是中奖的索引；如果stop方法传入-1, 那游戏立即停止, 并且end回调不会触发）
*/

import { LuckyWheel } from 'vue-luck-draw';
export default{
  data () {
    return {
      prizes: [],
      defaultStyle: {
        fontColor: '#d64737',
        fontSize: '14px'
      },
      blocks: [
        { padding: '13px', background: '#d64737' }
      ],
      buttons: [
        { radius: '50px', background: '#d64737' },
        { radius: '45px', background: '#fff' },
        { radius: '41px', background: '#f6c66f', pointer: true },
        {
          radius: '35px',
          background: '#ffdea0',
          fonts: [
            { text: '开始\n抽奖', top: '-20px' }
          ]
        }
      ],
      // 转盘2
      prizes1: [],
      buttons1: [{
        radius: '45px',
        imgs: [{ src: require('@/static/images/lottery/l1_btn.png'), width: '102%', top: '-127%' }]
      }],
      blocks1: [
        { padding: '3px', background: '#a70c1b' },
        { padding: '6px', background: '#ffb633' }
      ],
      defaultStyle1: {
        fontColor: '#a70c1b',
        fontSize: '10px'
      }
    };
  },
  components: {
    LuckyWheel
  },
  mounted () {
    this.getPrizesList();
    this.getPrizesList1();
  },
  methods: {
    getPrizesList () {
      const prizes = [];
      let data = ['1元红包', '100元红包', '0.5元红包', '2元红包', '10元红包', '50元红包', '0.3元红包', '5元红包'];
      data.forEach((item, index) => {
        prizes.push({
          name: item,
          background: index % 2 ? '#f9e3bb' : '#f8d384',
          fonts: [{ text: item, top: '10%' }],
          imgs: [{src: require('@/static/images/lottery/l1.jpeg'), width: '30%', height: '30%', top: '40%'}]
        });
      });
      this.prizes = prizes;
    },
    getPrizesList1 () {
      const prizes = [];
      let data = [
        { name: '谢谢参与', img: require('@/static/images/lottery/l1_icon1.png') },
        { name: '红包', img: require('@/static/images/lottery/l1_icon2.png') },
        { name: '抽奖次数+3', img: require('@/static/images/lottery/l1_icon3.png') },
        { name: '礼物', img: require('@/static/images/lottery/l1_icon4.png') },
        { name: '谢谢参与', img: require('@/static/images/lottery/l1_icon1.png') },
        { name: '红包', img: require('@/static/images/lottery/l1_icon2.png') },
        { name: '抽奖次数+3', img: require('@/static/images/lottery/l1_icon3.png') },
        { name: '礼物', img: require('@/static/images/lottery/l1_icon4.png') }
      ];
      data.forEach((item, index) => {
        prizes.push({
          name: item.name,
          background: index % 2 === 0 ? '#ffd099' : '#fff',
          fonts: [{ text: item.name, top: '8%' }],
          imgs: [{ src: item.img, width: '30%', top: '30%' }]
        });
      });
      this.prizes1 = prizes;
    },
    startCallBack () {
      this.$refs.LuckyWheel.play();
      setTimeout(() => {
        this.$refs.LuckyWheel.stop(2);
      }, 3000);
    },
    endCallBack (prize) {
      this.$toast({title: `恭喜你获得${prize.name}`});
    },
    startCallBack1 () {
      this.$refs.LuckyWheel1.play();
      setTimeout(() => {
        this.$refs.LuckyWheel1.stop(Math.random() * 8 >> 0);
      }, 2000);
    },
    endCallBack1 (prize) {
      this.$toast({title: `恭喜你获得${prize.name}`});
    }
  }
};
</script>
<style lang="scss" scoped>
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
