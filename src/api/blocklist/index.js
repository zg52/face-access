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
const passing = '_api/passing/'
export function searchBlocklist(params) {
  return request({
     url: `${ passing }blocklist/`,
     method: 'GET',
     params: params
   })
 }

