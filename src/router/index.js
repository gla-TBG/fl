import Vue from 'vue'
import VueRouter from 'vue-router'

import DetailSpaPage from '../pages/detail/space'
import DetailIntPage from '../pages/detail/internet'
import DetailBraPage from '../pages/detail/brand'
import DetailCrePage from '../pages/detail/creative'
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '/home',
      component: resolve => require(['@/pages/index'], resolve)
    },
    {
      name: '/new_detail',
      path: '/new_detail',
      component: resolve => require(['@/pages/newDetail'], resolve)
    },
    {
      name: '/user',
      path: '/user',
      component: resolve => require(['@/pages/userPage'], resolve)
    },
    {
      name: '/admin',
      path: '/admin',
      component: resolve => require(['@/pages/adminPage'], resolve)
    },
    {
      name: '/detail',
      path: '/detail',
      component: resolve => require(['@/pages/detail'], resolve),
      children: [
        {
          name: 'internet',
          path: 'internet',
          component: DetailIntPage
        },
        {
          name: 'space',
          path: 'space',
          component: DetailSpaPage
        },
        {
          name: 'brand',
          path: 'brand',
          component: DetailBraPage
        },
        {
          name: 'creative',
          path: 'creative',
          component: DetailCrePage
        }
      ]
    }
  ]
})
