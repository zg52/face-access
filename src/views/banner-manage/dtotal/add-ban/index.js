/*
 * @Author: your name
 * @Date: 2021-06-10 11:46:13
 * @LastEditTime: 2021-06-10 16:04:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\views\banner-manage\dtotal\add-ban\index.js
 */
import Vue from 'vue'
import ImgUpload from './components/ImgUpload'

Vue.use(
{
    install(Vue) {
        Vue.component('ImgUpload', ImgUpload)
        }
},
)
 