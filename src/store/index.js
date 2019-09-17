import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginStatus: '',
    loginType: ''
  },
  mutations: {
    setLogType (state, msg) {
      state.loginType = msg
    },
    setLogStatus (state, msg) {
      state.loginStatus = msg
    }
  },
  actions: {
    //
  }
})
export default store
