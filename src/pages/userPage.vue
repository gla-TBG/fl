<template>
  <div class="detail-wrap userPage">
    <div class="index-left" style="margin-top:90px">
      <div class="new">
        <div class="new-block" style="margin-right: 10px;">
          <div class="publish-block">
            <div class="detail-title">
              我要发布
            </div>
            <div class="card">
              <div class="inp-content">
                <input class="inp-sty" v-model="news_title" type="text" placeholder="请输入标题">
                <Select v-model="selType" style="width:100px">
                    <Option v-for="item in typeList" :value="item.label" :key="item.value">{{ item.value }}</Option>
                </Select>
                <!-- <textarea class="txt-box" v-model="news_content" name="" id="" cols="86" rows="10"></textarea> -->
                <quill-editor v-model="news_content"
                              ref="myQuillEditor"
                              :options="editorOption"
                              style="max-width: 799px;min-width:799px;margin: 10px auto;background: #fff;">
                </quill-editor>
                <div class="flex-box" style="justify-content: center;">
                  <img style="width:120px;height:80px;" v-if="newsImgUploade" ref="news_img" :src="newsImgUploade">
                  <img style="width:120px;height:80px;opacity: 0.5;" v-else ref="news_img" src="../assets/img-icon.png">
                  <Upload action="http://47.105.184.58:8080/qs-one-0.0.1-SNAPSHOT/api/web/uploadfile"
                        :on-success="handleSuccess"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        :max-size="10240">
                    <Button type="primary" class="upload-btn">上传图片</Button>
                  </Upload>
                  <Button type="warning" style="margin:24px;margin-left:0px;" @click="publishNews">发布新闻</Button>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-title">
            我的作品
          </div>
          <div v-if="userInfo.news" class="detail-list" v-for="(item, index) in worksList" :key="index">
            <div class="detail-item" @click="toDetail(item.id)">
              <div class="detail-img">
                <img width="200px" height="132px" :src="item.newsPhoto">
              </div>
              <div class="work-des">
                <div class="work-title">
                  {{item.title}}
                </div>
                <span class="work-date">{{item.createTime}}</span>
                <Icon class="del-icon work-del" size="22" type="ios-trash-outline" @click.stop="delNews(item.id)"/>
              </div>
            </div>
          </div>
          <div class="no-works"  v-else>
            <div class="no-txt">
              暂未发布作品
            </div>
          </div>
        </div>
      </div>
      <div class="user-block">
        <div class="block-head">
          用户信息
        </div>
        <div class="Rnew-list">
          <img class="head-img-sty" :src="userInfo.userPhoto">
          <div class="user-info">
            <div class="info-group">
              <label>用户名：</label>
              <span class="span-txt">{{userInfo.username}}</span>
            </div>
            <div class="info-group">
              <label>邮箱：</label>
              <span class="span-txt">{{userInfo.email}}</span>
            </div>
            <div  class="info-group">
              <label>作品数量：</label>
              <span class="span-txt">{{userInfo.newsCount||0}}</span>
            </div>
            <div class="info-group">
              <label>用户类型：</label>
              <span class="span-txt">普通用户</span>
            </div>
            <div class="info-group">
              <label>等级：</label>
              <span class="span-txt">{{userInfo.grade}}</span>
            </div>
          </div>
          <div class="info-group edit-btn" @click="showEdit">
            编辑信息
            <Icon type="ios-create" size="24" />
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="modal1"
      title="提示"
      @on-ok="ok"
      @on-cancel="cancel">
      <p style="text-align: center">
        <img src="@/assets/ico-warning.png" style="width:80px;height:80px">
      </p>
      <p style="text-align:center;font-size:20px">删除后将不能恢原，确认删除该新闻吗？</p>
    </Modal>
    <Drawer title="编辑信息" :closable="false" width="520" v-model="isDrawer" :mask-closable="false">
      <div class="edit-box">
        <img class="banner" src="@/assets/banner.jpg" alt="">
        <p class="abs-box">
          <img class="head-img-sty" :src="userInfo.userPhoto" alt="">
          <Upload action="http://47.105.184.58:8080/qs-one-0.0.1-SNAPSHOT/api/web/uploadfile"
                  :on-success="handleSuccessHeadImg"
                  :show-upload-list="false"
                  :format="['jpg','jpeg','png']"
                  :max-size="10240">
            <Button type="warning" class="upload-btn">选择头像</Button>
          </Upload>
        </p>
        <p class="flex-box" style="padding-top:220px">
          <label class="edit-label">用户名：</label>
          <Input v-model="userInfo.username" style="width: 300px" />
        </p>
        <p class="flex-box">
          <label class="edit-label">邮 箱：</label>
          <Input v-model="userInfo.email" @on-blur="checkEmail" type="email" style="width: 300px" />
        </p>
        <p class="flex-box">
          <label class="edit-label">修改密码：</label>
          <Input v-model="new_pw" placeholder="请输入新密码" type="text" v-if="show" style="width: 300px" />
          <Input placeholder="内容已隐藏，点击进行编辑或查看" @click.native="show = true" v-if="!show" style="width: 300px" />
        </p>
        <p class="flex-box">
          <label class="edit-label">用户类型：</label>
          <Input value="普通用户" disabled style="width: 300px" />
        </p>
        <p class="flex-box">
          <label class="edit-label">等级：</label>
          <Input :value="userInfo.grade" disabled style="width: 300px" />
        </p>
      </div>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="cancelEdit">取消</Button>
        <Button type="primary" @click="saveUserInfo">确认修改</Button>
      </div>
    </Drawer>
    <BackTop></BackTop>
  </div>
