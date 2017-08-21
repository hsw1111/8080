import Vue from 'vue'
import Vuex from 'vuex'
import MenuModule from './modules/MenuModule.js'
import UserModule from './modules/UserModule.js'
import * as types from './mutation_types.js'
Vue.use(Vuex)



const store = new Vuex.Store({
    modules:{
        users:UserModule,
        menus:MenuModule
    }
})
export default store