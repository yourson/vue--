<template>
    <div class="container">
        <!--商家销量统计的横向柱状图-->
      <div class="charts" ref="seller_ref"></div>
    </div>
</template>

<script>
  export default {
    name: "seller",
    data() {
        return {
          chartInstance: null, // canvas节点
          allData: null, // 服务器数据
          currentPage: 1, // 当前显示的页数
          totalPage: 0, // 一共有多少页
          timeId: null, // 定时器
        }
    },
    mounted () {
      this.initCharts();
      this.getData();
      // 分辨率适配
      window.addEventListener('resize',this.screenAdapter);
      this.screenAdapter() // 解决首次进入的时候大小和屏幕窗口适配
    },
    methods: {
      // 初始化
      initCharts () {
        this.chartInstance = this.$echarts.init(this.$refs.seller_ref,'dark');
        // 初始化配置
        const initOption = {
          title: {
            text: '▎ 商家销售统计',
            textStyle: {
              // fontSize: 66
            },
            left: 20,
            top: 20,
          },
          grid: { // 设置做标轴
            top: '20%', // 组件离容器左侧的距离,
            left: '3%',
            right: '6%',
            bottom: '3%',
            containLabel: true // 将会包含做标轴的文字
          },
          xAxis: {
            type: 'value',
            splitLine: { // 去除grid的线
              show: false
            }
          },
          yAxis: {
            type: 'category',
          },
          tooltip: { // 鼠标提示
            trigger: 'axis', // 移入做标轴的时候触发
            axisPointer: { // 移入展现的样式
              type: 'line',
              lineStyle: {
                // width: 66,
                color: '#2d3443' // 背景色
              },
              z: 0 // 层级
            }
          },
          series: [
            {
              type: 'bar',
              // barWidth: 66,
              label: { // 文字
                show: true, // 文字展示
                position: 'right', // 文字显示在右边
                textStyle: {
                  color: '#fff',
                }
              },
              itemStyle: {
                // barBorderRadius: [0,33,33,0], // 右边圆角
                // 颜色渐变 - 渐变的方向 - 不同百分比之下颜色的值
                // graphic.LinerGradient(x1.y1,x2,y2,[])
                color: new this.$echarts.graphic.LinearGradient(
                  0,0,1,0,[
                    {offset:0,color:'#5052ee'}, // 0%的颜色
                    {offset:1,color:'#AB6EE5'} // 100%的颜色
                  ]
                )
              }
            }
          ]
        };
        this.chartInstance.setOption(initOption);
        // 对鼠标事件进行监听
        this.chartInstance.on('mouseover',() => {
          clearInterval(this.timeId)
        })
        this.chartInstance.on('mouseout',() => {
          this.startInterval()
        })
      },
      // 获取服务器数据
      async getData () {
        await this.$http.get(
          "/api/seller",{}
        ).then(e => {
          this.allData = e;
          // 对数据进行处理 - 排序
          this.allData.sort((a,b) => {
            return a.value - b.value;
          });
          // 每5个元素显示一页
          this.totalPage = this.allData.length % 5 === 0 ?
            this.allData.length / 5:this.allData.length / 5 + 1;
          this.updateCharts()
          this.startInterval() // 开启定时器
        }).catch(error => {
          console.log(error)
        })
      },
      // 更新图表
      updateCharts () {
        const start = (this.currentPage - 1) * 5;
        const end = this.currentPage * 5;
        const showData = this.allData.slice(start, end);
        // map会返回满足条件的一个新数组
        const sellerNames = showData.map(item => {
          return item.name
        });
        const sellerValues = showData.map(item => {
          return item.value
        });
        const option = {
          yAxis: {
            data: sellerNames
          },
          series: [
            {
              data: sellerValues,
            }
          ]
        };
        this.chartInstance.setOption(option)
      },
      // 开启定时器
      startInterval () {
        if (this.timeId) { // 保险操作
          clearInterval(this.timeId)
        }
        this.timeId = setInterval( () => {
          this.currentPage++;
          if (this.currentPage > this.totalPage) {
            this.currentPage = 1
          }
          this.updateCharts()
        },3000)
      },
      // 当浏览器大小发生变化的时候调用
      screenAdapter () {
        const box = this.$refs.seller_ref.offsetWidth;
        // 标题大小 - 自己试出来的
        const titleFontSize = box / 100 * 3.6;
        const adapterData = {
          title: {
            textStyle: { fontSize: titleFontSize }
          },
          tooltip: { // 背景宽度
            axisPointer: {
              lineStyle: { width: titleFontSize }
            }
          },
          series: [
            {
              barWidth: titleFontSize, // 圆柱体宽度
              itemStyle: {
                barBorderRadius: [0, titleFontSize / 2, // 圆角大小
                  titleFontSize / 2, 0]
              },
              label: {
                textStyle: {
                  fontSize: titleFontSize
                }
              }
            }
          ]
        };
        // 注意：setOption不会覆盖，而是整合
        this.chartInstance.setOption(adapterData);
        this.chartInstance.resize() // 手动调用图表对象的resize，才能产生效果
      }
    },
    beforeDestroy () {
      clearInterval(this.timeId); // 注销定时器
      // 注销监听事件
      window.removeEventListener('resize',this.screenAdapter)
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    .charts {
      width: 100%;
      height: 100%;
    }
  }
  canvas {
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }
</style>
