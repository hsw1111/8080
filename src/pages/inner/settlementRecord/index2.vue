<template>
  <div class="container">
    <div class="wrap">
       <div v-show="remoteCityList.length>1">
           <span class="joinPlace" style="margin-top:5px">加盟区域</span>
           <city-list v-bind:joinCity="remoteCityList" v-on:listenToChildEvetn="showMsgFormChild"></city-list>
       </div>
        <div>
           <div class="inline subCount">
            累计已结算：<span>{{alreadyWidthDrawTimes}}</span>次
          </div>
				
          <div class=" inline subCount">
            累计获得收益：<span>{{new Number(alreadyWidthDrawMoney).thousandFormat()}}</span>元
          </div>
        </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
         v-loading="loading"
         element-loading-text="拼命加载中"
      >
        <el-table-column
            width="250"
           label="结算单周期"
        >
          <template slot-scope="scope">
            <span class="date">
               <router-link target="_blank" style="color:#0202ff;text-decoration:none;" v-bind:to="{path:'/index/settlementRecord/detail', query: {month:scope.row.withDrawMonth, wType: scope.row.wType, cityId: cityCodeList.join(),cityName:cityName}}"> {{scope.row.withDrawMonth}}</router-link>
             </span>
          </template>
        </el-table-column>
        <!-- <el-table-column
           prop="applyMoney"
           label="周期总收益(￥)"
        >
           <template scope="scope">
             <span class="profit">{{new Number(scope.row.totalProfit).thousandFormat()}}</span>
          </template>
        </el-table-column> -->
         <el-table-column
           prop="applyMoney"
           label="最终收益(￥)"
        >
           <template slot-scope="scope">
             <span class="profit">{{new Number(scope.row.applyMoney).thousandFormat()}}</span>
          </template>
        </el-table-column>
         <el-table-column
           prop="status"
           label="状态"
        >
          <template slot-scope="scope">
            <span :class="{wait:scope.row.statusName=='待确认'?true:false}">
             {{scope.row.statusName}}
            </span>
            
          </template>
        </el-table-column>
         <el-table-column
           label="操作"
        >
          <template slot-scope="scope">
            <div v-show="scope.row.statusName==='待确认'">
                <router-link target="_blank" :class="{active:scope.row.statusName==='待确认'?true:false,normal:scope.row.statusName==='待确认'?false:true}"  v-bind:to="{path:'/index/settlementRecord/detail', query: {month:scope.row.withDrawMonth, wType: scope.row.wType, cityId: cityCodeList.join(),cityName:cityName}}">确认结算</router-link>
            </div>
           <div v-show="scope.row.statusName!=='待确认'">
                <a :class="{active:scope.row.statusName==='待确认'?true:false,normal:scope.row.statusName==='待确认'?false:true}">确认结算</a>
            </div>
          </template>
        </el-table-column>
         <el-table-column
           prop="description"
           label="财务备注"
        >
           <template slot-scope="scope">
             <span class="profit">{{scope.row.description}}</span>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
        v-show="pageShow"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalItems">
      </el-pagination>
    </div>
  </div>
