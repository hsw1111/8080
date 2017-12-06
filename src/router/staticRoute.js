// import login from '../pages/login/index.vue'
const login = resolve => require.ensure([], () => resolve(require('../pages/login/index.vue')), 'login')

// import index from '../pages/index/index.vue'
const index = resolve => require.ensure([], () => resolve(require('../pages/index/index.vue')), 'index')

// import pageIndex from '../pages/inner/pageIndex/index.vue'
const pageIndex = resolve => require.ensure([], () => resolve(require('../pages/inner/pageIndex/index.vue')), 'pageIndex')


// [ ====== partnerManager ====== ]
// import carManager from '../pages/inner/carManager/index.vue'
const carManager = resolve => require.ensure([], () => resolve(require('../pages/inner/carManager/index.vue')), 'carManager')

// import carUseDetail from '../pages/inner/carUseDetail/index.vue'
const carUseDetail = resolve => require.ensure([], () => resolve(require('../pages/inner/carUseDetail/index.vue')), 'carUseDetail')


// [ ====== consumeData ====== ]
// import consumeData from '../pages/inner/consumeData/index.vue'
const consumeData = resolve => require.ensure([], () => resolve(require('../pages/inner/consumeData/index.vue')), 'consumeData')

// import queryCharts from '../pages/inner/queryCharts/index.vue'
const queryCharts = resolve => require.ensure([], () => resolve(require('../pages/inner/queryCharts/index.vue')), 'queryCharts')

// import queryLists from '../pages/inner/queryLists/index.vue'
const queryLists = resolve => require.ensure([], () => resolve(require('../pages/inner/queryLists/index.vue')), 'queryLists')


// import allDaysData from '../pages/inner/alldaysData/index.vue'
const allDaysData = resolve => require.ensure([], () => resolve(require('../pages/inner/alldaysData/index.vue')), 'allDaysData')

// import hotMap from '../pages/inner/hotMap/index.vue'
const hotMap = resolve => require.ensure([], () => resolve(require('../pages/inner/hotMap/index.vue')), 'hotMap')

// import abnormalData from '../pages/inner/abnormalData/index.vue'
const abnormalData = resolve => require.ensure([], () => resolve(require('../pages/inner/abnormalData/index.vue')), 'abnormalData')


// [ ====== partnerManager ====== ]
// import partnerManager from '../pages/inner/partnerManager/index.vue'
const partnerManager = resolve => require.ensure([], () => resolve(require('../pages/inner/partnerManager/index.vue')), 'partnerManager')

// import addpartner from '../pages/inner/partnerManager/addpartner.vue'
const addpartner = resolve => require.ensure([], () => resolve(require('../pages/inner/partnerManager/addpartner.vue')), 'addpartner')

// import checkpartner from '../pages/inner/partnerManager/checkpartner.vue'
const checkpartner = resolve => require.ensure([], () => resolve(require('../pages/inner/partnerManager/checkpartner.vue')), 'checkpartner')


// import earningsDetail from '../pages/inner/earningsDetail/index.vue'
const earningsDetail = resolve => require.ensure([], () => resolve(require('../pages/inner/earningsDetail/index.vue')), 'earningsDetail')


// [ ====== settlementRecord ====== ]
// import settlementRecord from '../pages/inner/settlementRecord/index2.vue'
const settlementRecord = resolve => require.ensure([], () => resolve(require('../pages/inner/settlementRecord/index2.vue')), 'settlementRecord')

// import applyaccount from '../pages/inner/settlementRecord/applyaccount.vue'
const applyaccount = resolve => require.ensure([], () => resolve(require('../pages/inner/settlementRecord/applyaccount.vue')), 'applyaccount')

// import applysubmitted from '../pages/inner/settlementRecord/applysubmitted.vue'
const applysubmitted = resolve => require.ensure([], () => resolve(require('../pages/inner/settlementRecord/applysubmitted.vue')), 'applysubmitted')

// import settlementRecordDetail from '../pages/inner/settlementRecord/settlementRecordDetail.vue'
const settlementRecordDetail = resolve => require.ensure([], () => resolve(require('../pages/inner/settlementRecord/settlementRecordDetail.vue')), 'settlementRecordDetail')


// [ ====== accountManager ====== ]
// import accountManager from '../pages/inner/accountManager/index.vue'
const accountManager = resolve => require.ensure([], () => resolve(require('../pages/inner/accountManager/index.vue')), 'accountManager')

// import addaccount from '../pages/inner/accountManager/addaccount.vue'
const addaccount = resolve => require.ensure([], () => resolve(require('../pages/inner/accountManager/addaccount.vue')), 'addaccount')


// [ ====== memberCenter ====== ]
// import memberCenter from '../pages/inner/memberCenter/index.vue'
const memberCenter = resolve => require.ensure([], () => resolve(require('../pages/inner/memberCenter/index.vue')), 'memberCenter')

// import bindEamil from '../pages/inner/memberCenter/bindEamil.vue'
const bindEamil = resolve => require.ensure([], () => resolve(require('../pages/inner/memberCenter/bindEamil.vue')), 'bindEamil')

