<template>
  <div class="index-wrap">
    <div class="search-block">
      <input type="text" v-model="search_txt">
      <span class="search-btn" @click="searchNews">
        <img src="../assets/search-icon.png" alt="">
      </span>
    </div>
    <div class="index-left" style="margin-top:90px">
      <div class="index-left-block">
        <h2>热文榜单</h2>
        <div v-for="(item, index) in hotList" :key="index">
          <div class="hot-list" @click="toDetail(item.id)">
            <span :class="'th-'+index" class="th">{{index*1+1}}</span>
            <div class='hot-title'>{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="index-left-block">
        <h2>他们也在这里</h2>
        <div class="user-list" v-for="(item, index) in userList" :key="index">
          <div class="user-img">
            <img :src="item.head_img">
          </div>
          <div class="user-des">
            <span>{{item.name}}</span>
            <div>{{item.des}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="index-right" style="margin-top:90px">
      <slide-show :slides="bannerList"></slide-show>
      <div class="img-block">
        <span style="display:flex;flex-wrap: wrap;">
          <div class='img-control' v-for="(item, index) in RecomendList" :key="index">
            <div v-if="index <= 3">
              <img class="img-item" :src="item.newsPhoto">
              <div class="img-wrap" @click="toDetail(item.id)">
              </div>
              <span class="wrap-txt" @click="toDetail(item.id)">
                {{item.title}}
              </span>
            </div>
          </div>
        </span>
      </div>
      <div class="new-block">
        <div class="block-header">
          今日精选
        </div>
        <div v-if="newList.length>0" class="new-list" v-for="(item, index ) in newList" :key="index">
          <div v-if="item.newsPhoto" class="new-img" @click="toDetail(item.id)">
            <img :src="item.newsPhoto">
          </div>
          <div v-else class="new-img" @click="toDetail(item.id)">
            <img src="@/assets/3.png">
          </div>
          <div class="new-content">
            <div class="new-title">
              <span @click="toDetail(item.id)">{{item.title}}</span>
            </div>
            <div style="color:#808695;margin-bottom:15px">
              发布时间：
              <span>{{item.createTime}}</span>
            </div>
            <div class="new-txt" v-html="item.content">
            </div>
          </div>
        </div>
        <div class="no-works"  v-if="newList.length<=0">
          <div class="no-txt">
            暂无发布作品
          </div>
        </div>
        <div style="display: flex;justify-content: center;">
          <Dropdown @on-click="moveTo">
            <a href="javascript:void(0)">
                更多
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(item, index) in typeList"
                              :key="index"
                              :name="item.path">{{item.name}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <BackTop></BackTop>
    </div>
  </div>
</template>

<script>
import { getHomeApi, getRecomendListApi, getSeacrhListApi } from '@/api/news.js'
import slideShow from '../components/slideShow'
export default {
  components: {
    slideShow
  },
  data () {
    return {
      id: '',
      bannerList: [],
      RecomendList: [],
      hotList: '',
      newList: '',
      textValue: '',
      change_val: '',
      list11: '',
      search_txt: '',
      type: '',
      imgsrc: 'http://yszyun.jios.org:2080/web/index.php?r=admin%2Fpassport%2Fcaptcha&amp;v=5bde9c93358fb',
      typeList: [
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
      ],
      userList: [
        {
          head_img: require('../assets/user/1.jpg'),
          name: '俞永福',
          des: 'UC移动事业群总裁',
          id: '2'
        },
        {
          head_img: require('../assets/user/2.jpg'),
          name: '周鸿祎',
          des: '奇虎360董事长',
          id: '4'
        },
        {
          head_img: require('../assets/user/3.jpg'),
          name: '王峰',
          des: '蓝港互动董事长',
          id: '6'
        },
        {
          head_img: require('../assets/user/4.jpg'),
          name: '方兴东',
          des: '博客网创始人',
          id: '8'
        }
      ]
    }
  },
  computed: {
    bankName () {
      return this.$store.state.loginStatus
    }
  },
  methods: {
    getHomeMsg () {
      getHomeApi().then(res => {
        this.bannerList = res.data.data.hotlist.slice(0, 4)
        this.hotList = res.data.data.hotlist
      })
      getRecomendListApi().then(res => {
        this.RecomendList = res.data.data
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
    searchNews () {
      getSeacrhListApi(this.search_txt, 1, 5).then(res => {
        this.newList = res.data.data.newsList
      })
    },
    moveTo (name) {
      this.$router.push({
        name: name
      })
    },
    aa () {
      alert(this.$store.state.loginStatus)
      this.$http({
        // url: '/api/singlePoetry'
        url: 'http://47.105.184.58:8080/restful/user/1'
      }).then(res => {
        this.list11 = res.data.data
        // console.log(JSON.stringify(this.list11))
      })
      // this.$http({
      //   url: 'http://yszyun.jios.org:2080/web/index.php?r=admin%2Fpassport%2Fcaptcha&amp;refresh=1',
      //   responseType: 'arraybuffer'
      // }).then(res => {
      //   return 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      // }).then(data => {
      //   this.imgsrc = data
      // })
    },
    doSomething () {
      // console.log('通过emit子传父')
    }
  },
  activated () {
    this.getHomeMsg()
    this.searchNews()
  },
  created() {
    document.body.removeChild(document.getElementById('Loading'))
  }
}
</script>

<style scoped>
  .search-block{
    position: fixed;
    z-index: 99;
    width: 200px;
    top: 30px;
    left: 55%;
  }
  .index-wrap {
    width: 1300px;
    overflow: hidden;
  }
  .index-left {
    float: left;
    width: 300px;
    text-align: left;
    left: 130px;
  }
  .index-left h2{
    border-radius: 4px
  }
  .hot-list{
    cursor: pointer;
    display: flex;
    padding: 10px 0
  }
  .th{
    padding-right: 10px;
    font-weight: 600;
    font-style: italic
  }
  .th-0{
    color: rgb(238, 44, 18)
  }
  .th-1{
    color: rgb(238, 117, 18)
  }
  .th-2{
    color: rgb(238, 205, 18)
  }
  .hot-title{
    line-height: 1.5;
    font-size: 12px
  }
  .user-list{
    display: flex;
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  .user-list .user-img img{
    width: 60px;
    height: 60px;
    border-radius: 50%
  }
  .user-list .user-des{
    padding: 10px
  }
  .user-list .user-des span{
    color: #3F8FD2;
    font-size: 17px;
    line-height: 2
  }
  .user-list .user-des div{
    color: #7e7e7e;
  }
  .index-right {
    display: flex;
    flex-wrap: wrap;
    left: 450px;
    width: 1000px;
  }
  .index-right .img-block{
    display: flex;
    flex-wrap: wrap;
    width: 390px;
    margin-top: 14px;
    height: 280px;
  }
  .index-right .img-block .img-control{
    position: relative;
    padding: 2px
  }
  .index-right .img-block .img-control .img-wrap{
    cursor: pointer;
    opacity: 0.5;
    position: absolute;
    height: 136px;
    width: 190px;
    top: 2px;
    left: 2px;
    background: linear-gradient(to top, black, rgb(209, 208, 208));
  }
  .index-right .img-block .img-control .img-wrap:hover{
    opacity: 0.1;
  }
  .wrap-txt{
    position: absolute;
    opacity: 1;
    color: white;
    font-size: 18px;
    left: 20px;
    top:100px;
    z-index: 0;
    width:168px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
  .wrap-txt:hover{
    cursor: pointer;
    color: rgb(34, 185, 255)
  }
  .index-right .img-block .img-item{
    width: 190px;
    height: 136px;
  }
  .new-block {
    width: 100%;
    padding:20px 20px;
    background: #fff;
  }
  .new-list{
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15)
  }
  .new-img{
    width: 300px;
    height: 150px;
    overflow: hidden;
    margin-right: 20px;
    border-radius: 5px;
  }
  .new-img img{
    width: 300px;
    height: 150px;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.6s;
  }
  .new-img img:hover{
    transform: scale(1.2);
  }
  .new-content{
    width: 65%;
  }
  .new-content .new-title{
    font-size: 18px;
    font-weight: 600;
    color: #001b2c;
    padding-bottom: 20px;
  }
  .new-content .new-title span{
    transition: all 0.3s;
  }
  .new-content .new-title span:hover{
    cursor: pointer;
    color: #3F8FD2
  }
  .new-txt{
    width: 560px;
    font-size: 15px;
    color: #515a6e;
    height: 85px;
    margin-bottom: 15px;
    line-height: 2;
    margin-top: 10px;
    word-break:break-all;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:3;
    overflow:hidden;
  }
  .new-txt img{
    max-width: 560px;
  }
  .block-header{
    color: #3F8FD2;
    font-size: 21px;
    font-weight: 600;
    margin-bottom: 22px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15)
  }
  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding:15px
  }
  .index-left-block .hr {
    margin-bottom: 20px;
  }
  .index-left-block h2 {
    background: #3F8FD2;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }
  .index-left-block ul {
    padding: 10px 15px;
  }
  .index-left-block li {
    padding: 5px;
  }
  .index-board-list {
    overflow: hidden;
  }
  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }
  .index-board-car .index-board-item-inner{
    background: url(../assets/images/1.png) no-repeat;
  }
  .index-board-loud .index-board-item-inner{
    background: url(../assets/images/2.png) no-repeat;
  }
  .index-board-earth .index-board-item-inner{
    background: url(../assets/images/3.png) no-repeat;
  }
  .index-board-hill .index-board-item-inner{
    background: url(../assets/images/4.png) no-repeat;
  }
  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }
  .line-last {
    margin-right: 0;
  }
  .index-board-button {
    margin-top: 20px;
  }
  .hot-tag {
    background: red;
    color: #fff;
  }
  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .del {
    color:rgb(34, 103, 231);
    margin-left: 30px;
    cursor: pointer;
  }
</style>
