<template>
  <div class="login-form">
    <div class="login-header">
      用户注册
    </div>
    <div class="g-form">
      <div class="g-form-line">
        <!-- <span class="g-form-label">用户名：</span> -->
        <div class="g-form-input">
          <Icon size="24" type="ios-contacts" />
          <input type="text"
                 style="border:none;"
                 autocomplete="off"
                 v-model="user_name"
                 @blur="checkUserName"
                 placeholder="请输入用户名">
          <div class="line-box" ref="use_name_inp"></div>
          <p v-show='display' :class="msg_sty">{{reg_msg}}</p>
        </div>
      </div>
      <div class="g-form-line">
        <!-- <span class="g-form-label">密码：</span> -->
        <div class="g-form-input">
          <Icon size="24" type="md-lock" />
          <input type="password"
                 v-model="password"
                 autocomplete="off"
                 style="border:none;"
                 placeholder="请输入密码">
          <div class="line-box"></div>
        </div>
      </div>
      <div class="g-form-line">
        <!-- <span class="g-form-label">邮箱：</span> -->
        <div class="g-form-input">
          <Icon size="24" type="md-mail" />
          <input type="text"
                 v-model="e_mail"
                 autocomplete="off"
                 style="border:none;"
                 @blur="checkEmail"
                 placeholder="请输入注册邮箱">
          <div class="line-box" ref="e_mail_inp"></div>
          <p v-show='display2' :class="em_sty">{{em_msg}}</p>
        </div>
      </div>
      <div class="g-form-line">
        <Button type="primary" style="width:200px" @click="reginUser">立即注册</Button>
      </div>
      <p style="text-align:center">欢迎注册新账户</p>
    </div>
  </div>
</template>

<script>
import { registerApi, checkUserNameAPi } from '@/api/user.js'

import md5 from 'js-md5'
export default {
  data () {
    return {
      user_name: '',
      password: '',
      e_mail: '',
      display: false,
      display2: false,
      reg_msg: '',
      em_msg: '',
      em_sty: '',
      msg_sty: ''
    }
  },
  methods: {
    checkEmail () {
      this.display2 = true
      const EmReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
      if (EmReg.test(this.e_mail)) {
        this.$refs.e_mail_inp.style = 'border-color:#19be6b'
        this.em_sty = 'success-tip'
        this.em_msg = '该邮箱可用'
        return true
      } else {
        this.$refs.e_mail_inp.style = 'border-color:red'
        this.em_sty = 'error-tip'
        this.em_msg = '请输入有效邮箱'
        return false
      }
    },
    reginUser () {
      if (this.user_name && this.password && this.e_mail && this.checkEmail()) {
        registerApi(this.user_name, md5(this.password), this.e_mail).then(res => {
          if (res.data.code === 20000) {
            this.$Message.success('注册用户成功')
          } else {
            this.$Message.error('注册用户失败')
          }
        })
        this.$emit('has-reg')
      } else {
        this.$Message.warning('注册信息不完整')
      }
    },
    checkUserName () {
      this.display = true
      checkUserNameAPi(this.user_name).then(res => {
        if (res.data.code === 50000) {
          this.$refs.use_name_inp.style = 'border-color:red'
          this.msg_sty = 'error-tip'
          this.reg_msg = res.data.msg
        } else {
          this.$refs.use_name_inp.style = 'border-color:#19be6b'
          this.msg_sty = 'success-tip'
          this.reg_msg = res.data.msg
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error-tip{
  color: red;
  text-align: center;
}
.success-tip{
  color: #19be6b;
  text-align: center;
}
.login-header{
  font-size: 30px;
  line-height: 34px;
  padding-top: 4%;
  justify-content: center;
  display: flex;
  color: #2d8cf0;
}
.line-box{
  border-bottom:1px solid #dcdee2
}
</style>
