<template>
  <div class="rank">
    <!--不同数值颜色不同，颜色渐变-->
    <div class="charts" ref="rank_ref"></div>
  </div>
</template>

<script>
export default {
  name: 'rank',
  data () {
    return {
      chartInstance: null, // 获取div
      allData: null,
      startValue: 0, // 区域缩放的起点值
      endValue: 9, // 区域缩放的终点值
      timeId: null, // 定时器
    }
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener('resize',this.screenAdapter);
    this.screenAdapter() // 第一次主动触发
  },
  methods: {
    initChart() { // 初始化
      this.chartInstance = this.$echarts.init(this.$refs.rank_ref,'dark')
      const initOption = {
        title: {
          text: '▎ 地区销售排行',
          left: 20,
          top: 20
        },
        grid: {
          top: '40%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel:true
        },
        tooltip: {
          show: true
        },
        xAxis: {type: 'category'},
        yAxis: {type: 'value',splitLine: { // 去除grid的线
            show: false
          }},
        series: {type: 'bar'}
      }
      this.chartInstance.setOption(initOption);
      this.chartInstance.on('mouseover',()=> {
          clearInterval(this.timeId)
      })
      this.chartInstance.on('mouseout',()=> {
        this.startInterval()
      })
    },
    getData() { // 获取数据
      this.$http.get('/api/rank').then(e=> {
        this.allData = e.data;
        this.allData.sort((a,b) => {
          return b.value - a.value
        })
        this.updateChart()
        this.startInterval()
      });
    },
    updateChart() { // 数据渲染
      const colorArr = [
        ['#0ba82c','#4ff778'],
        ['#2e72bf','#23e5e5'],
        ['#5052ee','#ab6ee5']
      ]
      const provinceArr = this.allData.map(item => {
        return item.name;
      }) // 横坐标
      const valueArr = this.allData.map(item => {
        return item.value;
      }) // 纵坐标
      const dataOption = {
        xAxis: {
          data: provinceArr
        },
        dataZoom: { // 区域缩放功能
          show: false, // 隐藏下面的条
          startValue: this.startValue, // 展示的一条数据
          endValue:  this.endValue,
        },
        series:{
          data: valueArr,
          itemStyle: {
            color: (arg) => {
              let targetColorArr = null;
              if (arg.value >= 200) {
                targetColorArr = colorArr[0]
              } else if (arg.value > 100&&arg.value<200) {
                targetColorArr = colorArr[1]
              } else {
                targetColorArr = colorArr[2]
              }
              return new this.$echarts.graphic.LinearGradient(
                0,0,0,1,[
                  {offset:0,color:targetColorArr[0]}, // 0%的颜色
                  {offset:1,color:targetColorArr[1]} // 100%的颜色
                ]
              )
            }
          }
        }
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() { // 适配
      // 拿到图表宽度
      const box = this.$refs.rank_ref.offsetWidth
      const titleFontSize = box / 100 * 3.6;
      const adapterOption = {
        title: {
          titleStyle: {
            fontSize: titleFontSize
          }
        },
        series: {
          barWidth: titleFontSize,
          itemStyle: {
            barBorderRadius: [
              titleFontSize/2,
              titleFontSize/2,
              0,0
            ]
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    startInterval () { // 设置向右移动的定时器
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(()=> {
        this.startValue++;
        this.endValue++;
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0;
          this.endValue = 9;
        }
        this.updateChart()
      },2000)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize',this.screenAdapter)
    clearInterval(this.timeId)
  }
}
</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
  .rank {
    width: 100%;
    height: 100%;
    .charts {
      width: 100%;
      height: 100%;
    }
  }
</style>