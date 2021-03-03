/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-03-03 10:35:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const passing = 'passing/access'

// 设备通行记录

/**
 * @description: 员工/访客通行记录
 * @param {}
 */
export function trafficRecords(params) {
 return request({
    url: passing,
    method: 'GET',
    params
  })
}