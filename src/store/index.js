import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: "zh_cn",
    newCoordinate: [], //添加经纬度记录
    instryType: "one", //记录当前操作的类型
    applyCoordinate: [], //申报经纬度记录
    CoordinateType: "add", //当前坐标拾取对应的值
    nowAddress: [118.73, 32.0],
    allGongJiao: [],
    parkData: [],
  },
  mutations: {
    langChange(state, lang) {
      state.lang = lang;
    },
    getCoordinate(state, newCoordinate) {
      state.newCoordinate = newCoordinate;
    },
    getapplyCoordinate(state, newCoordinate) {
      state.applyCoordinate = newCoordinate;
    },
    changeinstryType(state, type) {
      state.instryType = type;
    },

    changeCoordinateType(state, type) {
      state.CoordinateType = type;
    },

    getNowAddress(state, coon) {
      state.nowAddress = [coon.R, coon.Q];
    },
  },
  actions: {},
  modules: {},
});
