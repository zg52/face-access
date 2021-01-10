/*
 * @Author: your name
 * @Date: 2021-01-09 18:22:11
 * @LastEditTime: 2021-01-10 17:06:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸\html\face-recognition-useCase\mock\public.js
 */
const { deepClone } = require('./utils')
const { asyncRoutes, constantRoutes } = require('./role/routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])
var Mock = require('mockjs')
 Mock.mock('https://www.zg.com', {
    code: 0,
    data: {
        token: 'fhuewhfiuewhaufheufewhfuewhfewuaifafewafewaf',
    },
    msg: "操作成功",
})

// 用户权限信息
Mock.mock('http://www.xuefu.com/', {
    code: 0,
    data: {
                roles: ['admin','viewer'],
                introduction: '超管',
                avatar: '../../assets/image/user.png',
                name: 'Super Admin'
    },
    msg: "操作成功",
    
})

Mock.mock('http://xian.xuefu.com/', {
    code: 0,
    data: routes,
    msg: "操作成功",
    
})