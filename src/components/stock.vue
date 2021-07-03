<template>
  <div class="stock">
    <div class="charts" ref="stock_ref">asd</div>
  </div>
</template>

<script>
export default {
  name: 'stock',
  data () {
    return {
      chartInstance: null, // 获取div
      allData: null,
      currentIndex: 0, // 默认展示前5条数据，当前页数
      timeId: null,
    }
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener('resize',this.screenAdapter);
    this.screenAdapter() // 第一次主动触发
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.stock_ref,'dark');
      const initOption ={
        title: {
          text: '▎ 库存和销量分析',
          left: 20,
          top: 20
        }
      }
      this.chartInstance.setOption(initOption);
      this.chartInstance.on('mouseover',()=> { // 鼠标移入
        clearInterval(this.timeId)
      })
      this.chartInstance.on('mouseout',()=> {
        this.startInterval()
      })
    },
    getData() {
      this.$http.get('/api/stock').then(e => {
        this.allData = e.data;
        this.updateChart();
        this.startInterval() // 启动定时器
      })
    },
    updateChart() {
      const centerArr = [
        ['18%','40%'],
        ['50%','40%'],
        ['82%','40%'],
        ['34%','75%'],
        ['66%','75%'],
      ]
      const colorArr = [
        ['#4ff778', '#0ba82c'],
        ['#e5dd45', '#e8b11c'],
        ['#e8821c', '#e55445'],
        ['#5052ee', '#ab6ee5'],
        ['#23e5e5', '#2e72bf'],
      ]
      const start = this.currentIndex * 5
      const end = (this.currentIndex+1) * 5
      const showData = this.allData.slice(start, end)
      const seriesArr = showData.map((item,index) => {
        return {
          type: 'pie',
//          radius: [110,100],
          center: centerArr[index], // 圆心坐标 第一个参数：x轴的坐标，第二个参数：Y轴的坐标
          hoverAnimation: false, // 移除鼠标的动画效果
          labelLine: {
            show: false // 移除指示线
          },
          label: {
            position: 'center', // 文字显示在圆环中央
            color: colorArr[index][0]
          },
          data: [
            {
              name: item.name + '\n\n' + item.sales,
              value: item.sales,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0,1,0,0,[
                  {
                    offset: 0, color: colorArr[index][0]
                  },
                  {
                    offset: 1, color: colorArr[index][1]
                  }
                ])
              }
            },
            {
              value: item.stock,
              itemStyle: {
                color: '#333843'
              }
            }
          ]
        }
      })
      const dataOption = {
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const box = this.$refs.stock_ref.offsetWidth
      const titleFontSize = box / 100 * 3.6;
      const innerRadius = titleFontSize * 2.8; // 内圆的半径
      const outRadius = innerRadius *1.125 // 外圆的半径
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        series: [ // 5个圆环
          {
            type: 'pie', // 不加会报错
            radius: [innerRadius,outRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            type: 'pie',
            radius: [innerRadius,outRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            type: 'pie',
            radius: [innerRadius,outRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            type: 'pie',
            radius: [innerRadius,outRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
          {
            type: 'pie',
            radius: [innerRadius,outRadius],
            label: {
              fontSize: titleFontSize / 2
            }
          },
        ]
      }
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize()
    },
    startInterval() {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex > 1) {
          this.currentIndex = 0
        }
        this.updateChart()
      },4000)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize',this.screenAdapter)
    clearInterval(this.timeId)
  }
}
</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
  .stock{
    width: 100%;
    height: 100%;
    .charts {
      width: 100%;
      height: 100%;
    }
  }
</style>