/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-07-05 15:04:25
 * @LastEditors: Please set LastEditors
 * @Description: 操作日志api
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const log = 'passing/log'
// 设备操作日志

/**
 * @description: 日志列表
 */
export function logList(params) {
 return request({
    url: log,
    method: 'GET',
    params
  })
}