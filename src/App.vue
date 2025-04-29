<template>
  <div id="app">
    <div class="app-top" style="margin-bottom: 1px;">
      <MainTop>大同市煤炭资源信息管理系统</MainTop>
    </div>
    <router-view />
  </div>
</template>

<script>
import MainTop from "./components/MainTop.vue";
export default {
  name: "app",
  components: {
    MainTop,
  },

};
</script>

<style>
.app-top {
  z-index: 99;
}
.el-divider--horizontal{
  margin: 0
}
</style>