</template>

<script>
import { getUserInfoApi, checkUserNameAPi, editUserInfoApi } from '@/api/user.js'
import { publishNewApi, delNewsApi } from '@/api/news.js'

import md5 from 'js-md5'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // eslint-disable-line       
  ['blockquote', 'code-block'],   // eslint-disable-line        
  [{'list': 'ordered'}, {'list': 'bullet'}], // eslint-disable-line
  [{'font': []}], // eslint-disable-line
  [{'align': []}], // eslint-disable-line
  ['link', 'image'], // eslint-disable-line
  ['clean']   // eslint-disable-line                                     
]

export default{
  components: {
    quillEditor
  },
  data () {
    return {
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: 'file',
            action: 'http://47.105.184.58:8080/qs-one-0.0.1-SNAPSHOT/api/web/uploadfile',
            response: (res, file) => {
              return res.data.url
            },
            start: () => {}, // 自定义开始上传触发事件
            end: () => {}, // 自定义上传结束触发的事件，无论成功或者失败
            change: (xhr, formData) => {
            }
          },
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      },
      isDrawer: false,
      selType: '1',
      display: false,
      typeList: [
        {
          value: '社会',
          label: '1'
        },
        {
          value: '体育',
          label: '2'
        },
        {
          value: '财经',
          label: '3'
        },
        {
          value: '科技',
          label: '4'
        }
      ],
      sex: '',
      userInfo: '',
      newsImgUploade: '../assets/img-icon.png',
      news_title: '',
      news_content: '',
      modal1: false,
      show: false,
      oldName: '',
      new_pw: '',
      id: '',
      worksList: []
    }
  },
  methods: {
    saveUserInfo () {
      checkUserNameAPi(this.userInfo.username).then(res => {
        if (res.data.code === 50000 && this.userInfo.username !== this.oldName) {
          this.$Message.error(res.data.msg)
        } else {
          var data = {}
          if (this.new_pw) {
            data = {
              username: this.userInfo.username,
              email: this.userInfo.email,
              password: md5(this.new_pw),
              userPhoto: this.userInfo.userPhoto
            }
          } else {
            data = {
              username: this.userInfo.username,
              email: this.userInfo.email,
              userPhoto: this.userInfo.userPhoto
            }
          }
          const EmReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
          if (!EmReg.test(this.userInfo.email)) {
            this.$Message.warning('请输入正确格式的邮箱')
            return false
          }
          editUserInfoApi(this.$store.state.loginStatus, data).then(res => {
            if (res.data.code === 20000) {
              this.isDrawer = false
              this.$Message.success('修改成功')
            } else {
              this.$Message.error('修改失败')
            }
          })
          this.display = false
        }
      })
    },
    showEdit () {
      this.new_pw = ''
      this.show = false
      this.isDrawer = true
    },
    cancelEdit () {
      this.getUserInfo()
      this.isDrawer = false
    },
    getUserInfo () {
      // console.log(this.$store.state.loginStatus)
      getUserInfoApi(this.$store.state.loginStatus).then(res => {
        this.userInfo = res.data.data
        this.worksList = res.data.data.news.reverse()
        this.oldName = res.data.data.username
      })
    },
    toDetail (id) {
      this.$router.push({
        name: '/new_detail',
        params: {
          id: id
        }
      })
    },
    delNews (id) {
      this.modal1 = true
      this.id = id
    },
    cancel () {
      this.modal1 = false
    },
    ok () {
      delNewsApi(this.id).then(res => {
        if (res.data.code === 20000) {
          this.$Message.success('已删除作品')
          this.getUserInfo()
        }
      })
    },
    checkEmail () {
      const EmReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
      if (!EmReg.test(this.userInfo.email)) {
        this.$Message.warning('请输入正确格式的邮箱')
        return false
      }
    },
    handleSuccess (res, file) {
      this.newsImgUploade = res.data.url
    },
    handleSuccessHeadImg (res, file) {
      this.userInfo.userPhoto = res.data.url
    },
    publishNews () {
      if (!this.news_title) {
        this.$Message.error('新闻标题不能为空！')
      } else if (!this.news_content) {
        this.$Message.error('请输入新闻内容')
      } else if (!this.newsImgUploade) {
        this.$Message.error('请选择图片')
      } else {
        publishNewApi(this.news_title, this.news_content, this.userInfo.id, this.newsImgUploade, this.selType).then(res => {
          if (res.data.code === 20000) {
            this.news_title = ''
            this.news_content = ''
            this.newsImgUploade = ''
            this.selType = '1'
            this.$Message.success('发布成功')
            this.getUserInfo()
          }
        })
      }
    }
  },
  activated () {
    this.news_title = ''
    this.news_content = ''
    this.newsImgUploade = ''
    this.selType = '1'
    this.getUserInfo()
  }
}
</script>

