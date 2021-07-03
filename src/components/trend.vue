<template>
    <div class="trend">
      <div class="title" :style="comStyle">
        <span>▎ {{showTitle}}</span>
        <span class="title-icon" @click="showChoice=!showChoice">▽</span>
        <div class="select" :style="marginStyle">
          <div
            class="select-item"
            v-for="item in selectTypes"
            :key="item.key"
            v-show="showChoice"
            @click="handleSelect(item.key)"
          >
            {{item.text}}
          </div>
        </div>
      </div>
      <div class="charts" ref="trend_ref"></div>
    </div>
</template>

<script>
  export default {
    name: "trend",
    data() {
        return {
          chartInstance: null,
          allData: null, // 获取数据
          showChoice: false, // 是否显示可选项
          choiceType: 'area', // 标题显示的类型
          titleFontSize: 0, // 标题字体大小
        }
    },
    computed: {
      selectTypes () { // select选择 -- 类型选择
        if (!this.allData) {
          return []
        } else {
          return this.allData.type.filter(item => {
            return item.key !== this.choiceType
          })
        }
      },
      showTitle () { // title文字
        if (!this.allData) {
          return ''
        } else {
          return this.allData[this.choiceType].title
        }
      },
      comStyle () { // 设置标题文字大小样式
        return {
          fontSize: this.titleFontSize + 'px'
        }
      },
      marginStyle () { // 下拉框文字对齐
        return {
          marginLeft: this.titleFontSize + 'px'
        }
      }
    },
    mounted () {
      this.initChart();
      this.getData();
      window.addEventListener('resize',this.screenAdapter);
      this.screenAdapter() // 第一次主动触发
    },
    methods: {
      initChart () { // 初始化
        this.chartInstance = this.$echarts.init(this.$refs.trend_ref,'dark')
        const initOption = {
          grid: { // 配置做标轴的大小 - 做标轴和盒子的距离
            left: '3%',
            right: '4%',
            top: '35%',
            bottom: '1%',
            containLabel: true
          },
          tooltip: { // 工具提示
            trigger: 'axis'
          },
          legend: {
            left: 20,
            top: '20%',
            icon: 'circle'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false, // 数据是否和Y轴需要间隙（紧挨Y轴）
          },
          yAxis: {
            type: 'value',
            splitLine: { // 去除grid的线
              show: false
            }
          },
        };
        this.chartInstance.setOption(initOption)
      },
      getData () { // 数据获取
        this.$http.get('/api/trend').then(e=> {
          this.allData = e.data;
          this.updateChart()
        });
      },
      updateChart () { // 处理数据
        const colorArr1 = [ // 半通明的颜色值
          'rgba(11,168,44,0.5)',
          'rgba(44,110,255,0.5)',
          'rgba(22,242,217,0.5)',
          'rgba(154,33,30,0.5)',
          'rgba(250,105,0,0.5)',
        ];
        const colorArr2 = [ // 全通明的颜色值
          'rgba(11,168,44,0)',
          'rgba(44,110,255,0)',
          'rgba(22,242,217,0)',
          'rgba(154,33,30,0)',
          'rgba(250,105,0,0)',
        ];
        const timeArr = this.allData.common.month; // x坐标数据
        const valueArr = this.allData[this.choiceType].data; // Y轴的数据
        const seriesArr = valueArr.map((item,index) => {
          return {
            name: item.name, // 需要和legend里面的数据保持一致
            type: 'line',
            data: item.data,
            smooth:true, // 形成平滑的曲线
            stack: this.choiceType, // 形成堆叠图的属性，属性值要相同
            areaStyle: { // 区域的面积颜色填充
              color: new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                // 颜色从半透明到没有
                { offset: 0, color: colorArr1[index] },
                { offset: 1, color: colorArr2[index] }
                ])
            }
          }
        });
        const legendArr = valueArr.map(item => {
          return item.name
        });
        const dataOption = {
          xAxis: {
            data: timeArr
          },
          legend: {
            data: legendArr
          },
          series: seriesArr
        };
        this.chartInstance.setOption(dataOption)
      },
      screenAdapter () { // 屏幕适配
        const box = this.$refs.trend_ref.offsetWidth;
        this.titleFontSize = box / 100 * 3.6; // 标题文字大小
        const adapterOption = {
          legend: { // 图例的自适应配置
            itemWidth: this.titleFontSize / 2,
            itemHeight: this.titleFontSize / 2,
            itemGap: this.titleFontSize / 2, // 间隔
            textStyle: {
              fontSize: this.titleFontSize / 2,
            }
          }
        };
        this.chartInstance.setOption(adapterOption);
        this.chartInstance.resize();
      },
      handleSelect (currentType) { // 标题选择
        this.choiceType = currentType;
        this.updateChart(); // 渲染
        this.showChoice = false
      }
    },
    beforeDestroy() {
      // 取消事件监听
      window.removeEventListener('resize',this.screenAdapter)
    },
  }
</script>

<style lang="scss" scoped>
  .trend {
    width: 100%;
    height: 100%;
    .charts {
      width: 100%;
      height: 100%;
    }
    .title {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 10;
      color: #fff;
      .title-icon {
        margin-left: 10px;
        cursor: pointer;
      }
      .select {
        background-color: #222733;
        .select-item {
          cursor: pointer;
        }
      }
    }
  }
</style>
