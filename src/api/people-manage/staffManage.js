/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-02-02 18:51:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

// 人员管理（员工/访客）

/**
 * @description: 员工新增
 * @param {*}
 */
export function saveStaff(params) {
 return request({
    url: '_api/person',
    method: 'POST',
    data: params,
    headers: {"Content-Type": "application/json"}
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
 