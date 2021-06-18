/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-06-18 18:57:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'
const passing = 'passing/blocklist'

/**
 * @description: 上传广告
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
 * @description: 删除单独广告素材
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
 * @description: 删除一则广告
 * @param {*}
 */
 export function delBanMsg(params) {
  return request({
     url: passing,
     method: 'GET',
     data: params
   })
  }
    
  /**
 * @description: 保存广告
 * @param {*}
 */
export function uploadBanMsg(params) {
  return request({
     url: passing,
     method: 'POST',
     data: params
   })
  }

    /**
 * @description: 禁用广告
 * @param {*}
 */
export function disabledBan(params) {
  return request({
     url: passing,
     method: 'POST',
     data: params
   })
  }

  /**
 * @description: 广告列表
 * @param {*}
 */
   export function banList(params) {
    return request({
       url: 'ad/ad/ad',
       method: 'GET',
       params
     })
    }
  
  /**
 * @description: 下发广告
 * @param {*}
 */
export function issueBan(params) {
  return request({
     url: passing,
     method: 'POST',
     data: params
   })
  }