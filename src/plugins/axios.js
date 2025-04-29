import axios from 'axios'
import Vue from 'vue'
axios.defaults.baseURL = 'https://fc-mp-d37f04a3-2423-4d57-8af6-c83080a34e31.next.bspapp.com/mainFun'
//创建为全局文件,将$axios封装为axios
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
export default axios;
