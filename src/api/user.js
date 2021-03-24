/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-03-24 14:47:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\user.js
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const user = 'user/account/'
export function login(params) {
  return request({
    url: `${ user }login`,
    method: 'POST',
    data: params
  })
}

/**
 * @description: 用户信息
 */
export function getInfo(token) {
  return request({
    url: `${ user }info`,
    method: 'POST',
    params: { token }
  })
}


/**
 * @description: 登出
 */
export function logout() {
  return request({
    url: `${ user }logout`,
    method: 'POST',
    data: {
      token: getToken()
    }
  })
}

/**
 * @description: 修改密码
 */

export function getVerifyCode(params) {
  return request({
    url:  'user/user/verifyCode',
    method: 'POST',
    data: params
  })
}

export function updatePass(params) { 
  return request({
    url:  'user/user/updatePass',
    method: 'POST',
    data: params
  })
}