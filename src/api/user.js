/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-03-03 10:28:03
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

export function getInfo(token) {
  return request({
    url: `${ user }info`,
    method: 'POST',
    params: { token }
  })
}

export function logout() {
  return request({
    url: `${ user }logout`,
    method: 'POST',
    data: {
      token: getToken()
    }
  })
}
