<template>
    <header>
        <el-row>
            <el-col :span="24">
                <h2>
                    <img src="../assets/header/logo.jpg" alt="logo">
                </h2>
                <h3>城市合伙人管理平台<span>合肥</span></h3>
                <div class="admin">
                    <i class="icon iconfont icon-touxiang"></i>
                    <span class="username">管理员</span>
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
export default {
    data () {
        return {
            hidden:false
        }
    },
  methods: {
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
                console.log(code)
                if(code === 1){
                    that.$message({
                        type:'success',
                        message:message
                    })
                   this.$router.push('/login')
                   delCookie('userInfo')
                   localStorage.removeItem('userinfo')
                }else{
                    that.$message({
                        type:'error',
                        message:message
                    })
                }
                
            }
        })
    }
  }
}
</script>
<style scoped>
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
    margin-right: 5px;
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

