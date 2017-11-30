<template>
  <div style="position: relative;">
      <div v-title>报表管理-消费数据-走势图</div>
      <div class="my_noDate" style="position: absolute; min-height:40px; height: 40px;" v-show="noData">
        <img src="../assets/img/1.png" />
        <p>暂无数据</p>
      </div>
      <div id="container" style="position: relative;"></div>
  </div>
</template>
<script>
  import request from 'superagent'
  import HighchartsNoData from 'highcharts-no-data-to-display'
  import { host } from '../config/index'
  var Highcharts = require('highcharts')
  // 在 Highcharts 加载之后加载功能模块
  require('highcharts/modules/exporting')(Highcharts)
  export default {
    data () {
      return {
        orderlist: '',
        moneyList: '',
        noData: false
      }
    },
    mounted: function () {
      request
        .post(host + 'franchisee/report/get24HourTrend?type=' + this.$route.query.type)
        .send({
          "account": {
            'franchiseeId': '123456',
            'userId': 'admin'
          },
        })
        .end((err, res) => {
          if (err) {
            console.log('err:' + err)
            this.noData = true
          } else {
            if (res.text === '') {
              $('#container').html('')
              this.noData = true
            } else {
              var data = JSON.parse(res.text)
              this.getChartByRoute(data)
              this.initHighCharDate()
            }
          }
        })
    },
    methods: {
      initHighCharDate () {
          // Highcharts.setOptions({
          //     lang: {
          //         noData: '暂无数据'
          //     }
          // }),
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
            credits: {
              enabled: true,
              text:"北京蜜蜂出行科技有限公司",  
              href: "http://www.mmuu.com" 
            },
            exporting:{  
              enabled: false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示  
            },  
            chart: {
              type: 'line'                           // 指定图表的类型，默认是折线图（line）
            },
            title: {
              text: ''              // 指定图表标题
            },
            // noData: {
            //   style: {
            //       fontWeight: 'bold',
            //       fontSize: '15px',
            //       color: '#303030'
            //   }
            // },
            xAxis: {
              categories: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
              lables:{
                step: 1
              }
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
                data: this.moneyList,
                tooltip: {
                  valueSuffix: '单',
                  useHTML: true,
                  headerFormat: '<span style="font-size: 12px">时间： {point.key}</span><br/>',
                  pointFormatter: function () {
                    return '<span style="color:{' + this.series.color + '}"></span>单数: <b>' + this.y + '</b>'
                  }
                }
              },
              {
                name: ' ',
                color: '#00cdcd',
                data: this.orderlist,
                tooltip: {
                  valuePrefix: '￥',
                  useHTML: true,
                  headerFormat: '<span style="font-size: 12px">时间： {point.key}</span><br/>',
                  pointFormatter: function () {
                    return '<span style="color:{' + this.series.color + '}"></span>金额: <b>￥' + this.y + '</b>'
                  }
                }
              }
            ]

          })
      },
      getChartByRoute (arr) {
        var money = arr.map((item) => {
          return item.money
        })

        var order = arr.map((item) => {
          return item.totalBill
        })

        this.orderlist = money
        this.moneyList = order
      },
      dataUpdate () {
        request
          .post(host + 'franchisee/report/get24HourTrend?type=' + this.$route.query.type)
          .send({
            "account": {
              'franchiseeId': '123456',
              'userId': 'admin'
            },
            "date": this.$route.query.date
          })
          .end((error, res) => {
            if (error) {
              console.log('error:', error)
            } else {
              if (res.text === '') {
                $('#container').html('')
                this.noData = true
                return
              } else {
                var data = JSON.parse(res.text)
                this.getChartByRoute(data)
                this.initHighCharDate()
              }
            }
          })
      }
    },
    beforeUpdate () {
      this.dataUpdate()
    },
    watch: {
      '$route': 'dataUpdate'
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
