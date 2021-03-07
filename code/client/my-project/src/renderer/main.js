import Vue from 'vue'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import App from './App'
import router from './router'
import store from './store'

import db from './nedb_db'
import Echarts from 'echarts'

import '@/icons' // icon


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


/* 数据库使用 其它代码 */
Vue.prototype.$db = db
Vue.prototype.$echarts = Echarts
// Vue.prototype.$dataV = dataV


// Vue.use(dataV)
Vue.use(ElementUI, { locale })




/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
