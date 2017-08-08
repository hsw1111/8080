<template>
  <div style="position: relative;">
      <div v-title>报表管理-消费数据-统计图</div>
      <div class="my_noDate" style="position: absolute; min-height:40px; height: 40px;" v-show="noData">
        <img src="../assets/img/2.png" />
        <p>暂无数据</p>
      </div>
      <div id="container" style="position: relative;"></div>
  </div>
</template>
<script>
  var Highcharts = require('highcharts')
  // 在 Highcharts 加载之后加载功能模块
  require('highcharts/modules/exporting')(Highcharts)
  import request from 'superagent'
  import moment from 'moment'
  import {host} from '../config/index'
  // import Vue from 'vue'
  export default {
    data () {
      return {
        x_data: [],
        orderNumber: [],
        consumeMoney: [],
        noData: false
      }
    },
    mounted: function () {
      var type = this.$store.state.consumeDataType
      if (this.$store.state.consumeData.length === 0) {
        request
          .post(host + 'franchisee/report/consume/' + type)
          .send({
            'franchiseeId': '123456',
            'userId': 'admin'
          })
          .end((error, res) => {
            // console.log('this is entry')
            if (error) {
              console.log('error:', error)
              this.noData = true
            } else {
              if (JSON.parse(res.text).list.length === 0) {
                $('#container').html('')
                this.noData = true
              } else {
                this.noData = false
                var arr = JSON.parse(res.text).list
                var newArr = []
                for (var i = 0; i < arr.length; i++) {
                  var obj = {}
                  if(type==='day'){
                      obj.time = moment(arr[i].time).format('YYYY年MM月DD号') 
                  }else if(type==='week'){
                     obj.time = moment(arr[i].time).format('YYYY年第WW周')
                  }else{
                     obj.time = moment(arr[i].time).format('YYYY年MM月')
                  }
                  obj.totalBill = arr[i].totalBill
                  obj.money = arr[i].money
                  newArr.push(obj)
                }

                this.$store.dispatch('consumeData_action', {newArr})
                this.getChartDate()
                this.createChartsShap()
              }
            }
          })
      } else {
        this.getChartDate()
        this.createChartsShap()
        return
      }
    },
    methods: {
      createChartsShap () {
         // 创建图表
        Highcharts.chart('container', {
          /** Highcharts 配置 */
          lang: {
            printChart: '打印图表',
            contextButtonTitle: '图表导出菜单',
            decimalPoint: '.',
            downloadJPEG: '下载JPEG图片',
            downloadPDF: '下载PDF文件',
            downloadPNG: '下载PNG文件',
            downloadSVG: '下载SVG文件'
          },
          chart: {
            type: 'column',
            backgroundColor: 'rgba(255,255,255,0)'                        // 指定图表的类型，默认是折线图（line）
          },
          title: {
            text: ''                 // 指定图表标题
          },
          xAxis: {
            categories: this.x_data,
            crosshair: true
          },
          yAxis: {
            title: {
              text: ''
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          credits: {
            enabled: true,
            text:"北京蜜蜂出行科技有限公司",  
            href: "http://www.mmuu.com" 
          },
          exporting:{  
            enabled: false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示  
          },  
          legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            borderWidth: 0
          },
          series: [
            {
              name: ' ',
              color: '#996600',
              data: this.orderNumber,
              tooltip: {
                valueSuffix: '单',
                useHTML: true,
                headerFormat: '<span style="font-size: 12px">日期: {point.key}</span><br/>',
                pointFormatter: function () {
                  return '<span style="color:{' + this.series.color + '}"></span>单数: <b>' + this.y + '</b>'
                }
              }
            },
            {
              name: ' ',
              color: '#00cdcd',
              data: this.consumeMoney,
              tooltip: {
                valuePrefix: '￥',
                useHTML: true,
                headerFormat: '<span style="font-size: 12px">日期: {point.key}</span><br/>',
                pointFormatter: function () {
                  return '<span style="color:{' + this.series.color + '}"></span>金额: <b>￥' + this.y + '</b>'
                }
              }
            }
          ]

        })
      },
      getChartDate () {
        console.log(this.$store.state.consumeData)
        var res = this.$store.state.consumeData.map((item) => {
          return item.time
        })

        var order = this.$store.state.consumeData.map((item) => {
          return item.totalBill
        })

        var allMoney = this.$store.state.consumeData.map((item) => {
          return item.money
        })
        this.x_data = res
        this.orderNumber = order
        this.consumeMoney = allMoney
      },
      getChartByRoute (arr) {
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
      dataUpdate () {
        var flag = true
        if (this.$route.query.type === undefined) {
          return
        } else if (flag === true) {
          request
            .post(host + 'franchisee/report/consume/' + this.$route.query.type)
            .send({
              'franchiseeId': '123456',
              'userId': 'admin'
            })
            .end((error, res) => {
              // console.log('this is entry')
              if (error) {
                console.log('error:', error)
              } else {
                // console.log(res)
                // console.log(JSON.parse(res.text))
                if (JSON.parse(res.text).list.length === 0) {
                  $('#container').html('')
                  this.noData = true
                } else {
                  this.noData = false
                  var arr = JSON.parse(res.text).list
                  var newArr = []
                  for (var i = 0; i < arr.length; i++) {
                    var obj = {}
                    obj.time = moment(arr[i].time).format('YYYY-MM-DD')
                    obj.totalBill = arr[i].totalBill
                    obj.money = arr[i].money
                    newArr.push(obj)
                  }

                  this.getChartByRoute(newArr)
                  this.createChartsShap()
                  flag = false
                }

              }
            })
        } else {
          return
        }
      },
      time () {
        if (this.$store.state.timeline.length === 0) {
          return
        } else { 
          var type
          if (this.$route.query.type === 'day') {
            type = 0
          } else if (this.$route.query.type === 'week') {
            type = 1
          } else {
            type = 2
          }
            request
              .post(host + 'franchisee/report/consume/userDefine')
              .send({
                'franchiseeId': '123456',
                'userId': 'admin',
                'start': this.$store.state.timeline.newObj.time1,
                'end': this.$store.state.timeline.newObj.time2,
                'type': type
              })
              .end((error, res) => {
                if (error) {
                  console.log('error:', error)
                } else {
                  if (JSON.parse(res.text).list.length === 0) {
                    $('#container').html('')
                    this.noData = true
                  } else {
                    this.noData = false
                    var arr = JSON.parse(res.text).list
                    var newArr = []
                    for (var i = 0; i < arr.length; i++) {
                      var obj = {}
                      obj.time = moment(arr[i].time).format('YYYY-MM-DD')
                      obj.totalBill = arr[i].totalBill
                      obj.money = arr[i].money
                      newArr.push(obj)
                    }
                    this.getChartByRoute(newArr)
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
    beforeMount () {
      this.time()
    },
    watch: {
      '$route': 'dataUpdate',
      '$store.state.timeline': 'time'
    }
  }
</script>
<style>
  div#container g.highcharts-legend-item{display:none;}
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
