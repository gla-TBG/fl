<template>
  <div class="slide-show"  @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img" @click="toDetail(slides[nowIndex].id)">
      <!-- <a :href="slides[nowIndex].hrefUrl"> -->
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].newsPhoto">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].newsPhoto">
        </transition>
      <!-- </a> -->
    </div>
    <h2>{{ slides[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item, index) in slides" :key="index" @click="goto(index)">
        <a class="index-txt" :class="{on: index === nowIndex}">{{ index+1 }}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      // default: () => []
      required: true
    },
    inv: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return 3
      } else {
        return this.nowIndex - 1
      }
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
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
    goto (index) {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
        // this.$emit('onchange', index)
      }, 10)
    },
    runInv () {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
      }, this.inv)
    },
    clearInv () {
      clearInterval(this.invId)
    }
  },
  mounted () {
    // this.runInv()
  }
}
</script>

<style scoped>
  .slide-trans-enter-active {
     transition: all .5s;
  }
  .slide-trans-enter {
    transform: translateX(900px);
  }
  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }
  .slide-show {
    position: relative;
    margin: 15px 15px 15px 0;
    width: 590px;
    height: 280px;
    overflow: hidden;
  }
  .slide-show h2 {
    position: absolute;
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    background-color: #000;
    opacity: .5;
    bottom: 0;
    text-align: left;
    padding-left: 15px;
  }
  .slide-img {
    cursor: pointer;
    width: 100%;
  }
  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }
  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }
  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #ffffff;
  }
  .slide-pages li .index-txt{
    color: #fff!important;
  }
  .slide-pages li .on {
    text-decoration: underline;
  }
  .message {
    position: absolute;
    right: 0;
    width: 0;
    height: 0;
    border-top: 300px solid #3F8FD2;
    border-left: 300px solid transparent;
    opacity: .8;
  }
  .p1 {
    position: absolute;
    color: #fff;
    top: 30px;
    right: 35px;
    font-size: 60px;
  }
  .p2 {
    position: absolute;
    color: #fff;
    top: 100px;
    right: 15px;
    font-size: 60px;
  }
</style>
