## 此项目是一个关于共享车辆加盟商查看自己经营范围内的车辆、订单及收益数据等的管理后台，主要运用框架与插件为vue+element-ui+highChart
### 架构介绍：
    src文件夹内为主要代码
    utils为封装的一些工具函数
    .babelrc为es6语法转换为es5语法
    .gitignore为git提交代码时忽略的文件
    .postcssrc.js为浏览器相关配置文件
    package.json文为项目相关依赖项和配置
    server.js为服务相关配置
    其余为webpack开发、生产等相关配置
### 模块分工（src内文件夹介绍）：
    api为各个接口ip
    assets内为各种静态资源
    components内为各种组件，部分可复用
    config为连接的服务器ip
    pages为各个主页面模块
    router配置路由
    store存储全局数据
    template为主html文件
    app.vue为主模块
### 项目启动：
    本地新建文件夹
    打开git
    克隆项目---->git clone https://github.com/hsw1111/8080.git
    安装依赖项---->npm install
    启动项目---->npm run start 
    项目打包---->npm run build
