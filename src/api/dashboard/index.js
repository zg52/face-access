/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-03-16 18:17:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const passing = 'passing/'
// 设备管理

/**
 * @description: 查当日设备离线总数
 */
 export function deviceOffLineNum(params) {
    return request({
       url: `${ passing }device`,
       method: 'GET',
       params
     })
}