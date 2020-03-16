<template>
  <Form ref="loginForm" @on-validate="handleOnValidate" :model="form" :rules="rules"
    @keydown.enter.native="handleSubmit">
    <FormItem prop="phone">
      <Input v-model="form.phone" placeholder="请输入手机号">
      <span slot="prepend">
        <Icon type="ios-call" />
      </span>
      </Input>
    </FormItem>
    <FormItem prop="verifyCode">
      <Row>
        <Col span="12">
        <Input type="password" v-model="form.verifyCode" placeholder="手机验证码">
        <span slot="prepend">
          <Icon type="md-mail" />
        </span>
        </Input>
        </Col>
        <Col span="8" offset="2">
        <Button :disabled="!btnSmsAvailable" @click="handleBtnSmsClick" :loading="doingSendSms">
          {{ btnSmsAvailableLeftSeconds > 0 ? '剩余 ' + btnSmsAvailableLeftSeconds + ' 秒' : '获取验证码' }}
        </Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {
    sendSmsCode
  } from '@/api/user'
  import {
    regxpPhone
  } from '@/libs/regxp'

  export default {
    name: 'LoginForm',
    props: {
      phoneRules: {
        type: Object,
        default: () => {
          return {
            type: "string",
            required: true,
            message: "请输入正确的手机号...🙃",
            validator: (rule, value) => {
              // 正则校验
              return regxpPhone(value)
            }
          }
        }
      },
      verifyCodeRules: {
        type: Object,
        default: () => {
          return {
            type: "string",
            required: true,
            message: "请输入验证码...🙃"
          }
        }
      }
    },
    data() {
      return {
        // 表单域
        form: {
          phone: '',
          verifyCode: '',
        },
        // 获取验证码按钮是否可用
        btnSmsAvailable: false,
        // 是否正在向后台请求发送验证码
        doingSendSms: false,
        // 剩余可再次获取验证码的时间，秒单位
        btnSmsAvailableLeftSeconds: 0
      }
    },
    computed: {
      rules() {
        return {
          phone: this.phoneRules,
          verifyCode: this.verifyCodeRules
        }
      }
    },
    methods: {
      // 提交按钮的点击事件
      handleSubmit() {
        console.log(this.form.phone, this.form.verifyCode)
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$emit('on-success-valid', {
              phone: this.form.phone,
              verifyCode: this.form.verifyCode
            })
          }
        })
      },
      // 开始倒计时获取验证码按钮
      async countBtnSms(seconds = 300) {
        // 禁用按钮
        this.btnSmsAvailable = false
        return new Promise((resolve, reject) => {
          // 设置剩余时间
          this.btnSmsAvailableLeftSeconds = seconds
          // 倒计时
          let internal = setInterval(() => {
            this.btnSmsAvailableLeftSeconds--
            // 到时，清除计时器，设置按钮可用
            if (this.btnSmsAvailableLeftSeconds <= 0) {
              clearInterval(internal)
              this.btnSmsAvailable = true
              return resolve()
            }
          }, 1000)
        })
      },

      // 获取验证码按钮的点击事件
      async handleBtnSmsClick() {
        // 设置loading
        this.doingSendSms = true
        const phoneNumber = this.form.phone
        try {
          // 发送请求
          await sendSmsCode(phoneNumber)
          // 停止loading
          this.doingSendSms = false
          // 倒计时
          await this.countBtnSms()
        }
        // 发送验证码失败
        catch (e) {
          this.$Notice.error({
            title: '获取验证码失败！',
            desc: e.message
          });
          // 停止loading
          this.doingSendSms = false
        }
      },
      
      // 表单域的校验事件
      handleOnValidate(prop, status, error) {
        if (prop === "phone" && !status) {
          this.btnSmsAvailable = false
        } else {
          this.btnSmsAvailable = true
        }
      }
    },
    created: function () {
    }
  }
</script>