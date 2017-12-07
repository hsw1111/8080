// import login from '../pages/login/index.vue'
const login = resolve => require.ensure([], () => resolve(require('../pages/login/index.vue')), 'login')
// import index from '../pages/index/index.vue'
const index = resolve => require.ensure([], () => resolve(require('../pages/index/index.vue')), 'index')

// import NotFoundPage from '../pages/404/index.vue'
const NotFoundPage = resolve => require.ensure([], () => resolve(require('../pages/404/index.vue')), 'NotFoundPage')

import MenuModule from '../store/modules/MenuModule.js'
export default [
    {
        path: '/login',
        name: '登录',
        component: login
    },
    // {
    //     path: '/',
    //     component: index,
    //     children: [{
    //             path: '/nofound',
    //             component: NotFoundPage,
    //             name:'notfound'
    //         }
    //     ]
    // },
    ...generateRoutesFromMenu(MenuModule.state.items)  
   
]
// Menu Should have 2 levels
function generateRoutesFromMenu(menu = [], routes = []){
   return routes
}
