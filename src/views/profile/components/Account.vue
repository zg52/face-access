<!--
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-03-12 14:31:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\views\profile\components\Account.vue
-->
<style lang="scss">
  .getCode {
    margin-left: 10px;
  }
</style>
<template>
  <el-form label-position="left" label-width="82px">
    <el-form-item label="姓名：">
      <el-input v-model.trim="user.name" />
    </el-form-item>
       <el-form-item label="昵称：">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="邮箱：">
      <el-input v-model.trim="user.email" style="width:300px"/>
      <el-button type="primary" size="small" class="getCode">获取验证码</el-button>
    </el-form-item>
    <el-form-item label="新密码：">
      <el-input type="password" v-model.trim="user.email" />
    </el-form-item>
        <el-form-item label="确认密码：">
      <el-input type="password" v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" disabled @click="submit">更 改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