</template>
<script>
// import $ from 'jquery'
import request from 'superagent'
import { host } from '../../../config/index'
import cityList from '../../../components/cityList.vue'
import {mapGetters,mapActions} from 'vuex'

  export default {
    computed:{
      ...mapGetters(['confirmRecord'])
    },
    data(){
      return {
        cityCodeList:[],
        remoteCityList:[],
        loading:false,
        alreadyWidthDrawMoney:'',
        alreadyWidthDrawTimes:'',
        pageShow:false,
        currentPage3:1,
        totalItems:30,
        tableData: [],
        cityName:"",
      }
    },
    methods:{
      ...mapActions(['setConfirmRecord']),
       showMsgFormChild(data){
      // 子组件像父组件传值,目的是获取被选中的cityCode
      this.cityCodeList = data
      console.log(data)
    },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      loadData(currentPage){
         this.loading = true
         request
        .post(host + 'beepartner/franchisee/withDraw/findWithDraw')
        .withCredentials()
        .set({
          'content-type': 'application/x-www-form-urlencoded'
        })
        .send({
          cityId:this.cityCodeList.join(),
          currentPage:currentPage
        })
        .end((err, res) => {
           this.loading = false
          if (err) {
            console.log('err:' + err)
            this.loading = false
            this.emptyText = '暂无数据'
            this.pageShow = false
          } else {
            // loading 关闭
            this.loading = false
            var code = JSON.parse(res.text).resultCode
            if(code === -1){
              this.alreadyWidthDrawMoney = 0;
              this.alreadyWidthDrawTimes = 0;
              this.loading = false
            }
            if (code === 1) {
              this.loading = false;
              var newArr = JSON.parse(res.text).data
              // 获取当前城市名称
              
              this.cityName =  JSON.parse(res.text).data.length > 0? JSON.parse(res.text).data[0].cityName : ''
              this.alreadyWidthDrawMoney = JSON.parse(res.text).cityPartner?JSON.parse(res.text).cityPartner.alreadyWidthDrawMoney:0
              this.alreadyWidthDrawTimes = JSON.parse(res.text).cityPartner?JSON.parse(res.text).cityPartner.alreadyWidthDrawTimes:0
              this.tableData = newArr
              console.log("表格数据",this.tableData)
              // 页面总数
              var pageNumber = JSON.parse(res.text).totalPage
              // 总记录数
              this.totalItems = Number(JSON.parse(res.text).totalItems)
              this.totalPage = pageNumber
              if (pageNumber > 1) {
                this.pageShow = true
              } else {
                this.pageShow = false
                this.emptyText = ' 暂无数据'
              }
          
            }else{
              this.pageShow = false
              this.emptyText = ' 暂无数据'
              var newArr = []
              this.tableData = []
              
            }
          }
        })
      }
    },
    components:{
    cityList
  },
   created() {
    // 初始化调用查询可加盟城市的接口,动态渲染数据
    var that = this;
    request
      .post(host + "beepartner/franchisee/city/findCitysByCityPartner")
      .withCredentials()
      .set({
        "content-type": "application/x-www-form-urlencoded"
      })
      .end((error, res) => {
        if (error) {
          console.log(error);
        } else {
          var result = JSON.parse(res.text);
          var arr = result.data.map(list => {
            return { cityName: list.cityName, code: list.cityId, id: list.id };
          });
        
          this.remoteCityList = arr
        }
      });
      
  },
    mounted(){
  
       var cityId = this.$route.query.cityId
      setTimeout(()=>{
         this.remoteCityList.map((item)=>{
         if(item.code == cityId){
           var cityName = item.cityName
           $('.cityList ul li').each(function(index,item){
             var text = $(item).text()
             if(cityName==text){
              $(item).click()
             }
           })
         }
       })
      },200)
      var that = this;
      document.title="结算管理"
        $(".sign").removeClass('is-active')
      $('.sign[name="1402"]').addClass('is-active')
      const io = require('socket.io-client');
      const ws = io.connect("http://47.94.39.104:3000")
      ws.emit('join',{type:'index2'})
      ws.on('broadcast_join', function (data) {
            console.log(data.type);
            if(data.type=='detail'){
               that.loadData(that.currentPage3)
            }
        });
    },
    watch:{
      'cityCodeList':{
        handler:function(){
          this.loadData(1)
        },
        deep:true
      },
      'currentPage3':{
        handler:function(n,o){
          this.loadData(n)
        },
        deep:true
      },
      'confirmRecord':{
          handler:function(n,o){
            console.log(n)
          },
          deep:true
        }
    }
  }
</script>
<style lang="scss" scoped>
div.cityList{
  display: inline-block;
    margin-top: 4px;
    margin-left: 10px;
}
span.joinPlace{ height: 44px;
    line-height: 44px;
    float: left;
    width: 56px;
    text-align: right;
    margin-right: 1px;
    font-size: 14px;
    color: #555;
    }
  div.wrap{
    background:#faebd7;
    margin-bottom:20px;
    padding:20px;
    border: 1px solid #e7ecf1;
    div.inline{
      height:30px;
      display: inline-block;
      margin-right:40px;
      font-size: 14px;
      color: #555;
      line-height: 30px;
    }
  }
   div.table{
      padding:20px;
      background:#fff;
      font-family:'微软雅黑';
      border: 1px solid #e7ecf1;
      a.active{color:rgb(2, 2, 255);text-decoration:underline;}
      a.normal{color:rgb(228, 228, 228);text-decoration:none;cursor:default}
      span.date{color:#0202ff;}
      span.profit,span.canSettle,span.desc{color:#8c8c8c}
      span.wait{color:rgb(255, 204, 0);}
      i{font-style:normal}
      .el-pagination{padding:0;margin-top:20px;border-left:none;}
    }
   
</style>