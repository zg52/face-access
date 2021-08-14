/*
 * @Author: your name
 * @Date: 2021-07-09 14:00:27
 * @LastEditTime: 2021-07-16 11:24:13
 * @LastEditors: Please set LastEditors
 * @Description: 人员分组（员工、访客）
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\face-recognition-access\src\api\people-manage\peopleGroup.js
 */

import request from '@/utils/request'
const GROUP = 'person/usergroup/'

// 员工分组

/**
 * @description: 分组列表
 */
export function staffGroupLis(params) {
    return request({
        url: GROUP,
        method: 'GET',
        params
    })
}

/**
 * @description: 分组人员列表
 */
 export function staffGroupDetails(params) {
    return request({
        url: GROUP,
        method: 'POST',
        params
    })
}

/**
 * @description: 移除分组内的人员
 */
 export function delGroupStaff(params) {
    return request({
        url: `${ GROUP }groupPerson`,
        method: 'DELETE',
        data: params
    })
}

/**
 * @description: 新增分组
 */
export function addStaffGroup(params) {
    return request({
        url: GROUP,
        method: 'POST',
        data: params
    })
}

/**
 * @description: 删除分组
 */
 export function delStaffGroup(id, params) {
    return request({
        url: `${ GROUP }${ id }`,
        method: 'DELETE',
        data: params
    })
}

/**
 * @description: 修改分组名称
 */
 export function editStaffGroup(id, params) {
    return request({
        url: `${ GROUP }${ id }`,
        method: 'POST',
        data: params
    })
}

/**
 * @description: 向组内添加员工
 */
 export function addStaffToGroup(params) {
    return request({
        url: `${ GROUP }addPersonToGroup`,
        method: 'POST',
        data: params
    })
}

/**
 * @description: 分组详情
 */
 export function groupDetails(id) {
    return request({
        url: `${ GROUP }${ id}`,
        method: 'GET'
    })
}