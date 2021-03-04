/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-03-04 17:26:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\api\article.js
 */
import request from '@/utils/request'

export function imgUrl(target, imgId) {
   return `http://192.168.10.148:8081/`
}

  /**
 * @description: 导出列表
 */
let employee = 'person/downloadEmployee',  
     visitor = 'person/visitor/downloadVisitor',
     downEmployee = 'person/getEmployeeTemplate',
     downVisitor = 'person/visitor/getVisitorTemplate'
     
function downXsl(current, size, fileName, target) {
   　　 if ('download' in document.createElement('a')) {
      　　let link = document.createElement('a')
      　　link.setAttribute('download', `${ fileName }.xls`);
      　　link.style.display = 'none'
     　　 link.href = `${ process.env.VUE_APP_BASE_API }${ target }?current=${ current }&size=${ size }`
     　　 document.body.appendChild(link)
      　　link.click()
     　　 document.body.removeChild(link)
   　　} else {
   　　   navigator.msSaveBlob(blob, fileName)
   　　}
   }
   
export function downStaffXls(current, size) {
   downXsl(current, size, '员工信息', employee)
  }
export function downVisitorXls(current, size) {
   downXsl(current, size, '访客信息', visitor)
  }
export function downEmployeeTemplate() {
   downXsl(null, null, '员工信息录入模板', downEmployee)
 }
export function downVisitorTemplate() {
   downXsl(null, null, '访客信息录入模板', downVisitor)
 }