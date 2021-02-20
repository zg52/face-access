/*
 * @Author: your name
 * @Date: 2021-02-03 19:56:03
 * @LastEditTime: 2021-02-20 15:58:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\api\people-manage\visitorManage.js
 */

import request from '@/utils/request'
const person = '_api/person/visitor/'
// 人员管理-访客

/**
 * @description: 访客-新增
 * @param {*}
 */
export function saveVisitor(params) {
 return request({
    url: person,
    method: 'POST',
    data: params,
    // headers: {"Content-Type": "application/json"}
  })
}

/**
 * @description: 访客-列表
 */
export function visitorList(params) {
  return request({
     url: person,
     method: 'GET',
     params
   })
 }

 /**
 * @description: 访客-修改
 * @param {*}
 */
export function editVisitor(id, params) {
  return request({
     url: `${ person }${ id }`,
     method: 'POST',
     data: params
   })
 }

  /**
 * @description: 访客-状态（正常/删除）
 * @param {0/1} 0正常，1删除
 */
export function visitorState(id, params) {
  return request({
     url: `${ person }valid/${ id }`,
     method: 'POST',
     data: params
   })
 }

 /**
 * @description: 删除访客
 * @param {*}
 */
export function deleteVisitor(id) {
  return request({
     url: `${ person }${ id }`,
     method: 'DELETE',
   })
 }
 