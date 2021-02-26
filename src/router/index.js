import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
 
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
 
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true, roles: ['admin','viewer'] }
      }
    ]
  }, 
   {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true },
      }
    ]
  }
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },

]
export const asyncRoutes = [
  // {
  //   path: '/system-manage',
  //   component: Layout,
  //   name: 'system-manage',
  //   meta: { title: '系统管理', icon: 'el-icon-setting', noCache: true },
  //   redirect: '/system-manage/user',
  //   children: [
  //         {
  //           path: 'user',
  //           component: () => import('@/views/system-manage/user'),
  //           name: 'user',
  //           meta: { title: '用户管理', icon: 'user', roles: ['1','admin','viewer'] }
  //         },
  //         {
  //           path: 'permission',
  //           component: () => import('@/views/system-manage/'),
  //           redirect: '/system-manage/permission/role',
  //           alwaysShow: true,
  //           name: 'permission',
  //           meta: { title: '权限管理', icon: 'lock', roles: ['1','admin', 'editor'] },
  //           children: [
  //             {
  //               path: 'role',
  //               component: () => import('@/views/system-manage/permission/role'),
  //               name: 'role',
  //               meta: { title: '角色权限', roles: ['1','admin'] } 
  //             }
  //           ]
  //         },
  //         {
  //           path: 'ulog',
  //           component: () => import('@/views/system-manage/ulog'),
  //           name: 'ulog',
  //           meta: { title: '操作日志', icon: 'clipboard', roles: ['1','admin', 'editor'] },
  //         }
  //   ]
  // },
  {
    path: '/people-manage',
    component: Layout,
    name: 'people-manage',
    meta: { title: '人员管理', icon: 'peoples' },
    redirect: '/people-manage/staff-manage/staff-list/staffList',
    children: [
      // {
      //   path: 'section',
      //   component: () => import('@/views/people-manage/section'),
      //   name: 'section',
      //   meta: { title: '部门管理', icon: 'section'}
      // },
      {
        path: 'staff-manage',
        component: () => import('@/views/people-manage'),
        redirect: '/people-manage/staff-manage/staff-list/staffList',
        alwaysShow: true,
        meta: { title: '员工管理', icon: 'staff' },
        children: [
          {
            path: 'staff-list/staffList',
            component: () => import('@/views/people-manage/staff-manage/staff-list/staffList'),
            name: 'staffList',
            meta: { title: '员工列表' },
          },
          {
            path: 'staff-add/staffAdd',
            component: () => import('@/views/people-manage/staff-manage/staff-add/staffAdd'),
            name: 'staffAdd',
            meta: { title: '新增员工' }
         },
        ]
      },
      {
        path: 'visitor-manage',
        component: () => import('@/views/people-manage'),
        redirect: '/people-manage/visitor-manage/visitor-list/visitorlist',
        alwaysShow: true,
        meta: { title: '访客管理', icon: 'visitor' },
        children: [
          {
            path: 'visitor-list/visitorlist',
            component: () => import('@/views/people-manage/visitor-manage/visitor-list/visitorList'),
            name: 'visitorlist',
            meta: { title: '访客列表' },
          },
          {
            path: 'visitor-add/visitorAdd',
            component: () => import('@/views/people-manage/visitor-manage/visitor-add/visitorAdd'),
            name: 'visitorAdd',
            meta: { title: '新增访客' }
         },
        ]
      },
 
    ]
  },
  {
    path: '/traffic-rules',
    name: 'traffic-rules',
    component: Layout,
    meta: { title: '通行规则', icon: 'trafficRules' },
    redirect: '/traffic-rules/addRules',
    children: [
      {
        path: 'addRules',
        component: () => import('@/views/traffic-rules/addRules'),
        name: 'addRules',
        meta: { title: '下发规则', icon: 'rules' }
     },
     {
        path: 'rules',
        component: () => import('@/views/traffic-rules/rulesList'),
        name: 'rules',
        meta: { title: '已下发规则', icon: 'list1' }
     },
     {
      path: 'person',
      component: () => import('@/views/traffic-rules/person/index'),
      name: 'person',
      meta: { title: '可通行人员', icon: 't_person' }
   }
  ]
  },
  {
    path: '/traffic-records',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/traffic-records'),
        name: 'traffic-records',
        meta: { title: '通行记录', icon: 'trafficRecords' },
     },
  ]
  },
  {
    path: '/device-manage',
    name: 'device-manag',
    component: Layout,
    meta: { title: '设备管理', icon: 'el-icon-video-camera-solid' },
    redirect: '/device-manage/deviceList',
    children: [
      {
        path: 'deviceList',
        name: 'deviceList',
        component: () => import('@/views/device-manage/device-list/deviceList'),
        meta: { title: '设备列表', icon: 'door' },
      },
      {
        path: 'person-issued',
        component: () => import('@/views/device-manage/person-issued'),
        redirect: '/device-manage/person-issued/issued-list',
        alwaysShow: true,
        meta: { title: '人员下发', icon: 'guide' },
        children: [
          {
            path: 'issued-add/issuedAdd',
            name: 'issuedAdd',
            component: () => import('@/views/device-manage/person-issued/issued-add/issuedAdd'),
            meta: { title: '选择人员下发' },
          },
          {
            path: 'issued-list/issuedList',
            name: 'issuedList',
            component: () => import('@/views/device-manage/person-issued/issued-list/issuedList'),
            meta: { title: '已下发人员' },
          },
        ]
      },
    ]
  },
  {
    path: '/alarm',
    name: 'alarm',
    component: Layout,
    meta: { title: '告警中心', icon: 'alarm' },
    redirect: '/alarm/device',
    children: [
      {
        path: 'device',
        name: 'device',
        component: () => import('@/views/alarm/device'),
        meta: { title: '设备告警', icon: 'alarmDevice' },
      },
      {
        path: 'personnel',
        name: 'personnel',
        component: () => import('@/views/alarm/personnel'),
        meta: { title: '人员告警', icon: 'alarmPesonnel' },
      },
    ]
  },
  {
    path: '/blocklist',
    component: Layout,
    children: [
      {
        path: '/blocklist',
        component: () => import('@/views/blocklist/blocklist'),
        name: 'blocklist',
        meta: { title: '黑名单管理', icon: 'blocklist' },
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/task'),
        name: 'task',
        meta: { title: '任务中心', icon: 'documentation' },
     }
    ]
  },
  {
    path: '/system-manage',
    component: Layout,
    name: 'system-manage',
    meta: { title: '系统管理', icon: 'el-icon-setting', noCache: true },
    redirect: '/system-manage/user',
    children: [
          {
            path: 'user',
            component: () => import('@/views/system-manage/user'),
            name: 'user',
            meta: { title: '用户管理', icon: 'user', roles: ['1','admin','viewer'] }
          },
          {
            path: 'permission',
            component: () => import('@/views/system-manage/'),
            redirect: '/system-manage/permission/role',
            alwaysShow: true,
            name: 'permission',
            meta: { title: '权限管理', icon: 'lock', roles: ['1','admin', 'editor'] },
            children: [
              {
                path: 'role',
                component: () => import('@/views/system-manage/permission/role'),
                name: 'role',
                meta: { title: '角色权限', roles: ['1','admin'] } 
              }
            ]
          },
          {
            path: 'ulog',
            component: () => import('@/views/system-manage/ulog'),
            name: 'ulog',
            meta: { title: '操作日志', icon: 'clipboard', roles: ['1','admin', 'editor'] },
          }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },
  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

// 非必须路由组件（按业务需求开放）
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,




  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'createArticle', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'articleList', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true}
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true}
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'mergeHeader' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'pdf', icon: 'pdf' }
  //     }
  //   ]
  // },


  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

// ]

