<template>
  <div id="app">
    <p v-if="invalidRoute">404</p>
    <router-view v-else></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    invalidRoute () {
      return !this.$route.matched || this.$route.matched.length === 0
    }
  }
}
</script>

<style>
@import './static/styles/css.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
p,ul,li{
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
