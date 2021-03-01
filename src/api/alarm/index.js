/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-03-01 16:18:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'


const exception = '_api/exception/exception'

/**
 * @description: 查设备异常记录
 */
export function deviceException(params) {
  return request({
     url: `${ exception }?source=device`,
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

 