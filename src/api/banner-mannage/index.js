/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-06-16 16:51:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'
const passing = 'passing/blocklist'

/**
 * @description: 上传广告图
 * @param {*}
 */
export function uploadBan(params) {
  return request({
     url: 'person/getSerialList',
     method: 'POST',
     data: params
   })
  }

  /**
 * @description: 删除广告图
 * @param {*}
 */
export function delBan(params) {
    return request({
       url: passing,
       method: 'GET',
       data: params
     })
    }

    /**
 * @description: 上传广告图信息
 * @param {*}
 */
export function uploadBanMsg(params) {
  return request({
     url: passing,
     method: 'POST',
     data: params
   })
  }