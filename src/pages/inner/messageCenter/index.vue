<template>
  <div class="messageCenter">
    <el-row>
      <el-col>
        <el-button class="selectAll" id="msgCenterBtn" type="primary" @click="selectAll">全部设为已读</el-button>
      </el-col>
      <el-col>
        <el-table
          :data="tableData"
          style="width:100%"
          @cell-click = "handleClick"
        >
          <el-table-column
           label="标题"
           min-width="20%"
           label-class-name="tableTitle"
          >
            <template scope="scope">
              <span style="margin-left:-10px;" v-bind:class="{unRead:true,read:scope.row.isRead}"></span>
              <span class="title">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column
           label="消息内容"
           min-width="40%"
          >
            <template scope="scope">
                <span class="detail" ref="tdShow">{{scope.row.content}}</span>
                <span class="open" @click="showMordWords(scope.row)" v-show="scope.row.tdshow">{{scope.row.changeText}}</span>
            </template>
          </el-table-column>
          <el-table-column
           label="接收日期"
           prop="createTime"
           min-width="30%"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="10%"
          >
            <template scope="scope">
              <i v-bind:title='scope.row.isRead===0?"点击设置为已读":" "' v-bind:class='scope.row.isRead===0?"unread icon iconfont icon-xinfeng":"read icon iconfont icon-xinfeng"'></i>
            </template>
          </el-table-column>
        </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="totalItems"
      v-show="pageShow"
      >
    </el-pagination>
    </el-pagination>
      </el-col>
    </el-row>
    <!-- <div class="loginLog_page">
      <div class="M-box"></div>
    </div> -->
  </div>
</template>
<style scoped>
div.hasData{line-height: 60px;text-align: center;height: 60px;color:#9e9090;width: 100%;display:block;}
  div.messageCenter table{width:100%;border-collapse:collapse}
  div.messageCenter table tr th{text-align: left;border-bottom:2px solid #555;padding:15px 0 15px 10px;}
  div.messageCenter table tr td{padding:12px 10px;text-align: left;border-bottom: 1px dotted #555;color:#7b7272;font-size:14px;}
  div.messageCenter table tr td.showAllMessage{max-width:200px;overflow:hidden;font-size:14px;}
  div.messageCenter table tr td span.open{text-decoration: underline;color:#20a0ff;cursor:pointer;}
  div.messageCenter table tr td span.title{color:#7b7272;font-size:14px;}
  button.selectAll{margin-bottom:20px;}
  button#msgCenterBtn{ color: #fff;
    outline: none;
    border: none;
    /* border-radius: 4px; */
    background: rgba(52,52,67, 0.8);}
  div.messageCenter{padding: 20px 20px 0 30px;background:#fff;}
  span.unRead{width:18px;height:18px;border-radius:20px;background:#ecb042;display:inline-block;vertical-align: middle;margin-top: -2px;}
  span.read{background:transparent;opacity: 0}
  i.icon-xinfeng.read{cursor:default;color:gray}
  i.icon-xinfeng.unread{cursor:pointer;color:#f35000}
  .el-table th>.tableTitle{margin-left: 20px;}
  /* td.isread i {color:gray;cursor:default;} */
  div.el-pagination{padding-left:0;margin-top:20px;margin-bottom:10px;}
</style>
<script>
  import request from 'superagent'
  import $ from 'jquery'
  require('../../../assets/lib/js/jquery.pagination.js')
  import '../../../assets/css/pagination.css'
   import {checkPositiveNumber} from '../../../../utils/index.js'
   import {host} from '../../../config/index'
  import moment from 'moment'
  export default {
    data: function () {
      return {
        hasMsgData: true,
        msg_totalPage: '',
        msg_currentPage: 1,
        tableData: [],
        msgList: [],
        pageShow:false,
        totalItems:1,
        currentPage3:1,
      }
    },
    mounted: function () {
      var that = this
      request.post(host + 'franchisee/msg/getAllMsg')
      .send({
        franchiseeId: '123456',
        userId: 'jjjj'
      })
      .end(function(err, res){
        if (err) {
          console.log(err)
        } else {
          var arr = JSON.parse(res.text).list
          that.tableData = arr.map((item) => {
           return Object.assign({},item,{createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')},{isChecked: item.isRead===0?false: true},{unRead:true,read:item.isRead===0?false: true})
          })
          that.checkWordsLength()
          that.msg_totalPage = JSON.parse(res.text).totalPage || 20
          var len = JSON.parse(res.text).list.length
          if (that.msg_totalPage>1) {
              that.pageShow = true
          }else {
            that.pageShow = false
          }

          that.totalItems = JSON.parse(res.text).totalItems
        }
      })
    },
    watch: {
      currentPage3: {
        handler: function (val, oldVal) {
          var that = this
          request.post(host + 'franchisee/msg/getAllMsg?page=' + val)
            .send({
              franchiseeId: '123456',
              userId: 'jjjj'
            })
            .end(function (err, res) {
              if (err) {
                console.log(err)
              } else {
                var arr = JSON.parse(res.text).list
                that.tableData = arr.map((item) => {
                  return Object.assign({},item,{createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')},{isChecked: item.isRead===0?false: true},{unRead:true,read:item.isRead===0?false: true})
                })
                that.totalPage = JSON.parse(res.text).totalPage
                if(that.totalPage>1){
                  that.pageShow = true
                }else {
                  that.pageShow  = false
                }
                that.totalItems  = JSON.parse(res.text).totalItems
                that.checkWordsLength()
              }
            })
        },
        deep: true
      }
    },
    methods: {
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      showMordWords (msg) {
        var len = msg.prevHtml.length
        // 截取的字符串 content 暂存在temp中
        var temp = msg.content
        // 把msg的 content 还原
        msg.content = msg.prevHtml

        // 初始化数据 变成 temp截取的字符串
        msg.prevHtml = temp
        if (len > 31) {
          msg.changeText = '收起'
        } else {
          msg.changeText = '展开'
        }
      },
      checkWordsLength  () {
        this.tableData.map(function (item) {
          var len = item.content.length
          // 记录数据库中数据 
          item.prevHtml = item.content
          if (len > 30) {
            item.content = item.content.substr(0, 28) + '...'
            // 数据库中数据 超出 3行 则把数据 截取 赋值给content 此时 显示.... 展开按钮出来
            item.changeText = '展开'
            item.tdshow = true
          } else {
            item.tdshow = false
            item.changeText = '收起'
          }
        })
      },
      handleClick(row, column, cell, event){
        if(event.target.tagName==='I'){
          if(row.isRead===0){
            this.msgList.push({id:row.id})
            row.isRead=1
            request.post(host + 'franchisee/msg/read')
              .send({
                list: this.msgList
              })
              .end(function(error,res){
                if(error) {
                  console.log(error)
                }else {
                  console.log(res)
                }
              })
          }else {
            return false
          }
        }
      },
      selectAll () {
        var newArr = this.tableData.map((item)=>{
            var obj = Object.assign({},item,{isRead:1})
            return obj
        })
        this.tableData = newArr
        request.post(host + 'franchisee/msg/read')
          .send({
            list: newArr
          })
          .end(function(error,res){
            if(error) {
              console.log(error)
            }else {
              console.log(res)
            }
          })
      },
    }
  }
</script>


