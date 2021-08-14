/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-07-05 15:04:59
 * @LastEditors: Please set LastEditors
 * @Description: 通行记录
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const passing = 'passing/access'

// 设备通行记录

/**
 * @description: 员工/访客通行记录(查询条件=> //员工 employee // 访客 viditor // 陌生人 stranger // 黑名单blocklist)
 * @param {}
 */
export function trafficRecords(params) {
 return request({
    url: passing,
    method: 'GET',
    params
  })
}
