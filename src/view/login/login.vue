<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" ref="loginForm"></login-form>
          <p class="login-tip">Bravo Mall 后台管理系统 For Businesses</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginForm from '_c/login-form'
  import { mapActions } from 'vuex'
  export default {
    components: {
      LoginForm
    },
    methods: {
      ...mapActions([
        'handleLogin',
        'handleGetUserInfo'
      ]),
      async handleSubmit({ phone, verifyCode }) {
        console.log(phone, verifyCode)
        try{
          // 获取token
          await this.handleLogin( {phone, verifyCode} )
          // 获取用户信息
          await this.handleGetUserInfo({})
          // 跳转首页
          this.$router.push({
            name: this.$config.homeName
          })
        }
        catch(e) {

        }
        
      }
  }
}
</script>