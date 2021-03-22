/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-03-18 16:32:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'


const exception = 'passing/exception'

/**
 * @description: 查设备异常记录
 */
export function deviceException(params) {
  return request({
     url: `${ exception }`,
     method: 'GET',
     params
   })
 }

 /**
 * @description: 查人员常记录（employee/visitor）
 */
export function personException(params) {
  return request({
     url: `${ exception }`,
     method: 'GET',
     params
   })
 }

  /**
 * @description: 设备/人员异常监控（employee/visitor）
 */
export function exception_monitoring(params) {
  return request({
     url: `${ exception }/watch`,
     method: 'GET',
    params: {
      category: 'blocklist',
      source: 'person'
     }
   })
 }