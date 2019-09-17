<template>
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>科技</h2>
      <p>人类最早开始传播的一类新闻，就是生产中的新技术信息。科技新闻是人民群众了解改革开放成果、社会主义祖国建设成就及获取新的科学技术，以指导生产实践的重要渠道。</p>
    </div>
    <div v-if="newsList.length>0" class="sales-board-des" v-for="(item, index) in newsList" :key="index">
      <div class="block-news-item" @click="toDetail(item.id)">
        <div style="width:250px; margin-right:20px">
          <img v-if="item.newsPhoto" style="width:250px; height:150px; border-radius: 5px;" :src="item.newsPhoto">
          <img v-else style="width:250px; height:150px; border-radius: 5px;" src="@/assets/3.png">
        </div>
        <div style="width:80%">
          <h2 style="font-weight:800">{{item.title}}</h2>
          <h4>{{item.createTime}}</h4>
          <div class="new-content-p" v-html="item.content"></div>
        </div>
      </div>
    </div>
    <div class="no-works"  v-if="newsList.length<=0">
      <div class="no-txt">
        暂无该类新闻
      </div>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
import { getTypeNewsApi } from '@/api/news.js'

export default {
  data () {
    return {
      newsList: ''
    }
  },
  methods: {
    getNewsList () {
      getTypeNewsApi(4).then(res => {
        this.newsList = res.data.data.newlist
      })
    },
    toDetail (id) {
      this.$router.push({
        name: '/new_detail',
        params: {
          id: id
        }
      })
    }
  },
  activated () {
    this.getNewsList()
  }
}
</script>

<style>
  .sales-board{
    width: 100%;
  }
  .sales-board-form{
    padding:  0 62px
  }
  .buy-dialog-title {
    font-size: 16px;
    font-weight: bold;
  }
  .buy-dialog-btn {
    margin-top: 20px;
  }
  .buy-dialog-table {
    width: 100%;
    margin-bottom: 20px;
  }
  .buy-dialog-table th,
  .buy-dialog-table td {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 5px 0;
  }
  .buy-dialog-table th {
    background: #3F8FD2;
    color: #fff;
    border: 1px solid #3F8FD2;
  }
  .sales-board-line {
    padding-top:0px;
  }
  .block-news-item{
    display: flex;
  }
  .sales-board-des{
    cursor: pointer;
    transition: all 0.5s;
  }
  .sales-board-des:hover{
    /* transform: scale(1.01); */
    background: #83ccd69a;
  }
  .new-content-p {
    width: 100%;
    height: 80px;
    font: 400 18px "微软雅黑";
    line-height: 1.8;
    overflow: hidden;
  }
</style>
