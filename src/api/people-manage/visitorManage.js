/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-02-03 17:23:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

// 人员管理-访客

/**
 * @description: 员工新增
 * @param {*}
 */
export function saveStaff(params) {
 return request({
    url: '_api/person',
    method: 'POST',
    data: params,
    // headers: {"Content-Type": "application/json"}
  })
}

/**
 * @description: 员工列表
 */
export function getStaffList(data) {
  return request({
     url: '/person',
     method: 'GET',
     data
   })
 }

 /**
 * @description: 删除员工
 * @param {*}
 */
export function deleteStaff(params) {
  return request({
     url: '/',
     method: 'POST',
     data: params
   })
 }
 