/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-02-07 17:19:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const passing = '_api/passing/'
// 设备管理

/**
 * @description: 新增设备
 * @param {name,description,manufacturer,model,sn,location}
 */
export function addDevice(params) {
 return request({
    url: `${ passing }device`,
    method: 'POST',
    data: params
  })
}

/**
 * @description: 修改设备
 * @param {id}
 */
export function editDevice() {
  return request({
     url: `_api/device/${ id }`,
     method: 'PUT',
   })
 }

/**
 * @description: 查设备列表
 */
export function searchDevice(params) {
  return request({
     url: `${ passing }device`,
     method: 'GET',
     params
   })
 }

 /**
 * @description: 查设备详情
 */
export function getDeviceDetails() {
  return request({
     url: `_api/device/${ id }`,
     method: 'GET',
   })
 }

 /**
 * @description: 删除设备
 */
export function deleteDevice(id) {
  return request({
     url: `_api/device/${ id }`,
     method: 'DELETE',
   })
 }

  /**
 * @description: 操作设备
 * @param {deviceIds}
 */
export function instructDevice(type, params) {
  return request({
     url: `_api /device/instruct/${ type }`,
     method: 'POST',
     data: params
   })
 }