import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from './router-config.js'


function assignRouter() {
    var userInfo = localStorage.getItem('userinfo')
    var authList = JSON.parse(userInfo)
    var _index = null
    var obj = {}
    var arr = []
    console.log(routeConfig)
    authList.map((auth)=>{
      routeConfig[3].children.map((item)=>{
            if(auth*1 === item.auth){
                arr.push(item)
             }
        })
    })
    console.log(authList)
   routeConfig[3] = Object.assign({},routeConfig[3],{children:arr})
   routeConfig.splice(3,1, routeConfig[3])
  //console.log(routeConfig)
}
assignRouter()

Vue.use(Router)
export default new Router({
    routes: routeConfig,
    mode: 'history'
})