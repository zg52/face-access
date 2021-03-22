/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-03-22 15:10:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'

const monitor = 'monitor/access/'

// 数据可视化监控统计

/**
 * @description: 今日进门人数
 */
 export function in_a_few(params) {
    return request({
       url: `${ monitor }personAccessCount`,
       method: 'GET',
       params
     })
     }

/**
 * @description: 今日访客预约人数
 */
 export function reservation_number(params) {
    return request({
       url: `monitor/visitor/visitorCount`,
       method: 'GET',
       params
     })
}

/**
 * @description: 今日刷脸人数
 */
 export function faceNum(params) {
    return request({
       url: `${ monitor }faceCount`,
       method: 'GET',
       params
     })
}

/**
 * @description: 今日离线设备
 */
 export function offline_device(params) {
    return request({
       url: `${ monitor }offlineCount`,
       method: 'GET',
       params
     })
 }

/**
 * @description: 今日故障设备
 */
 export function failure_device(params) {
    return request({
       url: `${ monitor }outOfOrderCount`,
       method: 'GET',
       params
     })
    }

/**
 * @description: 今日体温异常人数
 */
 export function temperature_number(params) {
    return request({
       url: 'monitor/exception/outOfOrderCount',
       method: 'GET',
       params
     })
    }

/**
 * @description: 设备在线/离线/故障近7天记录
 */
 export function bas(params) {
    return request({
       url: `${ monitor }device`,
       method: 'GET',
       params
     })
    }
    
/**
 * @description: 设备通行累计人数
 */
 export function devicePersonNum(params) {
    return request({
       url: `${ monitor }getAccessPersonCount`,
       method: 'GET',
       params
     })
    }

/**
 * @description: 进门方式近30天记录
 */
 export function inDoorWay(date) {
    return request({
       url: `${ monitor }faceAccessCount`,
       method: 'GET',
       params: {
        nowDate: date
       }
     })
    }
