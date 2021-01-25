/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-01-25 14:19:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\user.js
 */
import request from '@/utils/request'

export function login(params) {
  return request({
    url: 'https://www.zg.com',
    method: 'post',
    data: params
  })
}

export function getInfo(token) {
  return request({
    url: 'http://www.xuefu.com/',
    method: 'get',
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function ops() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

