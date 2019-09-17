<template>
  <div class="detail-wrap">
    <div class="index-left" style="margin-top:90px">
      <div class="new">
        <div class="new-block">
          <div class="back-icon">
            <Icon size="30" type="md-arrow-back" @click="backTo"/>
          </div>
          <div class="detail-title">
            {{newsInfo.title}}
          </div>
          <div class="detail-content">
            <div class="detail-des">
              作者：{{newsInfo.user.username}} / {{newsInfo.createTime}}
              <span class="category" v-if="newsInfo.newstypeId===0">
                公告
              </span>
              <span class="category" v-if="newsInfo.newstypeId===1">
                社会
              </span>
              <span class="category" v-if="newsInfo.newstypeId===2">
                体育
              </span>
              <span class="category" v-if="newsInfo.newstypeId===3">
                财经
              </span>
              <span class="category" v-if="newsInfo.newstypeId===4">
                科技
              </span>
            </div>
            <div v-if="newsInfo.newsPhoto" class="detail-img">
              <img width="740px" height="530px" :src="newsInfo.newsPhoto">
            </div>
            <div class="detail-txt" v-html="newsInfo.content">
            </div>
          </div>
        </div>
        <div class="comment-block">
          <div class="header">
            评论区
          </div>
          <div v-if="commentList.length>0" class="view">
            <div class="comment-item" v-for="(item, index) in commentList" :key="index">
              <div class="view-user">
                <img class="user-img" :src="item.user.userPhoto">
                <div>
                  {{item.user.username}}
                </div>
              </div>
              <div class="view-content">
                <div class="create-time">
                  {{item.createTime}}
                </div>
                <div class="comment-txt" v-html="item.content">
                </div>
              </div>
            </div>
          </div>
          <div class="view" v-else style="font-size:16px">还没有人评论过...</div>
          <div class="rating">
            <quill-editor v-model="comment_content"
                          ref="myQuillEditor1"
                          :options="editorOption"
                          @focus="getFocus"
                          @blur="loseFocus"
                          placeholder="我来评论两句..."
                          style="max-width: 650px;margin-top: 15px;margin-left: 40px;background: #fff;">
            </quill-editor>
            <button class="btn-rating" @click="submitComment">发表评论</button>
          </div>
        </div>
      </div>
      <div class="news-recommend">
        <div class="block-head">
          相关推荐
        </div>
        <div class="Rnew-list" v-for="(item, index) in ReccomendList" :key="index">
          <div class="Rnew-item" @click="toDetail(item.id)">
            <img width="280" height="150px" :src="item.newsPhoto">
            <div class="Rnew-title">
              {{item.title}}
            </div>
          </div>
        </div>
      </div>
      <BackTop></BackTop>
    </div>
  </div>
</template>

<script>
import { getNewsInfoApi, getRecomendListApi, submitCommentApi } from '@/api/news.js'

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
            response: (res) => {
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
      id: '',
      newsInfo: '',
      commentList: [],
      ReccomendList: [],
      comment_content: ''
    }
  },
  methods: {
    loseFocus () {
      this.$refs.myQuillEditor1.$el.children[1].classList.remove('ql-container-focus')
      this.$refs.myQuillEditor1.$el.children[1].classList.add('ql-container')
    },
    getFocus () {
      // console.log(this.$refs.myQuillEditor)
      this.$refs.myQuillEditor1.$el.children[1].classList.add('ql-container-focus')
    },
    getNewsInfo () {
      this.id = this.$route.params.id
      getNewsInfoApi(this.id).then(res => {
        this.newsInfo = res.data.data.new
        this.commentList = res.data.data.commentList
      })
    },
    toDetail (id) {
      getNewsInfoApi(id).then(res => {
        this.newsInfo = res.data.data.new
        this.commentList = res.data.data.commentList
      })
    },
    backTo () {
      this.$router.back(-1)
    },
    getReccomendList () {
      getRecomendListApi().then(res => {
        this.ReccomendList = res.data.data
      })
    },
    submitComment () {
      if (this.$store.state.loginStatus) {
        if (this.comment_content) {
          submitCommentApi(this.comment_content, this.id, this.$store.state.loginStatus).then(res => {
            if (res.data.code === 20000) {
              this.comment_content = ''
              this.$Message.success('评论成功')
              this.getNewsInfo()
            }
          })
        } else {
          this.$Message.warning('评论内容不能为空')
        }
      } else {
        this.$Message.warning('请先登陆')
      }
    }
  },
  activated () {
    this.getNewsInfo()
    this.getReccomendList()
  },
  created () {
    if (this.id == null) {
      this.$router.push({
        name: '/home'
      })
    }
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
  .new .detail-title {
    font:800 30px "微软雅黑";
    padding: 26px 30px;
  }
  .new .category {
    padding: 5px 10px;
    background: #3F8FD2;
    color: #fff;
    margin-left: 20px;
  }
  .new .detail-content {
    margin-top:20px;
  }
  .new .detail-content .detail-des {
    color: #7e7e7e;
    padding: 20px 0;
  }
  .index-left .news-recommend {
    margin-left: 40px;
    padding: 20px 36px;
  }
  .block-head {
    padding: 15px;
    font: 600 24px "微软雅黑";
  }
  .Rnew-list {
    margin-top: 20px;
  }
  .Rnew-item {
    margin-bottom:30px;
  }
  .Rnew-title {
    font: 400 20px "微软雅黑";
    width: 280px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .Rnew-title:hover {
    color: #3F8FD2;
  }
  .detail-img {
    padding: 0 30px;
  }
  .detail-txt {
    padding: 22px 30px;
    font: 400 18px "微软雅黑";
    line-height: 1.8;
    text-align: left;
  }
  .comment-block .header {
    text-align: left;
    font-size: 22px;
    padding: 20px 30px;
    width: 100%;
    border-bottom: 1px solid #e3e3e3;
  }
  .comment-block .view {
    padding:20px 30px;
  }
  .view .comment-item{
    display: flex;
    border-bottom:1px solid #e3e3e3;
    margin-bottom: 15px;
    padding-bottom: 15px;
  }
  .view .view-user {
    width: 15%;
  }
  .view .user-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .view .create-time {
    text-align: left;
    color: #d4d4d4;
  }
  .view .comment-txt {
    max-width: 500px;
    padding: 15px 20px;
    line-height: 1.5;
    text-align: left;
  }
  .rating {
    padding: 0 30px 20px 30px;
    display: flex;
  }
  .rating textarea {
    margin-left: 100px;
  }
  .btn-rating {
    border-radius: 4px;
    border: none;
    height: 38px;
    background-color: #3F8FD2;
    color: #fff;
    padding: 8px 10px;
    margin-left: 30px;
    margin-top: 15px;
  }
  .comment-inp {
    padding: 15px;
  }
  .comment-block .ql-container{
    min-height: 50px;
    max-height: 50px;
    transition: all 0.5s;
  }
  .comment-block .ql-container-focus{
    min-height: 180px;
    max-height: 180px;
  }
  .back-icon{
    justify-content: flex-start;
    display: flex;
    padding-top: 30px;
    padding-left: 30px;
  }
  .detail-txt img{
    max-width: 740px!important;
    min-width: 740px!important;
  }
</style>
