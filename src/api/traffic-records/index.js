/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-02-25 16:39:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const passing = '_api/passing/access'

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