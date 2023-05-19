/*
 * @Author: 雷宇航
 * @Date: 2022-08-24 11:59:32
 * @LastEditTime: 2022-10-25 17:37:44
 * @LastEditors: 雷宇航
 * @Description: 
 * @FilePath: \myTestProject\myproject\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')