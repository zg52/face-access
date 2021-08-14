<!--
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-07-02 16:43:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tracking-Pluse:\hjimi\人脸辨识云\html\face-recognition-access\src\views\profile\index.vue
-->
<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="账户" name="account">
                <account :user="user"/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      user: {},
      activeTab: 'account',
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'avatar',
      'roles',
      'tenantId',
      'tenantName',
      'organizationName',
			'organizationId'
    ])
  },
  methods: {
    getUser() {
          this.user = {
            username: this.username,
            role: this.roles.join(' | '),
            email: '',
            avatar: this.avatar,
            tenantId: this.tenantId,
            tenantName: this.tenantName,
            organizationName: this.organizationName,
		    organizationId: this.organizationId,
          }
    }
  },
  created() {
     this.$store.dispatch('user/tenantList').then((res) => {
      this.user.tenantName = res.tenantName
     })
     this.$store.dispatch('user/getCompany').then((res) => {
      this.user.organizationName = res.organizationName
     })
     this.getUser()
  },
  mounted() {
  }
}
</script>