<template>
  <div class="detail-wrap1">
    <div class="admin-left">
      <div class="product-board1">
        <h1 class="news-header">
          新闻管理
        </h1>
        <table style="width:100%">
          <tr class="th-sty">
            <th style="width: 35%">标题</th>
            <th style="width: 12%">作者ID</th>
            <th style="width: 22%">发布时间</th>
            <th style="width: 31%">操作</th>
          </tr>
          <tr class="td-sty" v-for="(item, index) in newsList" :key="index">
            <td class="title-sty" @click="toDetail(item.id)">{{item.title}}</td>
            <td>{{item.userId}}</td>
            <td>{{item.createTime}}</td>
            <td>
              <Button type="primary" @click="editRec(item, '1')" size="default" v-if="!item.isTop" ghost>推荐新闻</Button>
              <Button type="warning" @click="editRec(item, '0')" size="default" v-else ghost>取消推荐</Button>
              <Button type="error" @click="editHot(item, '1')" size="default" v-if="!item.isHot" ghost>设为热榜</Button>
              <Button type="warning" @click="editHot(item, '0')" size="default" v-else ghost>取消热榜</Button>
              <Icon class="del-icon" size="26" type="ios-trash-outline" @click="delNews(item.id)"/>
            </td>
          </tr>
        </table>
        <div class="page-box">
          <Page :total="Number(pageInfo.totalRecord)" @on-change="changePage" :page-size="Number(pageSize)" :current="nowPage" size="small" />
        </div>
      </div>
    </div>
    <div class="admin-right">
      <div class="product-board1">
        <h1 class="news-header">
          发布公告
        </h1>
        <div class="flex-box-no">
          <label>标题：</label>
          <Input v-model="notice_title" placeholder="请输入标题" style="width: 414px" />
        </div>
        <quill-editor v-model="notice_content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      style="max-width: 460px;min-width:460px; margin-top: 15px;background: #fff;">
        </quill-editor>
        <div class="btn-box">
          <Button type="primary" :current="nowPage" @click="publishNotice">发布公告</Button>
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
  </div>
</template>

<script>
import { getSeacrhListApi, publishNoticeApi, delNewsApi, setNewsTypeApi } from '@/api/news.js'

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
export default {
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
      notice_title: '',
      notice_content: '',
      nowPage: 1,
      pageSize: 5,
      newsList: [],
      pageInfo: '',
      id: '',
      isHot: '',
      isTop: '',
      modal1: false
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push({
        name: '/new_detail',
        params: {
          id: id
        }
      })
    },
    editHot (item, sen) {
      if (item.isTop) {
        this.isTop = '1'
      } else {
        this.isTop = '0'
      }
      const query = {
        isHot: sen,
        isTop: this.isTop
      }
      setNewsTypeApi(item.id, query).then(res => {
        if (res.data.code === 20000) {
          this.$Message.success('修改成功')
          this.getAllNewsList()
        } else {
          this.$Message.error('修改失败')
        }
      })
    },
    editRec (item, sen) {
      if (item.isHot) {
        this.isHot = '1'
      } else {
        this.isHot = '0'
      }
      this.$http({
        url: 'http://47.105.184.58:8080/qs-one-0.0.1-SNAPSHOT/api/web/news/' + item.id,
        method: 'PUT',
        data: {
          isHot: this.isHot,
          isTop: sen
        }
      }).then(res => {
        if (res.data.code === 20000) {
          this.$Message.success('修改成功')
          this.getAllNewsList()
        } else {
          this.$Message.error('修改失败')
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
        if (res.data.data) {
          this.$Message.success('新闻已删除')
          this.getAllNewsList()
        } else {
          this.$Message.error('新闻删除失败')
        }
      })
    },
    getAllNewsList () {
      getSeacrhListApi('', this.nowPage, this.pageSize).then(res => {
        this.newsList = res.data.data.newsList
      })
    },
    changePage (page) {
      this.nowPage = page
      this.getAllNewsList()
    },
    publishNotice () {
      if (!this.notice_title) {
        this.$Message.error('公告标题不能为空！')
      } else if (!this.notice_content) {
        this.$Message.error('公告内容不能为空！')
      } else {
        publishNoticeApi(this.notice_title, this.notice_content, this.$store.state.loginStatus, 0).then(res => {
          if (res.data.code === 20000) {
            this.getAllNewsList()
            this.notice_title = ''
            this.notice_content = ''
            this.$Message.success('公告已发布')
          } else {
            this.$Message.error('公告发布失败')
          }
        })
      }
    }
  },
  activated () {
    this.getAllNewsList()
    getSeacrhListApi('').then(res => {
      this.pageInfo = res.data.data.page
    })
  }
}
</script>

<style>
  .detail-wrap1{
    display: flex;
    padding-top: 90px;
  }
  .admin-left{
    width: 58%;
    margin-right: 2%;
    background: #fff
  }
  .admin-right{
    width: 40%;
    background: #fff;
  }
  .product-board1{
    padding: 30px;
  }
  .news-header{
    color: #2d8cf0;
    font-size: 28px;
    margin-bottom: 25px;
  }
  .th-sty{
    background: #5cadff;
    line-height: 38px;
    color: #fff;
  }
  .th-sty>th:first-child{
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .th-sty>th:last-child{
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .td-sty td{
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #e8eaec
  }
  .page-box{
    margin-top:15px;
    display: flex;
    justify-content: center
  }
  .btn-box{
    display: flex;
    justify-content: center;
    margin-top:15px;
  }
  .title-sty{
    cursor: pointer;
    color:#5cadff;
  }
  .flex-box-no{
    display: flex;
    padding: 0px;
  }
  .flex-box-no label{
    line-height: 32px;
  }
</style>
<style>
  .ql-container{
    max-height: 200px;
    min-height: 200px;
  }
  .del-icon{
    cursor: pointer;
  }
</style>