// import updateEmail from '../pages/inner/memberCenter/updateEmail.vue'
const updateEmail = resolve => require.ensure([], () => resolve(require('../pages/inner/memberCenter/updateEmail.vue')), 'updateEmail')

// import bindTel from '../pages/inner/memberCenter/bindTel.vue'
const bindTel = resolve => require.ensure([], () => resolve(require('../pages/inner/memberCenter/bindTel.vue')), 'bindTel')

// import updateTel from '../pages/inner/memberCenter/updateTel.vue'
const updateTel = resolve => require.ensure([], () => resolve(require('../pages/inner/memberCenter/updateTel.vue')), 'updateTel')

// import amendPassword from '../pages/inner/memberCenter/amendPassword.vue'
const amendPassword = resolve => require.ensure([], () => resolve(require('../pages/inner/memberCenter/amendPassword.vue')), 'amendPassword')


// [ ====== roleManager ====== ]
// import roleManager from '../pages/inner/roleManager/index.vue'
const roleManager = resolve => require.ensure([], () => resolve(require('../pages/inner/roleManager/index.vue')), 'roleManager')

// import addrole from '../pages/inner/roleManager/addrole.vue'
const addrole = resolve => require.ensure([], () => resolve(require('../pages/inner/roleManager/addrole.vue')), 'addrole')


// import messageCenter from '../pages/inner/messageCenter/index.vue'
const messageCenter = resolve => require.ensure([], () => resolve(require('../pages/inner/messageCenter/index.vue')), 'messageCenter')

// [ ====== logManager ====== ]
// import logManager from '../pages/inner/logManager/index.vue'
const logManager = resolve => require.ensure([], () => resolve(require('../pages/inner/logManager/index.vue')), 'logManager')

// import loginlog from '../pages/inner/logManager/loginlog.vue'
const loginlog = resolve => require.ensure([], () => resolve(require('../pages/inner/logManager/loginlog.vue')), 'loginlog')

// import operationLog from '../pages/inner/logManager/operationLog.vue'
const operationLog = resolve => require.ensure([], () => resolve(require('../pages/inner/logManager/operationLog.vue')), 'operationLog')


// import NotFoundPage from '../pages/404/index.vue'
const NotFoundPage = resolve => require.ensure([], () => resolve(require('../pages/404/index.vue')), 'NotFoundPage')

// import stautsError from '../pages/500/index.vue'
const stautsError = resolve => require.ensure([], () => resolve(require('../pages/500/index.vue')), 'stautsError')

export default [{
    path: '/',
    component: index,
    children: [{
        path: '/system/office',
        name: '首页',
        auth: 1100,
        component: pageIndex
      },
      {
        path: '/index/carManager',
        name: '车辆管理',
        auth: 1200,
        component: carManager
      },
      {
        path: '/index/earningsDetail',
        name: '订单明细',
        auth: 1401,
        component: earningsDetail
      },
      {
        path: '/index/consumeData',
        auth: 1301,
        component: consumeData,
        children: [{
            path: '/',
            name: '查看列表',
            component: queryLists
          },
          {
            path: '/index/consumeData/queryCharts',
            name: '查看统计图',
            component: queryCharts
          }
        ]
      },
     
      {
        path: '/index/settlementRecord',
        name: '结算记录',
        auth: 1402,
        component: settlementRecord
      },
      {
        auth: 1402,
        path: '/index/applyaccount',
        name: '申请结算(单月待结算)',
        component: applyaccount
      },
      {
        auth: 1402,
        path: '/index/applysubmitted/:id',
        name: '申请结算(结算状态)',
        component: applysubmitted
      },
      {
        path: '/index/memberCenter',
        auth: 1600,
        name: '个人中心',
        component: memberCenter,
        children: [{
            path: '/index/memberCenter/bindEamil',
            name: '绑定邮箱',
            component: bindEamil
          },
          {
            path: '/index/memberCenter/updateEmail',
            name: '修改邮箱',
            component: updateEmail
          },
          {
            path: '/index/memberCenter/bindTel',
            name: '绑定手机号',
            component: bindTel
          },
          {
            path: '/index/memberCenter/updateTel',
            name: '修改手机号',
            component: updateTel
          },
          {
            path: '/index/memberCenter/amendPassword',
            name: '修改密码',
            component: amendPassword
          }
        ]
      },
      {
        path: '/index/accountManager',
        name: '账号管理',
        auth: 1500,
        component: accountManager,
        children: [{
          path: '/index/accountManager/addaccount',
          name: '添加账号',
          component: addaccount
        }]
      },
   
      {
        path: '/index/roleManager',
        name: '角色管理',
        auth: 1700,
        component: roleManager,
        children: [{
          path: '/index/roleManager/addrole',
          name: '添加角色',
          component: addrole
        }]
      }
    ]
  },
  {
    auth: 1200,
    path: '/index/carManager/carUseDetail',
    name: '车辆明细',
    component: carUseDetail
  },
  {
    path: '/index/settlementRecord/detail',
    name: '结算记录明细',
    auth: 1402,
    component: settlementRecordDetail
  },
]
