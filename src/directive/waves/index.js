/*
 * @Author: your name
 * @Date: 2021-04-15 17:26:17
 * @LastEditTime: 2021-06-04 17:45:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\directive\waves\index.js
 */
import waves from './waves'

const install = function(Vue) {
  Vue.directive('waves', waves)
}

if (window.Vue) {
  window.waves = waves
  Vue.use(install); // eslint-disable-line
}

waves.install = install
export default waves


// 全局
import Vue from 'vue'
Vue.directive('waves', waves)