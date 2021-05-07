/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-05-06 11:01:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'
import {
	downFile
} from '@/utils'

const passing = 'passing/'
const ota = 'ota/ota/'
// 设备管理

/**
 * @description: 新增设备
 * @param {name,description,manufacturer,model,sn,location}
 */
export function addDevice(params) {
	return request({
		url: `${ passing }device`,
		method: 'POST',
		data: params
	})
}

/**
 * @description: 修改设备
 * @param {id}
 */
export function editDevice(id, params) {
	return request({
		url: `${ passing }device/${ id }`,
		method: 'POST',
		data: params
	})
}

/**
 * @description: 查设备列表
 */
export function searchDevice(params) {
	return request({
		url: `${ passing }device`,
		method: 'GET',
		params
	})
}

/**
 * @description: 查设备详情
 */
export function getDeviceDetails() {
	return request({
		url: `${ passing }device/${ id }`,
		method: 'GET',
	})
}

/**
 * @description: 删除设备
 */
export function deleteDevice(id) {
	return request({
		url: `${ passing }device/${ id }`,
		method: 'DELETE',
	})
}

/**
 * @description: 操作设备
 * @param {deviceIds}
 */
export function instructDevice(type, params) {
	return request({
		url: `${ passing }device/instruct/${ type }`,
		method: 'POST',
		params,
		//  headers: {"Content-Type": "application/json"}
	})
}

/**
 * @description: 操作设备
 * @param {deviceIds}
 */
export function instructDevice1(type, params) {
	return request({
		url: `${ passing }device/instruct/${ type }`,
		method: 'PUT',
		params,
	})
}

//  ----------------------------------------OTA----------------------------------------------

/**
 * @description: 设备升级-上传文件
 */
export function deviceUpdateFile() {
	return `${ process.env.VUE_APP_BASE_API }${ ota }/file/upload`
}
/**
 * @description: 设备升级
 * @param {deviceIds}
 */
export function deviceUpdate(params) {
	return request({
		url: `${ ota }upgrade/upgrade`,
		method: 'POST',
		data: params
	})
}

//  /**
//  * @description: 下载升级包
//  */
// export function downPatch(fileName) {
// 	return downFile('/updata', fileName)
// }

/**
 * @description:设备升级列表
 */
export function deviceUpdateRecords(params) {
	return request({
		url: `${ ota }/upgrade/`,
		method: 'GET',
		params
	})
}

/**
 * @description:设备重新升级
 */
export function toUpdateDevice(params) {
	return request({
		url: `${ passing }device/instruct`,
		method: 'post',
		params
	})
}

/**
 * @description: 查看设备激活
 */
export function deviceActivationMsg(params) {
	return request({
		url: `${ passing }config/server`,
		method: 'GET',
		params
	})
}
