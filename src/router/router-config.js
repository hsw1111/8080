import login from '../pages/login/index.vue'
import index from '../pages/index/index.vue'
import NotFoundPage from '../pages/404/index.vue'
import MenuModule from '../store/modules/MenuModule.js'
export default [
    {
        path: '/login',
        name: '登录',
        component: login
    },
    {
        path: '/',
        component: index,
        children: [{
                path: '/nofound',
                component: NotFoundPage,
                name:'notfound'
            }
        ]
    },
    ...generateRoutesFromMenu(MenuModule.state.items)  
   
]
// Menu Should have 2 levels
function generateRoutesFromMenu(menu = [], routes = []){
   return routes
}
