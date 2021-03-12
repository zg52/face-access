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
    margin-top: 100px;
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
<template>
  <div class="login-container">
    <div class="container_tit"><img src="../../assets/image/home-logo.png"><span>智能安防 · 监控门禁系统 <svg-icon class="ml4" icon-class="sys-tit"/></span></div>
    <div class="main"><div class="banner"> <img src="../../assets/image/banner.png" width="490"></div><div>

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container"><h3 class="title">人脸辨识云·门禁系统</h3></div>
      <el-form-item prop="username">
        <span class="svg-container"><svg-icon icon-class="user" /></span>
        <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1" autocomplete="on" />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container"><svg-icon icon-class="password" /></span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
        </el-form-item>
      </el-tooltip>
      <el-button class="handle_login" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
      </div>
    </div>
    <footer class="base">版权信息： CopyRight © 2016-2021 华捷艾米 版权所有 京ICP备18040828号-1</footer>
  </div>
</template>
<script>

export default {
  name: 'Login',
  data() {
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
    return {
      loginForm: {
        username: null,
        password: null
      },
      loginRules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur',}],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur',}]
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
  created() {
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
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
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
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
    }
  },
  mounted() {
  }
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