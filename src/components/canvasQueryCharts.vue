<template>
  <div id="canvasWrap">
    <canvas id="queryCharts"></canvas>
  </div> 
</template>
<style scoped>
 
</style>
<script>
  export default {
    methods: {
      generalCanvas () {
        var canvas = document.getElementById('queryCharts')
        var canvasWrapWidth = canvas.parentElement.parentElement.offsetWidth
        var canvasWrapHeight = 500
        canvas.setAttribute('width', canvasWrapWidth)
        canvas.setAttribute('height', canvasWrapHeight)
        var ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ff4949'
        ctx.beginPath()
        var space = 30
        var padding = 40
        var chartsNum = this.orders.length
        var radixMoney = Math.max.apply(null, this.orders.map((value) => { return value.money }))
        var radixNum = Math.max.apply(null, this.orders.map((value) => { return value.orderNum }))
        // 金额柱状图
        for (var i = 0; i < chartsNum; i++) {
          ctx.fillRect(padding + i * 70 + space * (i + 1), canvasWrapHeight / 2, 29, -canvasWrapHeight * (this.orders[i].money / radixMoney))
        }
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = '#74f7af'
        // 单数柱状图
        for (var k = 0; k < chartsNum; k++) {
          ctx.fillRect(padding + 30 + k * 70 + space * (k + 1), canvasWrapHeight / 2, 29, -canvasWrapHeight * (this.orders[k].orderNum / radixNum))
        }
        ctx.stroke()
        ctx.closePath()
        // 画x轴
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(padding + 5, canvasWrapHeight / 2 + 0.5)
        ctx.lineTo(canvasWrapWidth - padding * 2, canvasWrapHeight / 2 + 0.5)
        ctx.stroke()
        // 画 y 轴
        ctx.moveTo(padding + 5, 0)
        ctx.lineTo(padding + 5, canvasWrapHeight / 2 + 0.5)
        ctx.stroke()
        ctx.closePath()
        // 画x轴数据
        ctx.fillStyle = 'black'
        for (var j = 0; j < chartsNum; j++) {
          ctx.fillText(this.orders[j].time, padding + 20 + j * 70 + (space) * (j + 1), canvasWrapHeight / 2 + 15)
        }
      }
    },
    mounted () {
      this.generalCanvas()
    }
  }
</script>
