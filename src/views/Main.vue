<template>
  <!-- 内容主页面 -->
  <div class="main">
    <div class="main-left">
      <h3 style="color: #fff; font-weight: 500; text-align: center;padding:0 14px">
        大同市煤炭资源信息管理系统
      </h3>
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#404040"
        text-color="#fff"
        active-text-color="#fff"
        :default-openeds="['1', '2']"
      >
        <el-submenu index="1">
          <template slot="title">
            <span class="menuSpan" slot="title">地图展示</span>
          </template>
          <el-menu-item index="/BecauseMain1" style="font-size: 16px">
            <span class="menuSpan" slot="title">煤炭资源分布</span>
          </el-menu-item>
          <el-menu-item index="/BecauseMain" style="font-size: 16px">
            <span class="menuSpan" slot="title">缓冲区分析</span>
          </el-menu-item>
          <!-- <el-menu-item index="/LanLineDataList" style="font-size: 16px">
            <span class="menuSpan" slot="title">茶园分布热力图</span>
          </el-menu-item> -->
          <el-menu-item index="/BecauseMain2" style="font-size: 16px">
            <span class="menuSpan" slot="title">图表统计</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <span class="menuSpan" slot="title">数据管理</span>
          </template>
          <el-menu-item index="/DataList">
            <span class="menuSpan" slot="title">煤炭资源信息</span>
          </el-menu-item>
          <el-menu-item index="/BecauseMain5">
            <span class="menuSpan" slot="title">用户信息</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main-right">
      <div class="all-coverage">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isCollapse: true,
      nowUser: "暂未获取用户数据",
    };
  },

  created() {
    this.nowUser = sessionStorage.getItem("username");
    console.log(this.nowUser);
  },

  computed: {
    ...mapState(["lang"]),
  },

  methods: {
    path1() {
      window.location.href = "https://wap.miit.gov.cn/";
    },

    path2() {
      window.location.href =
        "http://www.gov.cn/xinwen/2021-04/14/content_5599500.htm";
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
}
.main .main-left {
  width: 210px;
  overflow: auto;
  height: 100vh;
  padding-top: 15px;
  background-color: #404040;
  border-right: 1px solid #e7e7e7;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: hidden;
}

.main .main-left > ul {
  width: 210px;
}
.main .main-left > .el-menu-vertical-demo > .el-menu-item,
.main .main-left > .el-menu-vertical-demo .el-submenu__title {
  font-size: 16px !important;
}

li.is-active {
  background-color: #4874cb !important;
}
.main .main-right {
  width: calc(100% - 210px);
  overflow: auto;
  margin-left: 210px;
}

.main .main-right .coverage-top {
  width: 100%;
  height: 7vh;
}

/* .main .main-right .all-coverage {
  
} */
.el-menu-vertical-demo {
  overflow: hidden;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.myIcon {
  color: #fff;
}
.menuSpan {
  font-size: 15px;
  padding-left: 5px;
}
</style>
