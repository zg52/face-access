<style lang="scss" scoped>
$bg:#1f2235;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 440px;
    max-width: 100%;
    padding: 0 35px 65px;
    margin: 0 auto;
    overflow: hidden;
    background: #272c40;
    // box-shadow: 0 0 20px #60526d;
    border-radius: 10px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    width: 440px;
    background: #323a4f;
    padding: 10px 0;
    left: -35px;
    margin-bottom:50px;
    .title {
      font-size: 28px;
    color: #f8f6ff;
    text-align: center;
    font-family: cursive;
    font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.container_tit {
  background: #232a47;
  height: 40px;
  width: 100%;
  display: flex;
  img {
    width: 115px; 
    margin-left: 75px;
  }
  span {
    color: #aa92ff;
    line-height: 40px;
    padding-left: 10px;
    font-size: 14px;
  }
}
.base {
  background: #23293f;
  color: #ccc;
  width: 100%;
  line-height: 30px;
  height: 30px;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
   font-size: 12px;
}
.main {
  display: flex;
  justify-content: center;
  padding-top: 60px;
  align-items: center;
  .banner {
    margin-right: 280px;
  }
}
.login-form ::v-deep .el-form-item--medium .el-form-item__content {
  background: #202334!important;
}
::v-deep .el-form-item--medium {
  margin-bottom: 30px;
}
.handle_login {
  width:100%;margin-top: 20px;
  padding: 12px 0!important;font-size: 20px!important;font-family: cursive!important;font-weight: bold;
}
</style>
<style lang="scss">
.login-container {
  .el-checkbox__label {
  color: #C0C4CC;
}
.el-checkbox__inner {
  background: #C0C4CC;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #b973ff;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  background: #b973ff;
  border-color: #b973ff;
}
}
.forget {
    color: #b973ff;
  font-size: 14px;
  cursor: pointer;
  display: block;
}
.verifyCode_btn {
  width: 126px;
  height: 40px;
    letter-spacing: 1px;

}
.verify {
  width: 232px;
}
</style>

<template>
  <div class="login-container">
    <div class="container_tit"><img src="../../assets/image/home-logo.png"><span>智能安防·监控·管理一体化智能门禁系统 <svg-icon class="ml4" icon-class="sys-tit"/></span></div>
    <div class="main"><div class="banner"> <img src="../../assets/image/banner.png" width="490"></div><div>

    <el-form ref="loginForm" v-if="loginShow" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container"><h3 class="title">人脸辨识云·门禁系统</h3></div>
      <el-form-item prop="username"><span class="svg-container"><svg-icon icon-class="user" /></span><el-input ref="username" v-model.trim="loginForm.username" placeholder="用户名" name="username" type="text" clearable /></el-form-item>
      <el-form-item prop="password">
          <span class="svg-container"><svg-icon icon-class="password" /></span>
          <el-input ref="password" v-model.trim="loginForm.password" placeholder="密码" type="password" clearable />
        </el-form-item>
       <div class="flex flexbetween"><el-checkbox v-model.trim="checked">记住密码</el-checkbox><span class="forget" @click="loginShowHandle">忘记密码？</span></div>
      <el-button class="handle_login" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
    
<!-- ###########找回密码 ##########--> 
 <el-form ref="findPassRule" v-if="findPassShow" :model="findPassForm" :rules="findPassRule" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container"><h3 class="title">人脸辨识云·门禁系统</h3></div>
      <el-form-item prop="username"><span class="svg-container"><svg-icon icon-class="user" /></span><el-input v-model.trim="findPassForm.username" placeholder="用户名" type="text" clearable /></el-form-item>
      <el-form-item prop="email"><span class="svg-container"><svg-icon icon-class="emial" /></span><el-input v-model.trim="findPassForm.email" placeholder="邮箱" name="emial" type="text" clearable /></el-form-item>
      <el-form-item prop="verifyCode" class="verify inline_block"><span class="svg-container"><svg-icon icon-class="authCode" /></span><el-input v-model.trim="findPassForm.verifyCode" placeholder="邮箱验证码" type="text" clearable/></el-form-item>
      <el-button type="primary" class="verifyCode_btn ml10 inline_block" :disabled="findPassForm.verifyCodeBtnStatus" @click.prevent="getverifyCodeHandler_psw('findPassRule')">{{ findPassForm.verifyCodeTxt }}</el-button>
      <el-form-item prop="newPass"> <span class="svg-container"><svg-icon icon-class="password" /></span><el-input :key="passwordType" v-model.trim="findPassForm.newPass" :type="passwordType" placeholder="新密码" clearable />
          <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
        </el-form-item>
      <el-form-item prop="checkPsw"> <span class="svg-container"><svg-icon icon-class="password" /></span><el-input :key="passwordType" v-model.trim="findPassForm.checkPsw"  :type="passwordType" placeholder="确认新密码" clearable />
          <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
        </el-form-item>
       <div class="flex flexbetween"><el-checkbox v-model.trim="checked">记住密码</el-checkbox> <span class="forget" @click.prevent="goLoginHandle">去登录</span></div>
      <el-button class="handle_login" :loading="loading" type="primary" @click="changePswHandler('findPassRule')">确 认</el-button>
    </el-form>
   </div>
  </div>
    <footer class="base">{{ `版权信息： CopyRight © 2016-${ new Date().getFullYear() } 华捷艾米 版权所有 京ICP备18040828号-1` }}</footer>
  </div>
</template>
<script>

import Cookies from 'js-cookie'
import { getVerifyCode, findPass } from "@/api/user"
import md5 from 'js-md5'

export default {
  name: 'login',
  data() {
  let validatePsw1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.findPassForm.newPass) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    function notNull(notNullName) { return [{required: true, message: `请输入${ notNullName }`, trigger: "blur" }] }
    return {
      loginShow: true,
      findPassShow: false,
      checked: false,
      checkedStatus: false,
      loginForm: {
        username: null,
        password: null
      },
      loginRules: {
        username:  notNull('用户名'),
        password:  notNull('密码'),
      },

      findPassForm: {
        username: null,
        email: null,
        verifyCode: null,
        newPass: null,
        checkPsw: null,
        verifyCodeTxt: "获取验证码",
        verifyCodeBtnStatus: false,
        verifyCodeTime: 60,
      },
      findPassRule: {
        username: notNull('用户名'),
        email: [
          notNull('邮箱地址')[0],
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
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
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
    },
    handleLogin() {
      let user = this.loginForm
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login',user).then(() => {
           if(this.checked) {
              Cookies.set('username',user['username'], {expires: 10})
             Cookies.set('password',user['password'], {expires: 10})
             Cookies.set('checkedStatus', true)
           } else {
             Cookies.remove('username')
             Cookies.remove('checkedStatus')
           }
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
     loginShowHandle() {
      this.loginShow = false
      this.findPassShow = true
    },
    goLoginHandle() {
      this.findPassShow = false
      this.loginShow = true
    },


// --------------------------找回密码---------------------------
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
    getverifyCodeHandler_psw(findPassRule) {
      this.$refs[findPassRule].validateField("email", (validEmail) => {
        if (!validEmail) {
          getVerifyCode({
            username: this.findPassForm.username,
            email: this.findPassForm.email
          }).then((res) => {
            if (res.code == 0 && res.data) {
              this.verifyCodeHandler(this.findPassForm, 'verifyCodeTime')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
// 找回密码-提交并登录
    changePswHandler(findPassRule) {
      let _this = this,
      user = this.findPassForm
      this.$refs[findPassRule].validate((valid) => {
        if (valid) {
          let changePswOld = {...this.findPassForm}
          startResetPsw()
          function startResetPsw() {
            findPass(Object.assign(changePswOld, { 
              newPass: md5(changePswOld.newPass).toUpperCase()
            })).then((res) => {
              if (res.code === 0) {

                if (_this.loading) { return }
                _this.loading = true
                let users = {
                  username: user['username'],
                  password: user['newPass']
                }
 
           _this.$store.dispatch('user/login',users).then(() => {
           _this.$router.push({ path: _this.redirect || '/', query: _this.otherQuery })
           _this.$message.success('密码修改成功，系统已为您自动登录！', 4000)
           _this.$refs.findPassRule.resetFields()
           if(_this.checked) {
              Cookies.set('username', users['username'], {expires: 10})
             Cookies.set('password', users['password'], {expires: 10})
             Cookies.set('checkedStatus', true)
           } else {
             Cookies.remove('username')
             Cookies.remove('checkedStatus')
           }
            }).finally(() => {
                    _this.loading = false
                  })
              } else {
               _this.$message.error(res.msg)
              }
            })
          }
        }
      })
    }
  },
  mounted() {
  this.$nextTick(() => {
      if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  
   let user = this.loginForm
   if(Cookies.get('username') && Cookies.get('checkedStatus')) {
     user['username'] = Cookies.get('username')
     user['password'] = Cookies.get('password')
     this.checked = true
   }
    })
  },
}
</script>
<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* 重置element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>