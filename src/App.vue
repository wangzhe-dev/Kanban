
<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-else />
  </div>
</template>
<script>
import * as THREE from "three";
window.THREE = THREE
export default {
  mounted() {
  },
  methods: {},
}
</script>
<style lang='scss'>
@import url("./styles/public.css");
html,
body {
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  color: #2c3e50;
  // background: #000304;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
