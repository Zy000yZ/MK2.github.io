import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/", //主页面
    name: "Main",
    component: Main,
    children: [
      {
        path: "/BecauseMain",
        component: () => import("../views/BecauseMain.vue"),
      },
      {
        path: "/BecauseMain1",
        component: () => import("../views/BecauseMain1.vue"),
      },
      {
        path: "/BecauseMain2",
        component: () => import("../views/BecauseMain2.vue"),
      },
      {
        path: "/BecauseMain5",
        component: () => import("../views/BecauseMain5.vue"),
      },
      {
        //缆线数据管理
        path: "/LanLineDataList",
        component: () => import("../views/LanLineDataList.vue"),
      },
      {
        path: "/DataList",
        name: "DataList",
        component: () => import("../views/DataList.vue"),
      },
      // 拾取坐标位置页
      {
        path: "/get/coordinate",
        component: () => import("../views/GetCoonFile/getCoordinate.vue"),
      },
      {
        path: "/HeritageProPush/:editid",
        component: () => import("../views/GetCoonFile/HeritageProPush.vue"),
      },
    ],
  },
  {
    path: "/heritage/login", //登陆页面
    component: () => import("../views/LoginUser.vue"),
  },
  {
    path: "/PostUser",
    component: () => import("../views/PostUser.vue"),
  },
];
const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const username = sessionStorage.getItem("username");

  if (
    to.path !== "/heritage/login" &&
    to.path !== "/PostUser" &&
    username === null
  )
    next("/heritage/login");
  next();
});

export default router;
