/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-02-03 17:40:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

/**
 * @description: 查询用户
 * @param {*}
 * @return {*}
 */
export function searchUser(params) {
  return request({
     url: '_api/user/user/',
     method: 'GET',
     params: params
   })
 }

 /**
 * @description: 编辑用户
 * @param {id}
 */
export function editUser(params) {
  return request({
     url: `_api/user/${params.id}`,
     method: 'POST',
     data: params
   })
 }

  /**
 * @description: 新增用户
 * @param {id}
 */
export function addUser(params) {
  return request({
     url: '_api/user/',
     method: 'POST',
     data: params
   })
 }

  /**
 * @description: 删除用户
 * @param {id}
 */
export function deleteUser(id) {
  return request({
     url: `_api/user/${id}`,
     method: 'DELETE'
   })
 }

