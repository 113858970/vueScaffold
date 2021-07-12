<template>
  <div v-if="selectList && selectList.length > 0">
    <div
      class="checkbox-wrap"
      @click="handleClick(item[selectValue])"
      v-for="(item, index) in selectList"
      :key="index"
    >
      <div
        class="left"
        :class="defaultValue.indexOf(item[selectValue]) >= 0 ? 'box-click' : ''"
        :style="{
          background:
            defaultValue.indexOf(item[selectValue]) >= 0 ? bgColor : '',
        }"
      >
        <transition name="fade">
          <div
            class="hook"
            v-show="defaultValue.indexOf(item[selectValue]) >= 0"
          ></div>
        </transition>
      </div>
      <div class="right">{{ item[selectName] }}</div>
    </div>
  </div>
</template>
<script>
/*
    selectList array 渲染数组
    defaultValue string 默认值
    selectName string select要渲染的字段
    selectValue string select的值
    bgColor string 背景色
    changeSelect func 值发生变化触发
*/
export default {
  props: {
    selectList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultValue: {
      type: Array,
      default: () => {
        return [];
      }
    },
    selectName: {
      type: String,
      default: 'name'
    },
    selectValue: {
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
      let selectedData = this.defaultValue;
      if (this.defaultValue.indexOf(value) >= 0) {
        selectedData.splice(this.defaultValue.indexOf(value), 1);
      } else {
        selectedData.push(value);
      }
      this.$emit('changeCheckbox', selectedData);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-wrap {
  height: 1.3rem;
  display: inline-block;
  vertical-align: center;
  margin-bottom: 0.5rem;
  .left {
    height: 1.3rem;
    width: 1.3rem;
    border-radius: 7px;
    background-color: #fff;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .right {
    padding-right: 0.8rem;
    display: inline;
    vertical-align: top;
    line-height: 1.3rem;
    color: #66757f;
    font-size: 1rem;
  }
  .box-click {
    border: 0.5px solid #ccc;
  }
  .hook {
    margin-left: 0.4rem;
    margin-top: 0.2rem;
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
