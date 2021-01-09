/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-01-09 19:03:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\user.js
 */
import request from '@/utils/request'

export function login(params) {
  return request({
    url: 'apis/api/user/jwt/token/user',
    method: 'post',
    data: params
  })
}

export function getInfo(token) {
  return request({
    url: 'https://www.zg.com',
    method: 'get',
    params: { token }
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
    url: 'https://www.zg.com',
    method: 'post'
  })
}

