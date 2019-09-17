<template>
  <div class="login-form">
    <div class="login-header">
      用户登陆
    </div>
    <div class="g-form">
      <div class="g-form-line">
        <div class="g-form-input">
          <!-- <span class="g-form-label">用户名：</span> -->
          <Icon size="24" type="ios-contacts" />
          <input type="text"
                 style="border:none;"
                 v-model="user_name"
                 autocomplete="off"
                 placeholder="请输入用户名">
          <div class="line-box"></div>
        </div>
      </div>
      <div class="g-form-line">
        <div class="g-form-input">
          <!-- <span class="g-form-label">密码：</span> -->
          <Icon size="24" type="md-lock" />
          <input type="password"
                 style="border:none;"
                 v-model="password"
                 autocomplete="off"
                 placeholder="请输入密码">
          <div class="line-box"></div>
        </div>
      </div>
      <div class="type-box">
        <RadioGroup v-model="userType">
          <Radio label="1">
              <span>管理员</span>
          </Radio>
          <Radio label="0">
              <span>普通用户</span>
          </Radio>
        </RadioGroup>
      </div>
      <!-- <button @click="delSession('user')">clear</button>
      <button @click="getSession('user')">get</button>
      <input type="text" @keyup.enter="setSession('user', sessionValue)" v-model="sessionValue"> -->
      <div class="g-form-line">
        <Button type="primary" style="width:200px" @click="onLogin">登录</Button>
      </div>
      <p style="text-align:center">已注册普通用户账号/密码：zjq/zjq123</p>
      <p style="text-align:center">管理员账号/密码：admin/zjq123</p>
    </div>
  </div>
</template>

<script>
import { loginApi } from '@/api/user.js'

import md5 from 'js-md5'
export default {
  data () {
    return {
      user_name: '',
      password: '',
      userType: '0'
    }
  },
  methods: {
    onLogin () {
      if (this.user_name && this.password) {
        loginApi(this.user_name, md5(this.password), this.userType).then(res => {
          if (res.data.code === 20000) {
            this.$store.commit('setLogStatus', res.data.data.uid)
            this.$store.commit('setLogType', res.data.data.type)
            this.setCookie('user_info', JSON.stringify(res.data.data), 1)
            this.$Message.success('登陆成功')
            this.$emit('has-log')
          } else {
            this.$Message.error('账号、密码或类型错误')
          }
        })
      } else {
        this.$emit('on-close')
      }
    },
    // 设置cookie
    setCookie (cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + '; ' + expires
    },
    // 设置sessionStorage
    setSession (sname, svalue) {
      sessionStorage.setItem(sname, svalue)
    },
    // 获取sessionStorage
    getSession (sname) {
      var lastname = sessionStorage.getItem(sname)
      alert(lastname)
    },
    // 删除指定sessionStorage
    delSession (sname) {
      sessionStorage.removeItem(sname)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  .type-box{
    display: flex;
    justify-content: center;
  }
</style>
