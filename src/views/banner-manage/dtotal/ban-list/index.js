/*
 * @Author: your name
 * @Date: 2021-06-04 18:03:52
 * @LastEditTime: 2021-06-07 17:29:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\views\banner-manage\banList\index.js
 */
import Vue from 'vue'
import list from './components/list.vue'
 const lists = {
     install(Vue) {
         Vue.component('list-item', list
        //   {
        //      render(h) {
        //          return h(
        //             'div',
        //             {},
        //             '广告分发'
        //          )
        //      }
        //  }
         )
     }
 }
  Vue.use(lists)
 export {lists}