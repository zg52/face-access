import { login, logout, getInfo } from '@/api/user'
import { companyDetails } from '@/api/company-manage'
import { tenantList } from '@/api/multi-tenant'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { Message } from 'element-ui'
import md5 from 'js-md5'

const state = {
  token: getToken(),
  username: '',
  avatar: '',
  introduction: '',
  roles: [],
  tenantList: [],
  tenantId: '',
  tenantName: '',
  organizationId: '',
  organizationName: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_TENANTLIST: (state, tenantList) => {
    state.tenantList = tenantList
  },
  SET_TENANTID: (state, tenantId) => {
    state.tenantId = tenantId
  },
  SET_TENANTNAME: (state, tenantName) => {
    state.tenantName = tenantName
  },
  SET_ORGANIZATIONID: (state, organizationId) => {
    state.organizationId = organizationId
  },
  SET_ORGANIZATIONNAME: (state, organizationName) => {
    state.organizationName = organizationName
  }
}

const actions = {

// 登录
  login({ commit }, userInfo) {
    const { tenantName, username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({tenantName: tenantName, username: username, password: md5(password).toUpperCase() }).then(response => {
        const {code, msg, data } = response
        if(code === 0) {
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        } else {
          reject(msg)
          Message.error(msg, 5000)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data, msg } = response
        if (!data) {
          reject('用户信息获取失败')  // '验证失败，请重新登录！'
        }
        const { roles, username, avatar, introduction, tenantId, organizationId } = data
        if (!roles || roles.length <= 0) {
          // reject('角色必须是一个非空数组!')
          reject('该账户无权访问，请联系管理员!')
        }

        commit('SET_ROLES', roles)
        commit('SET_USERNAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_TENANTID', tenantId)
        commit('SET_ORGANIZATIONID', organizationId)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

// 获取租户名称和id
tenantList({ commit }) {
    return new Promise((resolve, reject) => {
      return new Promise((reslove1) => {
        if(state.tenantId !== '') reslove1(state.tenantId)
      }).then((tenantId) => {
        try {
          let getTenant_name_id = []
          tenantList({current: 1}).then((res) => {
         if(res.code === 0) {
           tenantList({size: res.data.total}).then((res) => {
             let tenantArr = res.data.records

             if(tenantArr) {
               let tenantName = null

              tenantArr.map((x,y) => {
                  if(x.id == tenantId) {
                    tenantName = x.name
                  }
                  getTenant_name_id.push({
                    name: x.name,
                    id: x.id
                 })
                     })
               commit('SET_TENANTNAME', tenantName)
               commit('SET_TENANTLIST', getTenant_name_id)
               resolve({
                tenantName: tenantName,
                tenantList: getTenant_name_id
               })
             } 
             else {
               commit('SET_TENANTLIST', [])
             }
           })
        }
       }
       )
        } catch {
          commit('SET_TENANTNAME', '')
        }
      })
    })
  },

// 获取用户所在公司
  getCompany({commit}) {
    return new Promise((resolve) => {
      return new Promise((reslove1) => {
        if(state.organizationId !== '') reslove1(state.organizationId)
      }).then((organizationId) => {
        try {
          companyDetails(organizationId).then((res) => {
              if(res.code === 0) {
              const { name } = res.data
               commit('SET_TENANTNAME', name)
               resolve({
                organizationName: name,
                organizationId: organizationId
               })
             } 
             else {
               commit('SET_TENANTNAME', '')
             }
           })
        } catch {
          commit('SET_TENANTNAME', '')
        }
      })
    })
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}