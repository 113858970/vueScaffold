<template>
  <div class="select">
    <div class="select-bg" @click="cancel"></div>
    <div class="select-box">
      <p class="select-btn">
        <span @click="cancel">取消</span>
        <span style="color: #107e52" @click="select">完成</span>
      </p>
      <div class="select-content">
        <div class="select-seat"></div>
        <ul
          ref="wrapper"
          @touchstart="touchStart($event, 'level1')"
          @touchmove="touchMove($event, 'level1')"
          @touchend="touchEnd($event, 'level1')"
          :style="level1Style"
          :class="[{ 'select-ani': addSelect }]"
        >
          <li
            v-for="(item, index) in level1List"
            :class="[{ 'select-active': index == level1Index }]"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
        <ul
          @touchstart="touchStart($event, 'level2')"
          @touchmove="touchMove($event, 'level2')"
          @touchend="touchEnd($event, 'level2')"
          :style="level2Style"
          :class="[{ 'select-ani': addSelect }]"
          v-if="levelNumber > 1"
        >
          <li
            v-for="(item, index) in level2List"
            :class="[{ 'select-active': index == level2Index }]"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
        <ul
          @touchstart="touchStart($event, 'level3')"
          @touchmove="touchMove($event, 'level3')"
          @touchend="touchEnd($event, 'level3')"
          :style="level3Style"
          :class="[{ 'select-ani': addSelect }]"
          v-if="levelNumber > 2"
        >
          <li
            v-for="(item, index) in level3List"
            :class="[{ 'select-active': index == level3Index }]"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    level1List: {
      type: Array,
      default: () => {
        return []
      }
    },
    level2List: {
      type: Array,
      default: () => {
        return []
      }
    },
    level3List: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultValue: {
      type: Array,
      default: () => {
        return []
      }
    },
    levelNumber: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      level1Style: {
        WebkitTransform: 'translate3d(0px,0px,0px)',
        width: '33.33%'
      },
      level2Style: {
        WebkitTransform: 'translate3d(0px,0px,0px)',
        left: '33.33%',
        width: '33.33%'
      },
      level3Style: {
        WebkitTransform: 'translate3d(0px,0px,0px)',
        left: '66.66%',
        width: '33.33%'
      },
      startTop: 0,
      level1Index: 0,
      level2Index: 0,
      level3Index: 0,
      translateY: 0,
      maxScroll: 0,
      addHeight: 0,
      addSelect: false,
      optionHeight: 0,
      level1Val: '',
      level2Val: '',
      level3Val: '',
      val: {
        level1Val: {},
        level2Val: {},
        level3Val: {}
      }
    }
  },
  watch: {
    level1Val (value) {
      this.level2Val = this.level2List[0].value
      this.level3Val = this.level3List[0].value
    },
    level2Val (value) {
      this.level3Val = this.level3List[0].value
    }
  },
  mounted () {
    this.optionHeight = parseInt(this.$refs['wrapper'].children[0].offsetHeight)
    this.val.level1Val = this.defaultValue[0] ? this.defaultValue[0] : {}
    this.val.level2Val = this.defaultValue[1] ? this.defaultValue[1] : {}
    this.val.level3Val = this.defaultValue[2] ? this.defaultValue[2] : {}
    this.level1Val = this.defaultValue[0] ? this.defaultValue[0]['value'] : ''
    this.level2Val = this.defaultValue[1] ? this.defaultValue[1]['value'] : ''
    this.level3Val = this.defaultValue[2] ? this.defaultValue[2]['value'] : ''
    if (this.level1Val) {
      this.level1List.map((item, index) => {
        if (item.value === this.level1Val) {
          this.level1Style.WebkitTransform =
              'translate3d(0px,-' +
              (index * this.optionHeight) +
              'px,0px)'
        }
      })
    }
    if (this.level2Val) {
      this.level2List.map((item, index) => {
        if (item.value === this.level2Val) {
          this.level2Style.WebkitTransform =
              'translate3d(0px,-' +
              (index * this.optionHeight) +
              'px,0px)'
        }
      })
    }
    if (this.level3Val) {
      this.level3List.map((item, index) => {
        if (item.value === this.level3Val) {
          this.level3Style.WebkitTransform =
              'translate3d(0px,-' +
              (index * this.optionHeight) +
              'px,0px)'
        }
      })
    }
    this.level1Style.width = this.levelNumber === 1 ? '100%' : this.levelNumber === 2 ? '50%' : '33.33%'
    this.level2Style.left = this.levelNumber === 2 ? '50%' : this.levelNumber === 3 ? '33.33%' : ''
    this.level2Style.width = this.levelNumber === 2 ? '50%' : this.levelNumber === 3 ? '33.33%' : ''
    this.level3Style.left = this.levelNumber === 3 ? '66.66%' : ''
    console.log(this.level1Style)
  },
  methods: {
    cancel () {
      this.$emit('cancel', false)
    },
    select () {
      let selectValue = {}
      for (let i = 1; i <= this.levelNumber; i++) {
        selectValue['level' + i + 'Val'] = this.val['level' + i + 'Val']
      }
      this.$emit('select', selectValue)
    },
    // 滑动开始
    touchStart (e, val) {
      e.preventDefault()
      this.addSelect = false
      this.addHeight = e.currentTarget.children[0].offsetHeight
      this.maxScroll = this.addHeight * e.currentTarget.children.length
      this.startTop = e.targetTouches[0].pageY
      switch (val) {
        case 'level1':
          this.translateY = parseInt(
            this.level1Style.WebkitTransform.slice(
              this.level1Style.WebkitTransform.indexOf(',') + 1,
              this.level1Style.WebkitTransform.lastIndexOf(',')
            )
          )
          break
        case 'level2':
          this.translateY = parseInt(
            this.level2Style.WebkitTransform.slice(
              this.level2Style.WebkitTransform.indexOf(',') + 1,
              this.level2Style.WebkitTransform.lastIndexOf(',')
            )
          )
          break
        case 'level3':
          this.translateY = parseInt(
            this.level3Style.WebkitTransform.slice(
              this.level3Style.WebkitTransform.indexOf(',') + 1,
              this.level3Style.WebkitTransform.lastIndexOf(',')
            )
          )
          break
        default:
          break
      }
    },
    // 滑动进行中
    touchMove (e, val) {
      e.preventDefault()
      switch (val) {
        case 'level1':
          if (e.targetTouches[0].pageY - this.startTop + this.translateY > 0) {
            this.level1Style.WebkitTransform = 'translate3d(0px,0px,0px)'
          } else if (
            e.targetTouches[0].pageY - this.startTop + this.translateY <
            -(this.maxScroll - this.addHeight)
          ) {
            this.level1Style.WebkitTransform =
              'translate3d(0px,' +
              -(this.maxScroll - this.addHeight) +
              'px,0px)'
          } else {
            this.level1Style.WebkitTransform =
              'translate3d(0px,' +
              (e.targetTouches[0].pageY - this.startTop + this.translateY) +
              'px,0px)'
          }
          break
        case 'level2':
          if (e.targetTouches[0].pageY - this.startTop + this.translateY > 0) {
            this.level2Style.WebkitTransform = 'translate3d(0px,0px,0px)'
          } else if (
            e.targetTouches[0].pageY - this.startTop + this.translateY <
            -(this.maxScroll - this.addHeight)
          ) {
            this.level2Style.WebkitTransform =
              'translate3d(0px,' +
              -(this.maxScroll - this.addHeight) +
              'px,0px)'
          } else {
            this.level2Style.WebkitTransform =
              'translate3d(0px,' +
              (e.targetTouches[0].pageY - this.startTop + this.translateY) +
              'px,0px)'
          }
          break
        case 'level3':
          if (e.targetTouches[0].pageY - this.startTop + this.translateY > 0) {
            this.level3Style.WebkitTransform = 'translate3d(0px,0px,0px)'
          } else if (
            e.targetTouches[0].pageY - this.startTop + this.translateY <
            -(this.maxScroll - this.addHeight)
          ) {
            this.level3Style.WebkitTransform =
              'translate3d(0px,' +
              -(this.maxScroll - this.addHeight) +
              'px,0px)'
          } else {
            this.level3Style.WebkitTransform =
              'translate3d(0px,' +
              (e.targetTouches[0].pageY - this.startTop + this.translateY) +
              'px,0px)'
          }
          break
        default:
          break
      }
    },
    // 滑动结束
    touchEnd (e, val) {
      e.preventDefault()
      this.addSelect = true
      switch (val) {
        case 'level1':
          let level1TranslateY = parseInt(
            this.level1Style.WebkitTransform.slice(
              this.level1Style.WebkitTransform.indexOf(',') + 1,
              this.level1Style.WebkitTransform.lastIndexOf(',')
            )
          )
          this.level1Index = -Math.round(level1TranslateY / this.addHeight)
          this.level1Style.WebkitTransform =
            'translate3d(0px,' +
            Math.round(level1TranslateY / this.addHeight) * this.addHeight +
            'px,0px)'
          this.level2Style.WebkitTransform = this.level3Style.WebkitTransform =
            'translate3d(0px,0px,0px)'
          this.level2Index = this.level3Index = 0
          this.$emit('changeSelect', {'level': 'level1', 'selectValue': this.level1List[this.level1Index].value})
          break
        case 'level2':
          let level2TranslateY = parseInt(
            this.level2Style.WebkitTransform.slice(
              this.level2Style.WebkitTransform.indexOf(',') + 1,
              this.level2Style.WebkitTransform.lastIndexOf(',')
            )
          )
          this.level2Index = -Math.round(level2TranslateY / this.addHeight)
          this.level2Style.WebkitTransform =
            'translate3d(0px,' +
            Math.round(level2TranslateY / this.addHeight) * this.addHeight +
            'px,0px)'
          this.level3Style.WebkitTransform = 'translate3d(0px,0px,0px)'
          this.level3Index = 0
          this.$emit('changeSelect', {'level': 'level2', 'selectValue': this.level2List[this.level2Index].value})
          break
        case 'level3':
          let level3TranslateY = parseInt(
            this.level3Style.WebkitTransform.slice(
              this.level3Style.WebkitTransform.indexOf(',') + 1,
              this.level3Style.WebkitTransform.lastIndexOf(',')
            )
          )
          this.level3Index = -Math.round(level3TranslateY / this.addHeight)
          this.level3Style.WebkitTransform =
            'translate3d(0px,' +
            Math.round(level3TranslateY / this.addHeight) * this.addHeight +
            'px,0px)'
          this.$emit('changeSelect', {'level': 'level3', 'selectValue': this.level3List[this.level3Index].value})
          break
        default:
          break
      }
      this.dataProcessing()
    },
    dataProcessing () {
      this.val.level1Val = this.level1List[this.level1Index]
      this.level1Val = this.level1List[this.level1Index].value
      this.val.level2Val = this.level2List[this.level2Index]
      this.level2Val = this.level2List[this.level2Index].value
      this.val.level3Val = this.level3List[this.level3Index]
      this.level3Val = this.level3List[this.level3Index].value
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .select-bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }
  .select-box {
    height: 40%;
    position: absolute;
    z-index: 101;
    width: 100%;
    max-height: 100%;
    overflow: hidden;
    background: #fff;
    bottom: 0;
    .select-btn {
      height: 2rem;
      font-size: 1rem;
      line-height: 2rem;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 0 0.5rem;
      background: #f9f9f9;
      display: flex;
      justify-content: space-between;
    }
  }
  .select-content {
    width: 100%;
    position: relative;
    background: #fff;
    height: 12rem;
    overflow: hidden;
    -webkit-mask-box-image: linear-gradient(
      0deg,
      transparent,
      transparent 5%,
      #fff 20%,
      #fff 80%,
      transparent 95%,
      transparent
    );
    font-size: 1rem;
    .select-seat {
      width: 100%;
      height: 1.7rem;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      margin-top: 4rem;
      background: #f9f9f9;
    }
    ul {
      position: absolute;
      left: 0;
      top: 4rem;
      -webkit-transform-style: preserve-3d;
      -webkit-backface-visibility: hidden;
      text-align: center;
      padding-left: 0;
      li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(0, 0, 0, 0.54);
        padding: 3px 0;
      }
      .select-active {
        color: rgba(0, 0, 0, 0.87);
        transform: scale(1.1);
        transition: 0.5s;
      }
    }
  }
}
.select-ani {
  transition: 0.8s;
}
</style>
