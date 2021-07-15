<template>
    <div class="btn" @click="clickBtn">{{title}}</div>
</template>
<script>
export default{
  props: {
    title: {
      type: String
    }
  },
  methods: {
    clickBtn () {
      this.$emit('clickBtn');
    }
  }
};
</script>
<style lang="scss" scoped>
.btn{
  width: 90%;
  margin: 1rem auto;
  background: #1da1f2;
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  color: #fff;
  border-radius: .5rem;
  font-weight: bold;
}
</style>
