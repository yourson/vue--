<template>
  <div class="hot">
    <!--不同数值颜色不同，颜色渐变-->
    <div class="charts" ref="hot_ref"></div>
    <span class="left" :style="comStyle" @click="toLeft">◀</span>
    <span class="right" :style="comStyle" @click="toRight">▶</span>
    <span class="hot-name" :style="comStyle">{{hotName}}</span>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      chartInstance: null, // 获取div
      allData: null,
      currentIndex: 0, // 当前显示一级分类数据
      titleFontSize: 0,
    }
  },
  computed: {
    hotName () {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.currentIndex].name
      }
    },
    comStyle() {
      return {
        fontSize: this.titleFontSize + 'px'
      }
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
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref,'dark');
      const initOption = {
        title: {
          text: '▎ 热销商品的占比',
          left: 20,
          top: 20
        },
        legend: { // 图例位置
          top: '15%',
          left: '15%',
          icon: 'circle' // 形状
        },
        tooltip: {
          show: true,
          formatter: (arg) => { // 工具提示 - 参数用series里面的data
            const thirdCategory = arg.data.children // 获取数据
            // 计算出所有三级分类的数值总和
            let total=  0;
            thirdCategory.forEach(item => { // 总数
              total += item.value
            })
            let str = '';
            thirdCategory.forEach(item => {
              str = `${item.name}: ${parseInt(item.value / total * 100) + '%'}<br/>`
            })
            return str
          },
        },
        series: [
          {
            type: 'pie',
            label: { // 中文的文字
              show: false,
            },
            emphasis: { // 当饼图处于高亮的状态的情况下
              label: {
                show: true,
              },
              labelLine: { // 饼图的线隐藏
                show: false
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption);
    },
    getData() {
      this.$http.get('/api/hot').then(e => {
        this.allData = e.data;
        this.updateChart()
      })
    },
    updateChart() {
      // 处理数据
      const legendData = this.allData[this.currentIndex].children.map(item => {
        return {
          name: item.name
        }
      })
      const seriesData = this.allData[this.currentIndex].children.map(item => {
        return {
          name: item.name,
          value: item.value,
          children: item.children
        }
      })
      const dataOption = {
        legend: {
          data: legendData
        },
        series: {
          data: seriesData
        }
      }
      this.chartInstance.setOption(dataOption)
    },
    toLeft() { // 切换数据展示
      this.currentIndex--;
      if(this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1 // 回到最后一个索引数据
      }
      this.updateChart()
    },
    toRight() {
      this.currentIndex++;
      if(this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0
      }
      this.updateChart()
    },
    screenAdapter() {
      const box = this.$refs.hot_ref.offsetWidth;
      this.titleFontSize = box / 100 * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize
          }
        },
        legend: {
          itemWidth: this.titleFontSize, // 图例的宽度
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize /2, // 图例的间隔
          textStyle: {
            fontSize: this.titleFontSize / 2
          }
        },
        series: [
          {
            radius: this.titleFontSize * 4.5, // 控制饼图的半径
            center: ['50%','50%'] // 将饼图位于正中央
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize',this.screenAdapter)
  }
}
</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
  .hot {
    width: 100%;
    height: 100%;
    .charts {
      width: 100%;
      height: 100%;
    }
    .left {
      position: absolute;
      left: 10%;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .right {
      position: absolute;
      right: 10%;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .hot-name {
      position: absolute;
      left: 80%;
      bottom: 20px;
    }
  }
</style>