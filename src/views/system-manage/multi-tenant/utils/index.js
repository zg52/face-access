/*
 * @Author: your name
 * @Date: 2021-06-23 11:06:59
 * @LastEditTime: 2021-06-23 18:06:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\views\system-manage\multi-tenant\tenant-list\index.js
 */
import Vue from 'vue'
import AddEdit from '.././components/AddEdit'

Vue.use(
{
    install(Vue) {
        Vue.component('AddEdit', AddEdit)
        }
},
)
 