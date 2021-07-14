<template>
  <div class="sheet" @click="cancel" v-if="isShow">
    <div class="sheet-box">
      <div
        class="sheet-data"
        v-for="(item, index) in sheetList"
        :key="index"
        @click.stop="selectSheet(index)"
      >
        {{ item[sheetName] }}
      </div>
      <div class="sheet-data sheet-cancel" @click.stop="cancel">取消</div>
    </div>
  </div>
</template>
<script>
/*
    isShow boolean 是否展示
    sheetList array 渲染数组
    sheetName string 要渲染的字段
    clickSheet func 选中值
*/
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    sheetList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    sheetName: {
      type: String,
      default: 'name'
    }
  },
  methods: {
    cancel () {
      this.$emit('clickSheet', {});
    },
    selectSheet (index) {
      this.$emit('clickSheet', this.sheetList[index]);
    }
  }
};
</script>
<style lang="scss" scoped>
.sheet {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #000, $alpha: 0.4);
  .sheet-box {
    position: absolute;
    width: 100%;
    bottom: 0;
    text-align: center;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    -webkit-animation:fadeInUp 0.2s linear 0s 1 both;
    .sheet-cancel {
      border-top: 0.2rem solid rgb(244, 243, 243);
    }
    .sheet-data {
      background: #fff;
      padding: 0.8rem 0;
      border-bottom: 1px solid rgb(244, 243, 243);
    }
    .sheet-data:first-child {
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }
  }
  @-webkit-keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate(0, 20rem);
      transform: stranslate(0, 20rem);
    }
    to {
      opacity: 1;
      -webkit-transform: translate(0,0);
      transform: stranslate(0,0);
    }
  }
}
</style>
