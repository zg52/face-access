/*
 * @Author: your name
 * @Date: 2021-02-09 18:33:47
 * @LastEditTime: 2021-02-09 19:08:54
 * @LastEditors: Please set LastEditors
 * @Description: 全局业务参数配置
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\utils\business.js
 */
const passWayArr = [
    {
      label: '刷脸',
      value: 'face'
    },
    {
      label: '指纹',
      value: 'fingerprint'
    },
    {
      label: '二维码',
      value: 'qr_code'
    },
    {
      label: '刷卡',
      value: 'card',
        children: [
          {
           label: '门禁卡',
           value: 'wg_card'
         },
         {
          label: 'IC卡',
          value: 'ic_card'
        },
        {
          label: '身份证',
          value: 'identity_card'
        }
    ]
 },
 {
     label: '刷脸 + 刷卡',
     value: 'faceCard',
      children: [
        {
          label: '刷脸 + 门禁卡',
          value: 'face,wg_card'
        },
        {
          label: '刷脸 + IC卡',
          value: 'face,ic_card'
        },
        {
          label: '刷脸 + 身份证',
          value: 'face,identity_card'
        }
      ]
 }
 ]
 
/**
 * @description: 通行方式
 * @param {*}
 */
export function passWay() {
   return passWayArr
}

/**
 * @description: 通行方式转为一维数组
 */
export function passWayArrHandle() {
    let resultArr = []
    passWayArr.map((item, index) => {
        if('children' in item) {
            item.children.forEach((item1, index1) => {
                resultArr.push(item1)               
               })
           } else {
               resultArr.push(item)   
           }
       })
       return resultArr.length !== 0 ? resultArr : null
}

/**
 * @description: 星期制参数
 * @param {*}
 */
 export function weekParams() {
     return [
        { id: 1, value: '一' },
        { id: 2, value: '二' },
        { id: 3, value: '三' },
        { id: 4, value: '四' },
        { id: 5, value: '五' },
        { id: 6, value: '六' },
        { id: 0, value: '日' }
      ]
 }