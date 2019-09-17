<template>
  <div>
    <div class="app-head" style="position:fixed;z-index:2">
      <div class="app-head-inner">
        <router-link :to="{path: '/'}">
          <img @click="moveTo('/')" src="../assets/logo.png">
        </router-link>
        <div class="head-block">
          <router-link v-for="item in products" :key="item.id"
                       :to="{ name: item.path, params: { type: item.type } }" active-class="active">
            {{ item.name }}
          </router-link>
          <!-- <span :class="[item.path==nowPage?'active':'', 'type-nav']" v-for="item in products" :key="item.id" @click="moveTo(item.path)">{{item.name}}</span> -->
        </div>
        <div class="head-nav">
          <ul class="nav-list">
            <li @click="logClick" v-if="show_login">登录</li>
            <li @click="checkout" v-else>注销</li>
            <li class="nav-pile">|</li>
            <li @click="regClick">注册</li>
            <li class="nav-pile">|</li>
            <li @click="aboutClick">使用前阅读</li>
            <li class="nav-pile">|</li>
            <li @click="toUser">个人中心</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-foot">
      <p>© 2019 GLa</p>
    </div>
    <my-dialog :is-show="isShowAboutDialog"
               @on-close="closeDialog('isShowAboutDialog')">
      <p class="p-about">本项目是通过使用vue.js框架的vue-cli脚手架工具搭建webpack打包的个人设计，
        已通过api与后台连接，部署在阿里云服务器上，该项目只用作学习用途作品展示，欢迎各位注册使用和提出您的宝贵意见。</p>
    </my-dialog>
    <my-dialog :is-show="isShowLogDialog"
               @on-close="closeDialog('isShowLogDialog')">
      <log-form @has-log="onSuccessLog" @on-close="closeDialog('isShowLogDialog')"></log-form>
    </my-dialog>
    <my-dialog :is-show="isShowRegDialog"
               @on-close="closeDialog('isShowRegDialog')">
      <reg-form @has-reg="onSuccessReg"></reg-form>
    </my-dialog>
  </div>
</template>

<script>
import Dialog from './dialog'
import LogForm from './logForm'
import RegForm from './regForm'
export default {
  components: {
    MyDialog: Dialog,
    LogForm,
    RegForm
  },
  data () {
    return {
      nowPage: '',
      isShowAboutDialog: false,
      isShowLogDialog: false,
      isShowRegDialog: false,
      username: '',
      show_login: true,
      products: [
        {
          name: '社会',
          path: 'creative',
          type: '1'
        },
        {
          name: '体育',
          path: 'space',
          type: '2'
        },
        {
          name: '财经',
          path: 'brand',
          type: '3'

        },
        {
          name: '科技',
          path: 'internet',
          type: '4'
        }
      ]
    }
  },
  methods: {
    toAdmin () {
      this.$router.push({
        name: '/admin'
      })
    },
    aboutClick () {
      this.isShowAboutDialog = true
    },
    logClick () {
      this.isShowLogDialog = true
    },
    regClick () {
      this.isShowRegDialog = true
    },
    closeDialog (attr) {
      this[attr] = false
    },
    onSuccessLog () {
      this.show_login = false
      this.closeDialog('isShowLogDialog')
    },
    onSuccessReg () {
      this.closeDialog('isShowRegDialog')
    },
    checkout () {
      this.clearCookie('user_info')
      this.$store.commit('setLogStatus', '')
      this.show_login = true
      this.$Message.success('已注销')
      this.$router.push({
        name: '/home'
      })
    },
    moveTo (obj) {
      this.$router.push({
        name: obj
      })
      console.log()
      this.nowPage = this.$route.name
    },
    toUser () {
      if (this.$store.state.loginStatus) {
        if (this.$store.state.loginType) {
          this.$router.push({
            name: '/admin'
          })
        } else {
          this.$router.push({
            name: '/user'
          })
        }
      } else {
        this.$Message.warning('请先登陆')
      }
    },
    // 设置cookie
    setCookie (cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + '; ' + expires
    },
    // 获取cookie
    getCookie (cname) {
      var arr
      var reg = new RegExp('(^| )' + cname + '=([^;]*)(;|$)')
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2])
      } else {
        return null
      }
    },
    // 清除cookie
    clearCookie (cname) {
      this.setCookie(cname, '', -1)
    },
    // 检查cookie
    checkCookie (cname) {
      var user = this.getCookie(cname)
      if (user != null) {
        this.show_login = false
        this.$store.commit('setLogStatus', JSON.parse(user).uid)
        this.$store.commit('setLogType', JSON.parse(user).type)
      } else {
        this.show_login = true
      }
    }
  },
  created () {
    this.checkCookie('user_info')
    this.$router.push({
      name: '/home'
    })
  }
}
</script>

