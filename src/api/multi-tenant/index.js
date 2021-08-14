/*
 * @Author: your name
 * @Date: 2021-06-22 18:45:38
 * @LastEditTime: 2021-07-15 16:56:23
 * @LastEditors: Please set LastEditors
 * @Description: 租户管理
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\api\multi-tenant\index.js
 */
import request from '@/utils/request'

const tenant = 'user/tenant'

/**
 * @description: 创建租户
 */
export function addTenant(params) {
    return request({
        url: `${ tenant }/`,
        method: 'POST',
        data: params
    })
}

/**
 * @description: 租户列表
 */
export function tenantList(params) {
    return request({
        url: `${ tenant }`,
        method: 'GET',
        params
    })
}

/**
 * @description: 修改租户
 */
export function editTenant(params, id) {
    return request({
        url: `${ tenant }/${ id }`,
        method: 'POST',
        data: params
    })
}