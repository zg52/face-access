/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-02-18 15:16:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const passing = '_api/passing/'
// 设备操作日志

/**
 * @description: 日志列表
 * @param {}
 */
export function logList(params) {
 return request({
    url: `${ passing }log`,
    method: 'GET',
    params
  })
}