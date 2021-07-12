<template>
  <div v-if="radioList && radioList.length > 0">
    <div
      class="checkbox-wrap"
      @click="handleClick(item.value)"
      v-for="(item, index) in radioList"
      :key="index"
    >
      <div
        class="left"
        :class="defaultValue == item[radioValue] ? 'box-click' : ''"
        :style="{ background: defaultValue == item[radioValue] ? bgColor : '' }"
      >
        <transition name="fade">
          <div class="hook" v-show="defaultValue == item[radioValue]"></div>
        </transition>
      </div>
      <div class="right">{{ item[radioName] }}</div>
    </div>
  </div>
</template>
<script>
/*
    radioList array 渲染数组
    defaultValue string 默认值
    radioName string radio要渲染的字段
    radioValue string radio的值
    bgColor string 背景色
    changeRadio func 值发生变化触发
*/
export default {
  props: {
    radioList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultValue: '',
    radioName: {
      type: String,
      default: 'name'
    },
    radioValue: {
      type: String,
      default: 'value'
    },
    bgColor: {
      type: String,
      default: '#1da1f2'
    }
  },
  methods: {
    handleClick (value) {
      this.$emit('changeRadio', value);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-wrap {
  height: 1.2rem;
  display: inline-block;
  vertical-align: center;
  margin-bottom: 0.2rem;
  .left {
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 1.2rem;
    background-color: #fff;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .right {
    margin-left: 0.1rem;
    padding-right: 0.8rem;
    display: inline;
    vertical-align: text-top;
    line-height: 1rem;
    color: #66757f;
    font-size: 1rem;
  }
  .box-click {
    border: 0.5px solid #ccc;
  }
  .hook {
    margin-left: 0.4rem;
    margin-top: 0.1rem;
    width: 0.3rem;
    height: 0.5rem;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(40deg);
  }
}
.checkbox-wrap:hover {
  cursor: pointer;
}
</style>
