<template>
  <div>
    <span
      :class="{ 'switch-on': isChecked , 'switch':true}"
      :value="value"
      @click="toggle"
      :style="{'background':bgBackground}"
    ></span>
  </div>
</template>
<script>
/*
  value boolean switch值
  bgBackground string 选中背景颜色
  toggle func 返回选中的值

*/
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    },
    bgBackground: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isChecked: this.value
    }
  },
  watch: {
    value (val) {
      this.isChecked = val
    }
  },
  methods: {
    toggle () {
      this.isChecked = !this.isChecked
      this.$emit('switchChange', this.isChecked)
    }
  }
}
</script>
<style>
.switch {
  display: block;
  position: relative;
  width: 3.1rem;
  height: 1.3rem;
  outline: 0;
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid #dfdfdf;
  transition: background-color 0.1s, border 0.1s;
  cursor: pointer;
}
.switch:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 3rem;
  height: 1.2rem;
  border-radius: 1rem;
  background-color: #fdfdfd;
  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}
.switch:after {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 1.2rem;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}
.switch-on:before {
  height: 0;
  width: 0;
  background: none;
}
.switch-on:after {
  transform: translateX(1.7rem);
}
</style>
