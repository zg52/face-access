<!--
 * @Author: your name
 * @Date: 2021-01-07 18:28:14
 * @LastEditTime: 2021-03-24 18:20:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\face-recognition-access\src\views\profile\components\Account.vue
-->
<style lang="scss">
  .getCode {
    margin-left: 10px;
  }
</style>
<template>
 <el-form :model="changePsw" :rules="changePswRule" ref="changePswForm" label-position="right" label-width="92px">
    <el-form-item prop="username" label="用户名"> <el-input type="email" v-model="changePsw.changePswname" placeholder="请输入邮箱" disabled></el-input></el-form-item>
    <el-form-item prop="email" label="邮箱"><el-input type="email" v-model="changePsw.email" placeholder="请输入邮箱"></el-input></el-form-item>
    <el-form-item label="验证码:" prop="verifyCode">
      <el-input type="text" v-model.trim="changePsw.verifyCode" placeholder="请输入验证码" class="verifyCode" style="width:300px"></el-input>
      <el-button type="primary" size="small" class="verifyCode_btn ml10" :disabled="changePsw.verifyCodeBtnStatus" @click.prevent="getverifyCodeHandler_psw('changePswForm')">{{ changePsw.verifyCodeTxt }}</el-button>
    </el-form-item>
     <el-form-item prop="oldPass" label="旧密码">
      <el-input type="oldPass" :show-password="true" v-model="changePsw.oldPass" maxlength="16" placeholder="请输入旧密码"></el-input>
    </el-form-item>
    <el-form-item prop="newPass" label="新密码">
      <el-input type="newPass" :show-password="true" v-model="changePsw.newPass" maxlength="16" placeholder="请输入大于6位数字和字母组合的密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkPsw" label="确认新密码">
      <el-input type="password" :show-password="true" v-model="changePsw.checkPsw" placeholder="请输入确认密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="changePswHandler('changePswForm')" :disabled="changePsw_loading"><i :class="{'el-icon-loading':changePsw_loading}"></i> 更改密码</el-button>
    </el-form-item>
</el-form>
</template>

<script>
import { login, getVerifyCode, updatePass } from "@/api/user"
import { mapMutations } from 'vuex'
let vm

export default {
  name: 'personalCenter',
  data() {
    let validatePsw1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.changePsw.newPass) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    function notNull(notNullName) { return [{required: true, message: `请输入${ notNullName }`, trigger: "blur" }] }
    return {
      changePsw_loading: false,
      changeEmail_loading: false,
      changePsw: {
        username: this.$store.getters.username,
        email: '',
        verifyCode: '',
        oldPass: null,
        newPass: '',
        checkPsw: '',
        verifyCodeTxt: "获取验证码",
        verifyCodeBtnStatus: false,
        verifyCodeTime: 60,
      },
      changePswRule: {
         email: [
          notNull('邮箱地址')[0],
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        oldPass: notNull('旧密码'),
        verifyCode:notNull('验证码'),
        newPass: [
          notNull('新密码')[0],
          {
            min: 6,
            message: "请输入大于6位数字和字母组合的密码",
            trigger: "blur",
          },
        ],
        checkPsw: [{required: true, validator: validatePsw1, trigger: 'blur' }],
      }
    }
  },
  methods: {
    ...mapMutations(["setUser"]), //存储User
    loginOut() {
      this.logoutHanlder()
    },
    async logoutHanlder() {
      await this.$store.dispatch("logout")
      this.$router.push("/")
    },
    verifyCodeHandler(x, y) {
      let _this = this,
        updatedKey = x,
        timeDecrease = x[y]
      let timer = setInterval(() => {
        timeDecrease--
        if (!timeDecrease <= 0) {
          this.$set(updatedKey, "verifyCodeTxt", timeDecrease + "s后重新获取")
          this.$set(updatedKey, "verifyCodeBtnStatus", true)
        } else {
          clearInterval(timer)
          this.$set(updatedKey, "verifyCodeTxt", "获取验证码")
          this.$set(updatedKey, "verifyCodeBtnStatus", false)
        }
      }, 1000)
      new Promise((resolved) => {
        if (timeDecrease != 58) resolved()
      }).then(() => {
        _this.$message({
          message: "验证码已发送至邮箱，请注意查收",
          type: "success",
          duration: 5 * 1000,
        })
      })
    },

// 修改密码-发送邮箱验证码
    getverifyCodeHandler_psw(changePswRule) {
      this.$refs[changePswRule].validateField("email", (validEmail) => {
        if (!validEmail) {
          getVerifyCode({
            username: this.changePsw.username,
            email: this.changePsw.username
          }).then((res) => {
            if (res.code == 0 && res.data) {
              this.verifyCodeHandler(this.changePsw, "verifyCodeTime")
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },

// 修改密码-提交
    changePswHandler(changePswRule) {
      let _this = this
      this.$refs[changePswRule].validate((valid) => {
        if (valid) {
          startResetPsw()
          function startResetPsw() {
            updatePass(this.changePsw).then((res2) => {
              if (res2.code == 0 && res2.data) {

                if (_this.changePsw_loading) {
                  return
                }
                _this.changePsw_loading = true
 
                login(param).then((res3) => {
                    if (res3.code == 0 && res3.data && res3.data.username) {
                      _this.$message({
                        message: "密码修改成功",
                        type: "success",
                        duration: 4 * 1000,
                      })
                      _this.changePsw_loading = false
                      _this.setUser(res3.data) //存储用户信息到cookie
                      _this.$refs[changePswRule].resetFields()
                    } else {
                      // 若登录失败则退出，手动登录
                      _this.$message({
                        message: "密码修改成功，请重新登录",
                        type: "success",
                        duration: 4 * 1000,
                      })
                      _this.loginOut()
                    }
                  })
                  .finally(() => {
                    _this.changePsw_loading = false
                  })
              } else if (res2.code == 400) {
                _this.$message({
                  message: "请输入有效验证码",
                  type: "warning",
                  duration: 5 * 1000,
                })
              }
            })
          }
        }
      })
    }
  },
  created() {
    vm = this
  },
  mounted() {
  }
}
</script>