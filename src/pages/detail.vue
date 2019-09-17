<template>
  <div class="detail-wrap">
    <div class="detail-left" style="margin-top:90px;position: fixed;">
      <div class="product-board">
        <img class="img-sty" :src="productIcon">
        <ul>
          <router-link v-for="item in products" :key="item.id" class="nav-sty"
                       :to="{ path: item.path }" tag="li" active-class="active">
            {{ item.name }}
          </router-link>
          <!-- <li class="silde-nav" v-for="item in products" :key="item.id" @click="moveTo(item.path)">{{item.name}}</li> -->
        </ul>
      </div>
    </div>
    <div class="detail-right" style="margin-top:90px;margin-left: 220px;">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowPage: '',
      products: [
        {
          name: '社会',
          path: 'creative',
          active: false
        },
        {
          name: '体育',
          path: 'space',
          active: false
        },
        {
          name: '财经',
          path: 'brand',
          active: false
        },
        {
          name: '科技',
          path: 'internet',
          active: false
        }
      ],
      imgMap: {
        '/detail/internet': require('../assets/images/4.png'),
        '/detail/brand': require('../assets/images/3.png'),
        '/detail/space': require('../assets/images/2.png'),
        '/detail/creative': require('../assets/images/1.png')
      }
    }
  },
  computed: {
    productIcon () {
      return this.imgMap[this.$route.path]
    }
  },
  methods: {
    moveTo (obj) {
      this.$router.push({
        name: obj
      })
    // console.log(this.$route.name)
    this.nowPage = this.$route.name
    }
  },
  activated () {
    // console.log(this.$route.path)
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
  .detail-left {
    float: left;
    width: 200px;
    text-align: center;
  }
  .detail-left .nav-sty {
    text-align: center;
    line-height: 35px;
    font-size: 15px
  }
  .detail-right {
    display: flex;
    width: 1060px;
    float: left;
    margin-left: 20px;
    margin-right: 20px;
  }
  .product-board {
    background-color: #fff;
    padding: 20px 0;
  }
  .product-board ul {
    margin-top: 20px;
  }
  .product-board ul .silde-nav{
    line-height: 30px;
    text-align: center;
    font-size: 14px;
  }
  .product-board li {
    text-align: left;
    padding: 10px 15px;
    cursor: pointer;
  }
  .product-board li.active {
    background-color: #3F8FD2;
    color: white;
    font-size: 22px;
  }
  .product-board li{
    transition: all 0.3s
  }
  .product-board li:hover {
    font-weight: bold;
    /* color: black; */
    background-color: #3F8FD2;
    color: white;
    font-size: 18px;
  }
  .product-board li a {
    display: block;
  }
  .sales-board {
    background-color: #fff;
  }
  .saales-board-intro h2 {
    font-size: 20px;
    padding: 20px;
  }
  .sales-board-intro p {
    background-color: #f7fcff;
    padding: 10px 20px;
    color: #999;
    line-height: 1.8;
  }
  .sales-board-form {
    padding: 30px 20px;
    font-size: 14px;
  }
  .sales-board-line {
    clear: both;
    padding: 20px;
  }
  .sales-board-line-left {
    display: inline-block;
    width: 100px;
  }
  .sales-board-line-right {
    display: inline-block;
    width: 75%;
  }
  .sales-board-des {
    border-top: 20px solid #f0f2f5;
    padding: 15px 20px;
  }
  .sales-board-des p {
    line-height: 1.6;
  }
  .sales-board-des h2 {
    font-size: 20px;
    padding-bottom: 15px;
  }
  .sales-board-des h3 {
    font-size: 18px;
    font-weight: bold;
    padding: 20px 0 10px 0;
  }
  .sales-board-des li  {
    padding: 5px 0;
  }
  .sales-board-table {
    width: 100%;
    margin-top: 20px;
  }
  .sales-board-table th {
    background-color: #3F8FD2;
    color: white;
  }
  .sales-board-table td {
    border: 1px solid #f0f2f5;
    padding: 15px;
  }
  .sales-board .sales-board-intro h2 {
    font-size: 30px;
    padding: 20px;
  }
  .img-sty{
    width: 100px;
    height: 100px;
  }
  .new-content-p{
    padding-right: 80px;
    height: 70px;
    font-size: 15px!important;
    margin-top: 15px;
  }
  .new-content-p img{
    max-width: 760px;
  }
</style>
