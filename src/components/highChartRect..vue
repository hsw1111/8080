<template>
  <div style="position: relative;">
    <div v-title>报表管理-消费数据-统计图</div>
    <div class="my_noDate" style="position: absolute; min-height:40px; height: 40px;" v-show="noData">
      <img src="../assets/img/2.png" />
      <p>暂无数据</p>
    </div>
    <div id="container" style="position: relative;" v-show="!noData"></div>
  </div>
</template>
<script>
var Highcharts = require('highcharts')
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts)
import request from 'superagent'
import moment from 'moment'
import { host } from '../config/index'
import $ from 'jquery'
import {mapGetters} from 'vuex'
// import Vue from 'vue'
export default {
  computed:{
    ...mapGetters(['cityId'])
  },
  data() {
    return {
      x_data: [],
      orderNumber: [],
      consumeMoney: [],
      noData: false
    }
  },
  mounted: function() {
   this.loadData()
  },
  methods: {
    loadData(){
      var that = this
    document.title = "统计图表"
    var type = this.$store.state.users.consumeDataType
    request
      .post(host + 'beepartner/franchisee/statistics/franchiseeStatistics')
      .withCredentials()
      .set({
        'content-type': 'application/x-www-form-urlencoded'
      })
      .send({
        'startTimeStr': this.$store.state.users.timeline.startTime,
        'endTimeStr': this.$store.state.users.timeline.endTime,
        'type': type,
        showType: 'chart',
        currentPage: 1,
        cityId:this.cityId
      })
      .end((error, res) => {
        if (error) {
          console.log('error:', error)
          that.noData = true
        } else {
          var len = (JSON.parse(res.text).data||[]).length

          if (len === 0) {
            $('#container').html('')
            that.noData = true
          } else {
            that.noData = false
            var arr = JSON.parse(res.text).data
            that.$store.dispatch('consumeData_action', arr)
            that.getChartDate()
            that.createChartsShap()
          }
        }
      })
    },
    createChartsShap() {
      // 创建图表
      // Highcharts.chart('container', {
      //   /** Highcharts 配置 */
      //   lang: {
      //     printChart: '打印图表',
      //     contextButtonTitle: '图表导出菜单',
      //     decimalPoint: '.',
      //     downloadJPEG: '下载JPEG图片',
      //     downloadPDF: '下载PDF文件',
      //     downloadPNG: '下载PNG文件',
      //     downloadSVG: '下载SVG文件'
      //   },
      //   chart: {
      //     type: 'column',
      //     backgroundColor: 'rgba(255,255,255,0)'                        // 指定图表的类型，默认是折线图（line）
      //   },
      //   title: {
      //     text: ''                 // 指定图表标题
      //   },
      //   xAxis: {
      //     categories: this.x_data,
      //     crosshair: true
      //   },
      //   yAxis: [
      //     {
      //       title: {
      //         text: ''
      //       }
      //     }
      //   ],
      //   credits: {
      //     enabled: true,
      //     text:"北京蜜蜂出行科技有限公司",  
      //     href: "http://www.mmuu.com" 
      //   },
      //   exporting:{  
      //     enabled: false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示  
      //   },  
      //   legend: {
      //     layout: 'vertical',
      //     align: 'left',
      //     verticalAlign: 'top',
      //     borderWidth: 0
      //   },
      //   series: [
      //     {
      //       name: ' Employees',
      //       color: '#996600',
      //       data: this.orderNumber,
      //       tooltip: {
      //         valueSuffix: '单',
      //         useHTML: true,
      //         headerFormat: '<span style="font-size: 12px">日期: {point.key}</span><br/>',
      //         pointFormatter: function () {
      //           return '<span style="color:{' + this.series.color + '}"></span>单数: <b>' + this.y + '</b>'
      //         }
      //       }
      //     },
      //     {
      //       name: ' Profit',
      //       color: '#00cdcd',
      //       data: this.consumeMoney,
      //       tooltip: {
      //         valuePrefix: '￥',
      //         useHTML: true,
      //         headerFormat: '<span style="font-size: 12px">日期: {point.key}</span><br/>',
      //         pointFormatter: function () {
      //           return '<span style="color:{' + this.series.color + '}"></span>金额: <b>￥' + this.y + '</b>'
      //         }
      //       }
      //     }
      //   ]

      // })
      Highcharts.chart('container', {
        chart: {
          type: 'column'
        },
        title: {
          text: ' '
        },
        xAxis: {
          categories: this.x_data
        },
        yAxis: [{
          min: 0,
          title: {
            text: '单数'
          }
        }, {
          title: {
            text: '实际收益'
          },
          opposite: true
        }],
        credits: {
          enabled: true,
          text: "北京蜜蜂出行科技有限公司",
          href: "javascript:void(0)"
        },
        exporting: {
          enabled: false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示  
        },
         tooltip: {
            formatter: function() {
              if(this.point.series.name==='单数'){
                  return this.point.series.name + ":" + Highcharts.numberFormat(this.point.y, 0, "", ",") + '单'
              }else{
                return this.point.series.name + ":" + Highcharts.numberFormat(this.point.y, 2, ".", ",") + '元'
              }
              
            }
          },
        legend: {
          shadow: false
        },
        plotOptions: {
          column: {
            grouping: false,
            shadow: false,
            borderWidth: 0,
            maxPointWidth:30
          }
        },
        series: [{
          name: '单数',
          color: '#996600',
          data: this.orderNumber,
          pointPadding: 0.3,
          pointPlacement: -0.2
        }, {
          name: '实际收益',
          color: '#00cdcd',
          data: this.consumeMoney,
         
          pointPadding: 0.3,
          pointPlacement: 0.2,
          yAxis: 1
        }]
      });
    },
    getChartDate() {
      var len = this.$store.state.users.consumeData.length
      var data = this.$store.state.users.consumeData;
      if(len>12){
          var es = data.slice(0,12).reverse()
          var res = es.map((item) => {
            return item.statisticId
          })

          var order = es.map((item) => {
            return item.totalBill
          })

          var allMoney = es.map((item) => {
            return item.totalMoney
          })
           this.x_data = res
          this.orderNumber = order
          this.consumeMoney = allMoney
      }else{
           var es = data
          var res = es.map((item) => {
            return item.statisticId
          })

          var order = es.map((item) => {
            return item.totalBill
          })

          var allMoney = es.map((item) => {
            return item.totalMoney
          })
           this.x_data = res
          this.orderNumber = order
          this.consumeMoney = allMoney
      }
      
     
    },
    getChartByRoute(arr) {
      var res = arr.map((item) => {
        return item.time
      })

      var order = arr.map((item) => {
        return item.totalBill
      })

      var allMoney = arr.map((item) => {
        return item.money
      })
      this.$set(res, this.x_data)
      this.x_data = res
      this.orderNumber = order
      this.consumeMoney = allMoney
    },
    dataUpdate() {
      var flag = true
      if (this.$route.query.type === undefined) {
        return
      } else if (flag === true) {
        var type = this.$route.query.type
        request
          .post(host + 'beepartner/franchisee/statistics/franchiseeStatistics')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'startTimeStr': this.$store.state.users.timeline.startTime,
            'endTimeStr': this.$store.state.users.timeline.endTime,
            'type': type,
            showType: 'chart',
            currentPage: 1,
            cityId:this.cityId
          })
          .end((error, res) => {
            // console.log('this is entry')
            if (error) {
              console.log('error:', error)
              this.noData = true
            } else {
              if (JSON.parse(res.text).data.length === 0) {
                $('#container').html('')
                this.noData = true
              } else {
                this.noData = false
                var arr = JSON.parse(res.text).data
                this.$store.dispatch('consumeData_action', arr)
                this.getChartDate()
                this.createChartsShap()
                flag = true
              }
            }
          })
      } else {
        return
      }
    },
    time() {
      if (this.$store.state.users.timeline.length === 0) {
        return
      } else {
        request
          .post(host + 'beepartner/franchisee/statistics/franchiseeStatistics')
          .withCredentials()
          .set({
            'content-type': 'application/x-www-form-urlencoded'
          })
          .send({
            'startTimeStr': this.$store.state.users.timeline.startTime,
            'endTimeStr': this.$store.state.users.timeline.endTime,
            'type': this.$route.query.type,
            showType: 'chart',
            currentPage: 1,
            cityId:this.cityId
          })
          .end((error, res) => {
            // console.log('this is entry')
            if (error) {
              console.log('error:', error)
              this.noData = true
            } else {
              if (JSON.parse(res.text).data.length === 0) {
                $('#container').html('')
                this.noData = true
              } else {
                this.noData = false
                var arr = JSON.parse(res.text).data
                this.$store.dispatch('consumeData_action', arr)
                this.getChartDate()
                this.createChartsShap()
              }
            }
          })
      }
    }
  },
  // beforeUpdate () {
  //   if () {

  //   }
  //   this.dataUpdate()
  // },
  // beforeMount () {
  //   this.time()
  // },
  watch: {
    '$route': 'dataUpdate',
     'cityId':{
       handler:function(){
          this.loadData()
       },
       deep:true
     },
    '$store.state.users.timeline': 'time'
  }
}
</script>
<style>
div#container g.highcharts-legend-item {
  display: none;
}

.my_noDate {
  width: 100%;
  text-align: center;
  font-size: 22px;
  color: rgba(243, 243, 245, 1);
  position: relative;
  text-align: center;
  /* left: 50%; */
}

.my_noDate img {
  display: inline-block;
  /* width: 500px;
    height: 200px; */
}

.my_noDate p {
  color: #ccc;
}
</style>
