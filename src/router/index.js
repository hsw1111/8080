import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from './router-config.js'
import stautsError from '../pages/500/index.vue'
import {host} from '../config/index.js'
var initRouter = routeConfig
function assignRouter() {
    var userInfo = localStorage.getItem('userinfo') || '[]'
    var authList = JSON.parse(userInfo)
    var _index = null
    var obj = {}
    var arr = []
    authList.map((auth)=>{
      routeConfig[3].children.map((item)=>{
            if(auth*1 === item.auth){
                arr.push(item)
             }
        })
    })
    console.log(authList)
   if(authList.length===0){
       //{path:'/index/error',component:stautsError}
        routeConfig[3] = Object.assign({},routeConfig[3],{children:[{path:'/',component:stautsError}]})
    }else{
        routeConfig[3] = Object.assign({},routeConfig[3],{children:arr})
    }
    //routeConfig[3] = Object.assign({},routeConfig[3],{children:arr})
    routeConfig.splice(3,1, routeConfig[3])
}
assignRouter()

Vue.use(Router)
export default new Router({
    routes: routeConfig,
    mode: 'history'
})