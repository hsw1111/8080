import * as types from '../mutation_types.js'
import staticRoute from '../../router/staticRoute.js'
const state = {  
  items:[],  
  isLoadRoutes: false,
  staticRoute  
}  
  
const mutations = {  
  [types.ADD_MENU] (state, authList) {
   if(authList.length===0){
     state.items = []
   }else{
      generateMenuItems(state,authList)

   }
  },  
  [types.LOAD_ROUTES] (state) {  
    state.isLoadRoutes = !state.isLoadRoutes  
  }  
}
const actions = {
  addMenu(context,item){
    context.commit(types.ADD_MENU,item)
  },
  loadRoutes(context){
    context.commit(types.LOAD_ROUTES)
  }
}
const menuitems = state => state.items
const  isLoadRoutes = state => state.isLoadRoutes    
const getters = {
  menuitems,
  isLoadRoutes
}
function generateMenuItems(state,authList){
  var arr = state.staticRoute[0].children
  var newArr = []
  for(var i=0;i<arr.length;i++){
    if(authList.indexOf(arr[i].auth.toString())!==-1){
        newArr.push(arr[i])
    }
  }
  var res = Object.assign({},state.staticRoute[0],{children:newArr})
  state.items = [res,state.staticRoute[1],state.staticRoute[2]]
  return
}
export default {
  state,
  mutations,
  actions,
  getters
}
