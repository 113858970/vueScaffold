<template>
  <div
    :class="{ label: true, borderBottom: borderBottom }"
    :style="{ minHeight: height }"
  >
    <p>{{ title }}</p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    borderBottom: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '2.5rem'
    }
  },
  data () {
    return {}
  }
}
</script>
<style lang='scss' scoped>
.label {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.4rem 0.2rem;
  input,
  textarea {
    border: none;
  }
  input:focus,
  textarea:focus {
    outline: none;
  }
  p{
    min-width: 30%;
  }
}
.borderBottom {
  border-bottom: 1px solid rgb(222, 222, 222);
}
</style>
