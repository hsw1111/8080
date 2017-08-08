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
            
        }
    },
    mounted () {
        this.checkInput()
    }
     // watch: {
    //   '$route': 'checkLogin'
    // }
})