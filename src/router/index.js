import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from './router-config.js'
import stautsError from '../pages/500/index.vue'
import {host} from '../config/index.js'


Vue.use(Router)
export default new Router({
    mode: 'hash',
    routes: routeConfig,
})