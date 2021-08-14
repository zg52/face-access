/*
 * @Author: your name
 * @Date: 2021-07-15 16:35:21
 * @LastEditTime: 2021-07-15 17:39:00
 * @LastEditors: Please set LastEditors
 * @Description: 设备日志
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\api\system-manage\meltlUog.js
 */

import request from '@/utils/request'

const LOG = 'passing/device/'

/**
 * @description: 设备日志列表
 */
export function deviceLogLis(params) {
 return request({
    url: `${ LOG }device-file`,
    method: 'GET',
    params
  })
}

/**
 * @description: 下载设备日志
 */
export function downloadDeviceLog(id, fileId, r) {
   let isRequest = r ?? false,
       url = `${ LOG }${ id }/file/${ fileId }`
   if(isRequest) {
    return request({
        url: url,
        method: 'GET'
      })
   } else {
    return url
   }
  }