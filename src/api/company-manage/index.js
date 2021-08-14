/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-07-05 15:05:47
 * @LastEditors: Please set LastEditors
 * @Description: 公司管理
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import { param } from '@/utils'
import request from '@/utils/request'
const organization = 'user/organization/'

// 数据可视化监控统计

/**
 * @description: 公司详情
 * 
*/
export function companyDetails(id, params) {
    return request({
        url: `${ organization }${ id }`,
        method: 'GET',
        data: params
    })
}