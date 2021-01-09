/*
 * @Author: your name
 * @Date: 2021-01-09 18:22:11
 * @LastEditTime: 2021-01-09 19:00:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\mock\public.js
 */
var Mock = require('mockjs')
 Mock.mock('https://www.zg.com', {
    code: 0,
    data: {},
    msg: "操作成功",
    userInfo: {
        'admin-token': {
            roles: ['admin'],
            introduction: 'I am a super administrator',
            avatar: '../../assets/image/user.png',
            name: 'Super Admin'
          },
          'editor-token': {
            roles: ['editor'],
            introduction: 'I am an editor',
            avatar: '../../assets/image/user.png',
            name: 'Normal Editor'
          }
    }
})