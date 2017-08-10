// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import './assets/font/iconfont.css'
import router from './router/index.js'
import store from './store/store'
import Vuex from 'vuex'
import $ from 'jquery'
import request from 'superagent'
import  {host} from './config/index.js'
import {getCookie,setCookie,delCookie} from '../utils/index'
// const VueResourceProgressBarInterceptor = require('vue-resource-progressbar-interceptor')

// Vue.use(VueResourceProgressBarInterceptor)

Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.innerText
        el.remove()
    }
})

// Vue.interceptors.push((request, next) => {
//   console.log(this)

//   request.method = 'POST'
//   　　next((response) => {
//   　　response.body = '...'
//   　  return response
//   })
// })

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(Vuex)

new Vue({
    store,
    el: '#app',
    router,
    render: h => h(App),
    methods:{
        checkInput(){
            var input = $('input.el-pagination__editor')
            if(input){
              input.prop('type','text')
            }
        },
        checkoutSeesion(){
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
                    } else {
                        var message = JSON.parse(res.text).message
                        console.log(message)
                        if(message === '用户登录超时'){
                            var urlRegex = /^((https|http|ftp|rtsp|mms)?:\/\/)(localhost:8080)$/
                            var result = urlRegex.test(window.location.href)
                            console.log(result)
                            if(!result){
                               console.log('session out')
                               this.$router.push('/')
                            }else{
                                return false
                            }
                        }else{
                            return
                        }
                    }
                })
        }
    },
    mounted () {
        this.checkInput()
    },
    beforeUpdate:function(){
       this.checkoutSeesion()
       //this.checkLogin()
    }
     // watch: {
    //   '$route': 'checkLogin'
    // }
})