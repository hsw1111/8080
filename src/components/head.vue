<template>
    <header>
        <el-row>
            <el-col :span="24">
                <h2>
                    <img src="../assets/header/logo.jpg" alt="logo">
                </h2>
                <h3>城市合伙人管理平台<span>{{cityName}}</span></h3>
                <div class="admin">
                    <i v-show="isIconUrl" class="icon iconfont icon-touxiang"></i>
                     <img v-show="isImgShow" class="userIcon" :src="franchiseeUserIconUrl">
                    <span class="username">{{userName}}</span>
                    <i v-if="hidden" class="icon iconfont icon-xinfeng"></i>
                    <i class="icon iconfont icon-tuichu" @click="handleLoginOut"></i>
                </div>
            </el-col>
        </el-row>
    </header>
</template>
<script>
import request from 'superagent'
import {host} from '../config/index.js'
import {delCookie} from '../../utils/index'
import {mapActions, mapGetters } from 'vuex'  
export default {
    data () {
        return {
            hidden:false,
            isIconUrl:false,
            isImgShow:false
        }
    },
    computed:{
        ...mapGetters(['userName','cityName','franchiseeUserIconUrl'])
    },
  methods: {
    ...mapActions(['setUserName']),
    handleLoginOut () {
        var that = this
      request.post(host + 'beepartner/system/login/removeFranchiseeSession')
        .withCredentials()
        .set({
            'content-type': 'application/x-www-form-urlencoded'
        })
        .end((err,res)=>{
            if(err){
                console.log(err)
            }else{
                var code = JSON.parse(res.text).resultCode
                var message = JSON.parse(res.text).message
                if(code === 1){
                   window.sessionStorage.removeItem('permission')
                    window.sessionStorage.removeItem('authList')
                    window.sessionStorage.removeItem('userName')
                    window.sessionStorage.removeItem('franchiseeUser')
                    window.sessionStorage.removeItem('franchiseeUserIconUrl')
                   this.$router.push('/login') 
                }else{
                    that.$message({
                        type:'error',
                        message:message
                    })
                }
                
            }
        })
    }
  },
  mounted:function(){
      if(this.franchiseeUserIconUrl!=null){
          this.isIconUrl = false
          this.isImgShow = true
      }else{
          this.isIconUrl = true
          this.isImgShow = false
      }
  }
}
</script>
<style scoped>
img.userIcon{width: 30px;
    height: 30px;
    outline: none;
    border: none;
    float: left;
    margin-top: 20px;
    line-height: 0;
    border-radius: 30px;
    overflow: hidden;}
header {
    height: 65px;
    line-height: 65px;
    background: #4d4d4d;
    border-color: #e9ecf3;
    color: #fff;
}

header h2 {
    width: 120px;
    height: 65px;
    line-height: 65px;
    display:block;
    float: left;
    padding-left: 20px;
}

header h2 img {
    display: inline-block;
    margin-top: 10px;
    width: 100%;
    height: 42px;
}

header h3 {
    display: inline-block;
    padding-left: 20px;
    position: relative;
}

header h3>span {
    position: absolute;
    display: block;
    width: 40px;
    height: 20px;
    right: -50px;
    top: 4px;
    font-size: 12px;
}

div.admin {
    float: right;
    float: right;
    margin-right: 28px;
}

div.admin span.username {
    font-size: 14px;
    margin-right: 15px;
    margin-left:5px;
}

div.admin i.iconfont {
    font-size: 30px;
    vertical-align: middle;
    margin-right: 0;
    cursor: pointer;
}

div.admin i.iconfont.icon-xinfeng,
div.admin i.iconfont.icon-tuichu {
    font-size: 24px;
}

div.admin i.iconfont.icon-tuichu:hover {
    color: yellow;
}
</style>

