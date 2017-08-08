import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from './router-config.js'


function assignRouter() {
    var userInfo = localStorage.getItem('userinfo')
    var authList = JSON.parse(userInfo).auth.split('-')
    var _index = null
    var obj = {}
    var arr = []
    authList.map((auth)=>{
      routeConfig[2].children.map((item)=>{
            if(auth*1 === item.auth){
                arr.push(item)
             }
        })
    })
   routeConfig[2] = Object.assign({},routeConfig[2],{children:arr})
   routeConfig.splice(2,1, routeConfig[2])
  //console.log(routeConfig)
}
// assignRouter()

Vue.use(Router)
export default new Router({
    routes: routeConfig,
    mode: 'history'
})