<template>
  <div>
    <LuckyGrid
      ref="LuckDraw"
      width="300px"
      height="300px"
      :prizes="prizes"
      :buttons="buttons"
      :blocks="blocks"
      :default-config="defaultConfig"
      :default-style="defaultStyle"
      :active-style="activeStyle"
      @start="startCallBack"
      @end="endCallBack"
    />
    <LuckyGrid
      ref="LuckDraw1"
      width="310px"
      height="330px"
      :prizes="prizes1"
      :blocks="blocks1"
      :buttons="buttons1"
      :default-style="defaultStyle1"
      :active-style="activeStyle1"
      @start="startCallBack1"
      @end="endCallBack1"
    />
  </div>
</template>

<script>
/*
  blocks 边框样式，array(obj) [{borderRadius:圆角半径, background:背景色,padding:内边距}] 支持多层
  prizes 奖品，array(obj) [{
    background:格子背景色,
    x: 相对坐标x （如果是标准的 3*3 宫格，那 x 的范围是 0 ~ 2）,
    y: 相对坐标y （如果是标准的 3*3 宫格，那 y 的范围是 0 ~ 2）
    col: 横向合并格子 （用来横向合并单元格，默认为 1）
    row: 纵向合并格子 （用来纵向合并单元格，默认为 1）
    borderRadius: 格子圆角
    fonts:[{
      text:内容,top:距离顶部的高度,fontColor:字体,fontSize:字体大小
      }],
    imgs:[{
      src:图片路径,activeSrc:中奖图片,top:距离顶部的高度,width:图片宽度,height:图片高度
    }]
  }]
  buttons 按钮列表，array(obj) [{
    x:  相对坐标x （如果是标准的 3*3 宫格，那 x 的范围是 0 ~ 2）
    y:  相对坐标y （如果是标准的 3*3 宫格，那 y 的范围是 0 ~ 2）
    col:  横向合并格子 （用来横向合并单元格，默认为 1）
    row:  纵向合并格子 （用来纵向合并单元格，默认为 1）
    borderRadius:  格子圆角
    shadow:  格子阴影 （由 4 个值组成：1.水平位置、2.垂直位置、3.模糊度、4.阴影颜色）
    background:  格子背景色
    fonts:[{
      text:内容,top:距离顶部的高度,fontColor:字体,fontSize:字体大小,lineHeight:字体行高
    }],
    imgs:[{
      src:图片路径,top:距离顶部的高度,width:图片宽度,height:图片高度
    }]
  }]
  defaultConfig 整体配置 obj {gutter:格子之间的间距,speed:旋转速度峰值,accelerationTime:开始旋转时间,decelerationTime:缓慢停止时间}
  default-style 默认样式 obj {fontColor:字体颜色,fontSize:字体大小,fontStyle:字体样式,fontWeight:字体粗细,lineHeight:字体行高,background:奖品区域背景颜色}
  activeStyle 中奖标记样式 obj {fontColor: 字体颜色,fontSize: 字体大小(px),fontStyle:字体样式,fontWeight:字体粗细,background:格子的背景颜色}
  rows: 设置布局有几行
  cols: 设置布局有几列
  strat?: Function 开始抽奖前 （当点击抽奖按钮时，触发该回调）
  end?: Function 抽奖结束后 （当九宫格完全停止时，触发该回调，返回中奖索引）
  play() 开始抽奖 （调用该方法时，游戏才会开始, 没有参数）
  stop(index) 缓慢停止抽奖 （调用该方法时，才会缓慢停止, 参数是中奖的索引；如果stop方法传入-1, 那游戏立即停止, 并且end回调不会触发）
*/
import { LuckyGrid } from 'vue-luck-draw';
export default {
  data () {
    return {
      luckyNum: 0,
      prizes: [],
      blocks: [
        { padding: '15px', background: '#ffc27a', borderRadius: 28 },
        { padding: '4px', background: '#ff4a4c', borderRadius: 23 },
        { padding: '4px', background: '#ff625b', borderRadius: 20 }
      ],
      defaultConfig: {
        gutter: 5
      },
      defaultStyle: {
        borderRadius: 15,
        fontColor: '#DF424B',
        fontSize: '14px',
        textAlign: 'center',
        background: '#fff',
        shadow: '0 5 1 #ebf1f4'
      },
      activeStyle: {
        background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
        shadow: ''
      },
      // 抽奖2
      prizes1: [],
      blocks1: [
        { padding: '1px', background: '#e2cea3', borderRadius: '13px' },
        { padding: '5px 0px', background: '#f3ecdc', borderRadius: '13px' },
        { padding: '1px', background: '#e2cea3', borderRadius: '8px' },
        { padding: '15px 10px', background: '#fffcf5', borderRadius: '8px' }
      ],
      buttons1: [{
        x: 1,
        y: 1,
        background: 'rgba(0, 0, 0, 0)',
        imgs: [
          { src: require('@/static/images/lottery/default-btn.png'), width: '90%', top: '5%' }
        ]
      }],
      defaultStyle1: {
        background: '#ffefd6',
        borderRadius: '5px',
        fontColor: '#755c28',
        fontSize: '10px',
        lineHeight: '12px'
      },
      activeStyle1: {
        background: '#fff',
        shadow: ''
      }
    };
  },
  components: {
    LuckyGrid
  },
  computed: {
    buttons () {
      return [{
        x: 1,
        y: 1,
        background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
        shadow: '0 5 1 #e89b4f',
        fonts: [
          { text: `${this.luckyNum} 次`, fontColor: '#fff', top: '73%', fontSize: '11px' }
        ],
        imgs: [
          { src: require('@/static/images/lottery/l2_icon3.png'), width: '65%', top: '13%' },
          { src: require('@/static/images/lottery/l2_icon2.png'), width: '50%', top: '73%' }
        ]
      }];
    }
  },
  mounted () {
    this.getPrizeList();
    this.getPrizesList1();
  },
  methods: {
    getPrizeList () {
      // 模拟接口请求奖品列表
      setTimeout(() => {
        const data = [
          { name: '1元红包', img: require('@/static/images/lottery/l2_icon1.png') },
          { name: '100元红包', img: require('@/static/images/lottery/l2_icon1.png') },
          { name: '0.5元红包', img: require('@/static/images/lottery/l2_icon1.png') },
          { name: '2元红包', img: require('@/static/images/lottery/l2_icon1.png') },
          { name: '10元红包', img: require('@/static/images/lottery/l2_icon1.png') },
          { name: '50元红包', img: require('@/static/images/lottery/l2_icon1.png') },
          { name: '0.3元红包', img: require('@/static/images/lottery/l2_icon1.png') },
          { name: '5元红包', img: require('@/static/images/lottery/l2_icon1.png') }
        ];
        const prizes = [];
        this.luckyNum = 1;
        let axis = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1]];
        for (let i = 0; i < 8; i++) {
          let item = data[i];
          prizes.push({
            index: i,
            x: axis[i][0],
            y: axis[i][1],
            fonts: [{ text: item.name, top: '70%' }],
            imgs: [{ src: item.img, width: '55%', top: '8%' }]
          });
        }
        this.prizes = prizes;
      }, 0);
    },
    startCallBack () {
      if (!this.luckyNum) return this.$toast({title: `还剩0次抽奖机会`});
      this.$refs.LuckDraw.play();
      setTimeout(() => {
        this.$refs.LuckDraw.stop(Math.random() * 7 >> 0);
      }, 2000);
    },
    endCallBack (prize) {
      this.$toast({title: `恭喜你获得大奖: ${prize.fonts[0].text}`});
      this.luckyNum--;
    },
    getPrizesList1 () {
      const prizes = [];
      let axis = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1]];
      let data = ['电热烘干毛巾架', '10元满减红包', '2积分', '胖喵焖烧罐', '5元满减红包', '多层置物架', '3元直减红包', '全场满99减10'];
      axis.forEach((item, index) => {
        prizes.push({
          x: item[0],
          y: item[1],
          title: data[index],
          imgs: [{
            width: '100%',
            height: '100%',
            src: require(`@/static/images/lottery/default-${index}.png`),
            activeSrc: require(`@/static/images/lottery/active-${index}.png`)
          }]
        });
      });
      this.prizes1 = prizes;
    },
    startCallBack1 () {
      this.$refs.LuckDraw1.play();
      setTimeout(() => {
        this.$refs.LuckDraw1.stop(Math.random() * 8 >> 0);
      }, 2000);
    },
    endCallBack1 (prize) {
      console.log(prize);
      this.$toast({title: `恭喜你获得大奖: ${prize.title}`});
    }
  }
};
</script>