<style>
  .detail-wrap {
    width: 1300px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
  }
  .detail-wrap .index-left {
    display: flex;
    width: 100%;
    text-align: center;
    background: #fff;
    margin-right: 15px;
  }
  .new {
    margin-bottom:30px;
  }
  .new-block{
    width: 100%;
    margin-right: 12px;
  }
  .detail-title {
    text-align: left;
    font:800 30px "微软雅黑";
    padding: 26px 30px;
    border-bottom:1px solid #e3e3e3;
  }
  .detail-item {
    margin-top:20px;
    margin-left:20px;
    padding: 15px 30px;
    display: flex;
    border-radius: 5px;
    background: #f4f4f4;
    position: relative;
  }
  .detail-item img{
    border-radius: 4px;
  }
  .detail-item{
    transition: all 0.8s
  }
  .detail-item:hover {
    background: #83ccd69a;
  }
  .work-title {
    text-align: left;
    padding: 10px;
    margin-left: 20px;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
  }
  .work-date {
    position: absolute;
    right: 100px;
    bottom: 20px;
    font-size: 16px;
  }
  .work-del {
    position: absolute;
    right: 20px;
    bottom: 20px;
    color: rgb(240, 36, 36);
    cursor: pointer;
  }
  .userPage .user-block {
    background: linear-gradient(#84d5fa, #2b85e4);
    /* background: #5cadff; */
    padding: 20px 36px;
    height: 534px;
    width: 100%;
  }
  .block-head {
    padding: 15px;
    font: 600 24px "微软雅黑";
  }
  .Rnew-list {
    margin-top: 20px;
    position: relative;
  }
  .Rnew-list .info-group {
    padding: 0 10px;
    display: flex;
    max-width: 300px;
    font-size: 16px;
  }
  .Rnew-list .info-group label {
    line-height: 39px;
    width: 80px;
    text-align: right;
  }
  .Rnew-list .info-group input {
    height: 34px;
    width: 196px;
    padding-left: 15px;
    border:none;
    background: #5cadff;
    color: #fff;
    font-size: 16px
  }
  .inp-content {
    background: #f4f4f4;
    border-radius: 5px;
    padding: 25px;
    padding-bottom: 0px;
  }
  .inp-content textarea {
    border: 1px solid #e3e3e3;
  }
  .card {
    padding: 20px 30px;
  }
  .file-area {
    display: flex;
    align-items: center;
    margin-left: 38px!important;
    margin-top: 10px!important;
  }
  .file-label {
    line-height: 19px;
    background: #3F8FD2!important;
    border-radius: 4px;
  }
  .upload {
    background: #3F8FD2!important;
    border-radius: 4px;
  }
  .mt-sm {
    margin-top: 0!important;
  }
  .img-preview {
    margin:0 15px
  }
  .wt-upload .img-preview {
    margin-top:0px!important;
  }
  .wt-upload .img-preview img {
    width:100px!important;
  }
  .progress-area {
    padding: 0px 20px!important;
  }
  .userPage .inp-sty {
    width: 695px;
    border-radius: 4px;
    height: 33px;
    border: 1px solid #e3e3e3;
    padding-left: 20px;
  }
  .span-txt{
    line-height: 39px;
    padding-left: 15px;
    color: #fff;
  }
  .userPage .txt-box{
    margin-top: 10px;
    border-radius: 4px;
    padding: 15px;
  }
  .flex-box{
    display: flex;
    padding: 20px 46px;
  }
  .flex-box img{
    border:1px dashed #d4d4d4
  }
  .upload-btn{
    margin:24px
  }
  .submit-btn{
    margin:24px
  }
  .uploade-head-img{
    position: absolute;
    top: 0px;
    right: 98px;
  }
  .img-btn{
    width: 100px;
    height: 100px;
  }
  .head-img-sty{
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
  .ql-editor{
    min-height: 180px!important;
    max-height: 180px!important;
  }
  .edit-box{
    position: relative;
    text-align: center;
  }
  .edit-box p{
    /* margin-bottom: 20px; */
    cursor: pointer;
    padding-bottom: 10px;
  }
  .edit-box .flex-box{
    display: flex;
    justify-content: center;
  }
  .edit-box .edit-label{
    width: 80px;
    line-height: 32px;
  }
  .demo-drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
  .banner{
    width: 100%;
    opacity: 0.7;
    max-height: 200px;
    position:absolute;
    top: 0px;
    left: 0px;
  }
  .abs-box{
    position:absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 20px auto;
  }
  .ivu-drawer-body {
    padding: 0px!important;
  }
  .edit-btn{
    margin-top: 40px;
    justify-content: center;
    line-height: 24px;
    cursor: pointer;
  }
</style>
