/*
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-07-02 15:58:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\store\getters.js
 */
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  tenantList: state => state.user.tenantList,
  tenantName: state => state.user.tenantName,
  tenantId: state => state.user.tenantId,
  organizationId: state => state.user.organizationId,
  organizationName: state => state.user.organizationName,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters