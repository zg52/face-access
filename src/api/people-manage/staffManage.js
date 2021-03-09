/*
 * @Author: your name
 * @Date: 2021-01-08 16:51:05
 * @LastEditTime: 2021-03-09 18:16:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\src\api\people-manage\staff-manage.js
 */
import request from '@/utils/request'
import { issuedEmployee } from '../person-issued'
const person = 'person/person'
// 人员管理-员工

/**
 * @description: 员工新增
 * @param {*}
 */
export function saveStaff(params) {
 return request({
    url: person,
    method: 'POST',
    data: params,
    // headers: {"Content-Type": "application/json"}
  })
}

/**
 * @description: 员工列表
 */
export function getStaffList(params) {
  return request({
     url: person,
     method: 'GET',
     params
   })
 }

 /**
 * @description: 员工修改
 * @param {*}
 */
export function editStaff(id, params) {
  return request({
     url: `${ person }/${ id }`,
     method: 'POST',
     data: params
   })
 }

  /**
 * @description: 员工状态（在职/离职）
 * @param {0/1} 0在职，1离职(需要传离职时间)
 */
export function StaffState(id, params) {
  return request({
     url: `${ person }/valid/${ id }`,
     method: 'POST',
     data: params
   })
 }

 /**
 * @description: 删除员工
 * @param {*}
 */
export function deleteStaff(id) {
  return request({
     url: `${ person }/${ id }`,
     method: 'DELETE',
   })
 }


   /**
 * @description: 批量导入员工（先导入图片zip，再导入表格）
 */

// 无参形式
export function employeeZip() {
  return `${ process.env.VUE_APP_BASE_API }person/importZip`
}
export function employeeExcel() {
  return `${ process.env.VUE_APP_BASE_API }person/batchImport`
}

// 导入图片zip包
export function employeeZip1(params) {
  return request({
     url: 'person/importZip',
     method: 'POST',
     data: params
   })
 }

 // 查看当前表格导入状态
export function getImportStatus() {
  return request({
     url: 'person/getImportStatus',
     method: 'GET'
   })
 }

 // 查看当前表格导入结果（serialNumber=20210308085808）

//  编辑时：传入name+serialNumber,
// 保存时：图片重传——>传serialNumber 清除之前错误的数据
 export function getReslut(params) {
  return request({
     url: 'person/getReslut?size=10000000',
     method: 'GET',
     params
   })
 }

// 查看表格导入历史列表
  export function getSerialList() {
    return request({
       url: 'person/getSerialList',
       method: 'GET'
     })
   }

 

  /**
 * @description: 导出列表
 */
export function downloadEmployee(current, size) {
  return request({
     url: 'person/downloadEmployee',
     method: 'GET',
     params: {
      current: current,
      size: size
     },
   })
 }

  /**
 * @description: 下载员工表格模板
 */
export function getEmployeeTemplate() {
  return request({
     url: 'person/getEmployeeTemplate',
     method: 'GET'
   })
 }