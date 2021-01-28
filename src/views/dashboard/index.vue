<!--
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-01-28 11:08:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\views\dashboard\index.vue
-->
<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (
      // !this.roles.includes('admin')||
        !this.roles.includes('1')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
