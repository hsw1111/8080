// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import Element from 'element-ui'
import './assets/font/iconfont.css'
import router from './router/index.js'
import store from './store/store'
// import $ from 'jquery'
import request from 'superagent'
import {
  host
} from './config/index.js'
import {
  getCookie,
  setCookie,
  delCookie
} from '../utils/index'
import * as types from './store/mutation_types.js'
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
    el.remove()
  }
})
Vue.config.productionTip = false
Vue.use(Element)
let authList = window.localStorage.getItem('authList')
let permission = window.localStorage.getItem('permission')
let franchiseeUser = window.localStorage.getItem('franchiseeUser')
let franchiseeUserIconUrl = window.localStorage.getItem('franchiseeUserIconUrl')
if (authList) {
  store.commit(types.ADD_MENU, JSON.parse(authList))
  store.commit('updatLoginName', JSON.parse(franchiseeUser).userName)
  store.commit('updatCityName', JSON.parse(franchiseeUser).cityName)
  store.commit('updatefranchiseeUserIconUrl', franchiseeUserIconUrl)
  router.addRoutes(store.state.menus.items)
}

router.beforeEach((route, redirect, next) => {
  
  //next()

  if (route.path === '/login') {
    window.localStorage.removeItem('permission')
    window.localStorage.removeItem('authList')
    window.localStorage.removeItem('franchiseeUserIconUrl')
    window.localStorage.removeItem('franchiseeUser')
    window.localStorage.removeItem('name')
    store.commit(types.ADD_MENU, [])
  }
  var authList = window.localStorage.getItem('authList')
  if (!authList && route.path !== '/login') {
    next({
      path: '/login'
    })
  } else {
    if (route.name) {
      next()
      if ($('div.editcontainer').length > 0) {
        $("div.entryInner").animate({
          scrollTop: 0
        }, 500)
      }
    } else {
      next({
        path: '/system/office'
      })
    }
  }
})


new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App),
  methods: {
    checkInput() {
      var input = $('input.el-pagination__editor')
      if (input) {
        input.prop('type', 'text')
      }
    },
    checkoutSeesion() {
      request
        .post(host + 'beepartner/franchisee/Own/findFranchiseeUserOwn')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send()
        .end((err, res) => {
          if (err) {
            console.log('err2:' + err)
            //this.$router.push({path:'/index/error'})
          } else {
            var message = JSON.parse(res.text).message
            if (message === '用户登录超时') {
              this.$router.push('/login')
            } else {
              return
            }
          }
        })
    }
  },
  mounted() {
    this.checkInput()
    //this.checkoutSeesion()
  },
  beforeUpdate: function () {
    //this.checkoutSeesion()

  },
  watch: {
    '$route': 'checkoutSeesion'
  }
})
