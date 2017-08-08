<template>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template scoped>
<style>
   div#chart{width:100%;height:100%;}
</style>
<script>
  export default {
    methods: {
      paintCanvas () {
        var canvas = document.getElementById('chart')
        var canvasWrapWidth = canvas.parentElement.parentElement.offsetWidth
        var canvasWrapHeight = canvas.parentElement.parentElement.offsetHeight
        canvas.setAttribute('width', canvasWrapWidth)
        canvas.setAttribute('height', canvasWrapHeight)
        var width = canvas.width
        var height = canvas.height
        var cxt = canvas.getContext('2d')
        var space = 15
        var padding = 50
        var orderNum = [
          {
            time: '7',
            num: 9000
          },
          {
            time: '8',
            num: 4674
          },
          {
            time: '9',
            num: 2341
          },
          {
            time: '10',
            num: 2334
          },
          {
            time: '11',
            num: 567
          },
          {
            time: '12',
            num: 4332
          },
          {
            time: '13',
            num: 1222
          }
        ]
        var arcWidth = (width - padding * 2 - space * (orderNum.length - 1)) / orderNum.length
        var radix = Math.max.apply(null, orderNum.map((item) => item.num))
        var yAxis = orderNum.map((item) => item.num).sort((a, b) => { return a - b })
        cxt.beginPath()
        cxt.lineWidth = 1
        cxt.fillStyle = '#fff'
        cxt.strokeStyle = '#fff'
        // 画x 轴
        cxt.moveTo(padding - 10, height - padding + 0.5)
        cxt.lineTo(width - padding + 10, height - padding + 0.5)
        // 画y 轴
        cxt.moveTo(padding - 10, height - padding + 0.5)
        cxt.lineTo(padding - 10, padding / 2)
        cxt.stroke()
        cxt.closePath()
        // 画x轴刻度与值
        cxt.beginPath()
        cxt.lineWidth = 1
        cxt.strokeStyle = '#FFF'
        cxt.textAlign = 'center'
        var xLen = (width - padding * 2) / orderNum.length
        for (var j = 0; j < orderNum.length; j++) {
          var aAxis = orderNum[j].time
          cxt.moveTo(padding + xLen * (j + 1), height - padding)
          cxt.lineTo(padding + xLen * (j + 1), height - padding + 5)
          cxt.fillText(aAxis, padding + xLen * (j + 1) - arcWidth / 2, height - padding + 15)
        }
        cxt.stroke()
        cxt.closePath()
        // 画 y 轴刻度与值
        var yNumber = yAxis.length
        var yLength = Math.floor((height - padding * 2) / yNumber)
        for (var k = 0; k < yNumber; k++) {
          var ylen = yLength * (k + 1)
          cxt.beginPath()
          cxt.strokeStyle = 'rgba(255, 255, 255 ,1)'
          cxt.fillStyle = '#fff'
          cxt.font = '12px microsoft yahei'
          cxt.moveTo(padding - 10, height - padding - ylen)
          cxt.lineTo(padding - 15, height - padding - ylen)
          cxt.fillText(yAxis[k], padding - 30, height - padding - ylen + 5)
          cxt.stroke()
          cxt.closePath()
          // 画 等高线
          cxt.beginPath()
          cxt.strokeStyle = 'rgba(255, 255, 255 ,.5)'
          cxt.moveTo(padding - 10, height - padding - ylen)
          cxt.lineTo(width - 15, height - padding - ylen)
          cxt.stroke()
          cxt.closePath()
          // 画标题
          cxt.beginPath()
          cxt.fillStyle = 'yellow'
          cxt.font = '16px simsun'
          cxt.fillText('实时数据', width / 2, height - 5)
          cxt.closePath()
        }
        // 画柱状图
        cxt.beginPath()
        for (var i = 0; i < orderNum.length; i++) {
          cxt.fillStyle = this.randomColor()
          cxt.fillRect(arcWidth * i + space * i + padding, height - padding, arcWidth, -(height - padding * 2) * (orderNum[i].num / radix))
        }
        cxt.closePath()
      },
      randomColor () {
        var r = Math.floor(Math.random() * 255) + 80
        var g = Math.floor(Math.random() * 255) + 80
        var b = Math.floor(Math.random() * 255) + 80
        var color = 'rgb(' + r + ',' + g + ',' + b + ')'
        return color
      }
    },
    mounted: function () {
      this.paintCanvas()
    }
  }
</script>
