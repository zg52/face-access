/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-01-30 17:24:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

export function addList(params) {
  return request({
    url: 'http://192.168.10.148:8765/api/user/jwt/token/user',
    method: 'post',
    data: params
  })
}

// 人员管理（员工/访客）

/**
 * @description: 员工新增
 * @param {*}
 */
export function addStaff(params) {
 return request({
    url: '/',
    method: 'POST',
    data: params
  })
}

/**
 * @description: 员工列表
 * @param {*}
 */
export function getStaffLis(data) {
  return request({
     url: '/',
     method: 'GET',
     data
   })
 }