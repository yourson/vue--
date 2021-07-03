<template>
    <div class="map" @dblclick="revertMap">
      <div class="charts" ref="map_ref"></div>
    </div>
</template>

<script>
  import { getProvinceMapInfo } from '@/utils/map_utils'
  export default {
    name: "mapEchart",
    data() {
      return {
        chartInstance: null,
        allData: null,
        mapData: {} // 对省份地图数据进行缓存
      }
    },
    mounted() {
      this.initChart();
      this.getData();
      window.addEventListener('resize',this.screenAdapter);
      this.screenAdapter() // 第一次主动触发
    },
    methods: {
      initChart () {
        this.chartInstance = this.$echarts.init(this.$refs.map_ref,'dark');
        // 获取矢量数据
        this.$http.get('http://localhost:8080/static/json/china.json').then(e => {
          this.$echarts.registerMap('china',e) // 地图注册
          const initOption = {
            title: {
              text: '▎ 商家分布',
              left: 20,
              top: 10
            },
            geo: { // map配置
              type: 'map',
              map: 'china', // 这是注册的别名
              top: '5%', // 确定地图的位置
              bottom: '5%',
              itemStyle: {
                areaColor: '#2172bf', // 地图背景色配置
                borderColor: '#333', // 边框颜色配置
              }
            },
            legend: {
              left: '5%',
              bottom: '5%',
              orient: 'vertical', // 直立
            }
          };
          this.chartInstance.setOption(initOption)
          this.chartInstance.on('click', (arg)=>{
            // 点击的时候将省份的名字传入，找到相应的省份json文件
            const provinceInfo = getProvinceMapInfo(arg.name)
            // 判断当前所点击的省份的地图矢量数据是否存在
            // 获取相应省份的矢量数据
            this.$http.get('http://localhost:8080'
              +provinceInfo.path).then(e => {
              this.$echarts.registerMap(provinceInfo.key,e.data)
              this.mapData[provinceInfo.key] = e.data; // 缓存数据
              const changeOption = { // 重新渲染地图 -- 省份地图
                geo: {
                  map: provinceInfo.key, // 注册的名字
                }
              }
              this.chartInstance.setOption(changeOption)
            })
          })
        })
      },
      getData () { // 数据获取
        this.$http.get('/api/map').then(e => {
          this.allData = e.data;
          this.updateChart()
        })
      },
      updateChart() { // 数据更新
        // 数据处理
        const seriesArr = this.allData.map(item => {
          /*如果想要在地图中显示散点图的的数据，需要增加配置
          *coordinateSystem:geo
          * */
          return {
            type:'effectScatter', // 波纹状
            rippleEffect: { // 涟漪的效果
              scale: 5,
              brushType: 'stroke' // 空心效果
            },
            name: item.name,
            data: item.children,
            coordinateSystem: 'geo' // 将散点图和地图链接
          }
        })
        // 图例的数据
        const legendArr = this.allData.map(item => item.name)
        const dataOption = {
          legend: {
            data: legendArr
          },
          series: seriesArr
        };
        this.chartInstance.setOption(dataOption)
      },
      screenAdapter() { // 屏幕适配
        const box = this.$refs.map_ref.offsetWidth;
        const titleFontSize = box / 100 * 3.6; // 标题文字大小
        const adapterOption = {
          title: {
            textStyle: {
              fontSize: titleFontSize
            }
          },
          legend: {
            itemWidth: titleFontSize / 2,
            itemHeight: titleFontSize / 2,
            itemGap: titleFontSize / 2, // 间隔
            textStyle: {
              fontSize: titleFontSize / 2,
            }
          }
        };
        this.chartInstance.setOption(adapterOption)
        this.chartInstance.resize()
      },
      revertMap () { // 双击回到中国地图 - 双击事件
        const revertOption = {
          geo: {
            map: 'china'
          }
        }
        this.chartInstance.setOption(revertOption)
      },
      beforeDestroy () { // 取消事件监听
        window.removeEventListener('resize',this.screenAdapter)
      }
    },
  }
</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
  .map {
    width: 100%;
    height: 100%;
    .charts {
      width: 100%;
      height: 100%;
    }
  }
</style>
