/*
 * @Author: your name
 * @Date: 2021-01-29 17:49:54
 * @LastEditTime: 2021-01-29 18:00:58
 * @LastEditors: Please set LastEditors
 * @Description: 通行规则
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\api\traffic-rules\index.js
 */
import request from '@/utils/request'

/**
 * @description: 新增通行规则
 * @param {deviceIds,name,description,verificationModes,ruleType,personType,visitorIds,week,startDate,endDate,startTime,startTime,endTime}
 */
export function addRules(params) {
  return request({
    url: '_api/device/rule',
    method: 'POST',
    data: params
  })
}