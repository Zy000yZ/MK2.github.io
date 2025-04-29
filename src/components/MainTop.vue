<template>
  <div class="main-top">
    <div class="main-top-logo">
      <!-- <img src="../assets/jiaotongguanli.png" alt="" /> -->
    </div>
    <div class="right-main">
      <div class="main-top-left">
        <span
          style="font-size: 15px; padding-right: 15px"
          class="el-icon-s-unfold"
        ></span>
        <span style="font-size: 15px"> <slot></slot></span>
      </div>
      <div class="main-top-right">
        <div class="btnBox">
          <el-button
            type="text"
            style="margin-left: 10px; font-size: 15px; color: #606266"
            @click="leginOut"
          >
            登出系统</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainTop",
  data() {
    return {
      kg: true,
    };
  },

  methods: {
    leginOut() {
      sessionStorage.removeItem("username");
      this.$router.push("/heritage/login");
    },
    removeHome() {
      //返回首页
      this.$router.push("/BecauseMain");
    },
  },
};
</script>

<style scoped>
.right-main {
  width: calc(100% - 160px);
  display: flex;
  justify-content: space-between;
}
.main-top-logo {
  width: 160px;
  display: flex;
  align-items: center;
}
.main-top-logo img {
  width: 40px;
  height: 40px;
}
.main-top-logo span {
  display: inline-block;
  font-size: 20px;
  padding-left: 10px;
  /* padding-bottom: 150px; */
}
.main-top {
  display: flex;
  /* justify-content: space-between;  */
  padding: 0 10px;
  /* border-bottom: 1px; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* background-color: #1155C4; */
  /* color: white !important; */
  height: 60px;
}
.main-top .main-top-left {
  display: flex;
  align-items: center;
  font-size: 15px !important;
  margin-left: 50px;
}
.main-top .main-top-right {
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #40a0fffd;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
