/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-02-22 19:06:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const passing = '_api/passing/person'

// 人员（员工访客）下发/查

/**
 * @description: 根据设备id下发人员（员工）
 * @param { deviceIds, employeeIds }
 */
export function issuedEmployee(deviceIds, employeeIds) {
  return request({
     url: passing,
     method: 'POST',
     data: {
        deviceIds: deviceIds,
        employeeIds: employeeIds
     }
   })
 }

 /**
 * @description: 根据设备id下发人员（访客）
 * @param { deviceIds, visitorIds }
 */
export function issuedVisitor(params) {
    return request({
       url: passing,
       method: 'POST',
       data: params
     })
   }