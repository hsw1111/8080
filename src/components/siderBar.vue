<template>
  <div class="theme">
    <div class="siderBar">
      <el-menu default-active="2" class="el-menu-vertical-demo" :router="true" :unique-opened="true">
        <el-menu-item index="/index" class="sign" name="1100">
          <i class="iconfont my_icon_class">&#xe608;</i>首页
        </el-menu-item>
        <el-menu-item index="/index/carManager" class="sign" name="1200"                           >
          <i class="iconfont my_icon_class">&#xe613;</i>车辆管理</el-menu-item>
           <el-menu-item index="/index/earningsDetail?type=getRevenueCurDay" class="sign" name="1401"><i class="iconfont my_icon_class">&#xe6e0;</i>订单明细</el-menu-item>
          
        <el-submenu index="3" class="sign" name="1300">
          <template slot="title">
            <i class="iconfont my_icon_class">&#xe67d;</i>报表统计</template>
          <el-menu-item-group>
            <el-menu-item index="/index/consumeData?type=day" class="sign" name="1301">订单数据</el-menu-item>
            <!-- <el-menu-item index="/index/allDaysData?type=0" class="sign" name="1302">24小时数据走势</el-menu-item>
            <el-menu-item index="/index/hotMap?type=curHour" class="sign" name="1303">热力图</el-menu-item> -->
            <!-- <el-menu-item index="/index/abnormalData" class="sign" name="1304">异常数据</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/index/settlementRecord" class="sign" name="1402"><i class="iconfont my_icon_class">&#xe67d;</i>结算管理</el-menu-item>
         <el-menu-item index="/index/memberCenter" class="sign" name="1600">
          <i class="iconfont my_icon_class">&#xe611;</i>个人中心</el-menu-item>
        <!-- <el-menu-item index="/index/partnerManager" class="sign" name="2000">
          <i class="iconfont my_icon_class">&#xe623;</i>合伙人管理</el-menu-item> -->
        <!-- <el-submenu index="5" class="sign" name="1400">
          <template slot="title">
            <i class="iconfont my_icon_class">&#xe6e0;</i>营收记录</template>
          <el-menu-item-group>
            <el-menu-item index="/index/earningsDetail?type=getRevenueCurDay" class="sign" name="1401">收益明细</el-menu-item>
            <el-menu-item index="/index/settlementRecord" class="sign" name="1402">结算记录</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
        <el-menu-item index="/index/accountManager" class="sign" name="1500">
          <i class="iconfont my_icon_class">&#xe607;</i>账号管理</el-menu-item>
        <el-menu-item index="/index/roleManager" class="sign" name="1700">
          <i class="iconfont my_icon_class">&#xe610;</i>角色管理</el-menu-item>
        <!-- <el-menu-item index="/index/messageCenter" class="sign" name="1800">
          <i class="iconfont my_icon_class">&#xe624;</i>消息中心</el-menu-item>
        <el-submenu index="10" class="sign" name="1900">
          <template slot="title">
            <i class="iconfont my_icon_class">&#xe603;</i>日志管理</template>
          <el-menu-item-group>
            <el-menu-item index="/index/logManager" class="sign" name="1901">登录日志</el-menu-item>
            <el-menu-item index="/index/logManager/operationLog" class="sign" name="1902">操作日志</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
      </el-menu>
    </div>
  </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        data () {
          return {
            userInfo: '',
            authList: []
          }
        },
        mounted: function () {
            this.handlerUserInfo()
           this.checkMenu(this.authList)
        },
        methods: {
          checkMenu (authList) {
              var all  = $('.sign')
              for(var i =0;i<all.length;i++){
                var res = authList.indexOf(all[i].getAttribute('name'))
                if(res === -1) {
                  $('.sign').eq(i).hide()
                }
              } 
          },
          handlerUserInfo () {
            this.userInfo = localStorage.getItem('userinfo')
            this.authList = JSON.parse(this.userInfo).auth.split('-')
          }
        }
    }
</script>
<style>
div.theme {
  padding: 30px 0 0 20px;
}

.my_icon_class {
  margin-right: 5px;
  font-size: 18px;
}

.el-menu {
  border-radius: 2px;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff;
}

.el-submenu .el-menu {
  background: #fff;
}

div.siderBar {
  height: 945px;
  background: #fff;
}

.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
.el-menu-item.is-active {
  color: #fff;
  background: #cecece;
  border-left: 3px solid #fced4a;
}

.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
 
.el-menu-item, .el-submenu__title {
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    color: #999999;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    /*transition: border-color .3s,background-color .3s,color .3s;*/
    box-sizing: border-box;
    white-space: nowrap;
}


.el-menu-item, .el-submenu__title li i {
  color: #999999;
}
.el-menu-item-group__title{display: none}
/*
div.el-submenu__title li i.el-icon-menu {
  color: #999999 !important;
}*/
</style>

