// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
import store from './store/index'
import Layout from './components/layout'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import uploader from 'vue-ajax-upload'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.use(iView)
Vue.use(uploader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router: router,
  template: '<Layout/>',
  components: { Layout }
})
