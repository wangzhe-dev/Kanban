/*
 * @Author: zhaijs
 * @Date: 2024-04-11 13:50:55
 * @LastEditors: zhaijs
 * @LastEditTime: 2024-04-11 14:15:11
 * @Description: 
 */
import Vue from 'vue'
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import dataV from '@jiaminghi/data-view'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import Axios from 'axios'
import * as filters from './filters'
import { downloadFile } from "./utils";
//import '@/utils/rem.js'

Vue.use(echarts)
Vue.use(dataV)
Vue.use(ElementUI)

Vue.prototype.$axios = Axios
Vue.prototype.$echarts = echarts
Vue.prototype.$Message = Message
Vue.prototype.$downloadFile = downloadFile // blob下载模板


Object.keys(filters).forEach(key => { // filters
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