<style >
  /* http://meyerweb.com/eric/tools/css/reset/
     v2.0 | 20110126
     License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    background: #f5f7f9;
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  body {
    background-color: #f0f2f5!important;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size: 14px;
    color: #444;
  }
  .app-head {
    background-color: #001b2c;
    color: #b2b2b2;
    height: 90px;
    width: 100%;
  }
  .app-head-inner {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .app-head-inner img {
    width: 100px;
  }
  .head-block{
    margin-left: -360px;
    margin-top: 14px;
  }
  .head-block>a{
    color:#fff;
    font-size: 16px;
    font-weight: 600;
    padding: 0 15px;
  }
  .head-block .type-nav{
    font-size: 20px;
    padding: 0px 15px;
    cursor: pointer;
    font-weight: bold;
  }

  .head-block .type-nav:hover{
    color: rgb(49, 212, 224)
  }
  .search-block{
    position: relative;
  }
  .search-block input{
    padding-left: 8px;
    color:#fff;
    height: 26px;
    border-radius: 5px;
    border: none;
    width: 200px;
    background:#033655;
    opacity: 0.5;
  }
  .search-btn{
    width: 30px;
    height: 26px;
    position: absolute;
    top:0;
    right: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #3F8FD2;
    padding-top: 2px;
    padding-left: 6px;
    cursor: pointer;
  }
  .search-btn img{
    width: 24px;
    height: 24px;
  }
  .head-block ul {
    overflow: hidden;
    line-height: 90px;
  }
  .head-block  li{
    cursor: pointer;
    float: left;
  }
  .head-nav ul {
    overflow: hidden;
    line-height: 90px;
  }
  .head-nav li{
    cursor: pointer;
    float: left;
  }
  .nav-pile {
    padding: 0 10px;
  }
  .app-foot {
    text-align: center;
    height: 80px;
    width: 100%;
    line-height: 80px;
    background-color: #e3e4e8;
    clear: both;
    margin-top: 30px;
  }
  .container {
    width: 1300px;
    margin: 0 auto;
  }
  .hr {
    height: 1px;
    width: 100%;
    background: #ddd;
  }
  .button {
    background: #3F8FD2;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
  }
  .button:hover {
    background: #3F8FD2;
  }

  .g-form-line {
    display: flex;
    justify-content: center;
    padding: 15px 0;
  }
  .g-form-label {
    width: 100px;
    line-height: 34px;
    font-size: 16px;
    display: inline-block;
  }
  .g-form-input {
    display: inline-block;
  }
  .g-form-input input {
    height: 34px;
    outline: none;
    width: 280px;
    line-height: 30px;
    vertical-align: middle;
    padding-left: 30px;
    border: 1px solid #ccc;
  }
  .g-form-btn .button{
    border-radius: 4px;
  }
  .g-form-error {
    color: red;
    padding-left: 15px;
  }
  .p-about {
    padding: 20px;
    color: #4a4a4a;
  }
  .active{
    color: #3F8FD2;
  }
  .no-works{
    width: 100%;
    padding: 20px;
    height: 200px;
  }
  .no-txt{
    height: 100%;
    background: #f4f4f4;
    font-size: 26px;
    line-height: 160px;
    text-align: center;
  }
</style>
