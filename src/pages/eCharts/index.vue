
<template>
  <div class="screen-container">
    <header class="screen-header">
      <span class="title">电商平台实时监控系统</span>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top" :class="[fullScreenStatus.trend ? 'fullscreen': '']">
          <!-- 销量趋势图表 -->
          <Trend ref="trend"></Trend>
          <div class="resize">
            <span @click="changeSize('trend')" :class="[fullScreenStatus.trend ? 'el-icon-back': 'el-icon-right']"></span>
          </div>
        </div>
        <div id="left-bottom" :class="[fullScreenStatus.seller ? 'fullscreen': '']">
          <!-- 销量趋势图表 -->
          <Seller ref="seller"></Seller>
          <div class="resize">
            <span @click="changeSize('seller')" :class="[fullScreenStatus.seller ? 'el-icon-back': 'el-icon-right']"></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="[fullScreenStatus.map ? 'fullscreen': '']">
          <!-- 销量趋势图表 -->
          <Map ref="map"></Map>
          <div class="resize">
            <span @click="changeSize('map')" :class="[fullScreenStatus.map ? 'el-icon-back': 'el-icon-right']"></span>
          </div>
        </div>
        <div id="middle-bottom" :class="[fullScreenStatus.rank ? 'fullscreen': '']">
          <!-- 销量趋势图表 -->
          <Rank ref="rank"></Rank>
          <div class="resize">
            <span @click="changeSize('rank')" :class="[fullScreenStatus.rank ? 'el-icon-back': 'el-icon-right']"></span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.hot ? 'fullscreen': '']">
          <!-- 销量趋势图表 -->
          <Hot ref="hot"></Hot>
          <div class="resize">
            <span @click="changeSize('hot')" :class="[fullScreenStatus.hot ? 'el-icon-back': 'el-icon-right']"></span>
          </div>
        </div>
        <div id="right-bottom" :class="[fullScreenStatus.stock ? 'fullscreen': '']">
          <!-- 销量趋势图表 -->
          <Stock ref="stock"></Stock>
          <div class="resize">
            <span @click="changeSize('stock')" :class="[fullScreenStatus.stock ? 'el-icon-back': 'el-icon-right']"></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Hot from '@/components/hot.vue'
import Map from '@/components/map.vue'
import Rank from '@/components/rank.vue'
import Seller from '@/components/seller.vue'
import Stock from '@/components/stock.vue'
import Trend from '@/components/trend.vue'
export default {
  components: {
    Hot,Map,Rank,Seller,Stock,
    Trend
  },
  data () {
    return {
      fullScreenStatus: { // 定义每一个图表全局状态的数据
        trend: false,
        seller: false,
        map: false,
        rank: false,
        hot: false,
        stock: false,
      }
    }
  },
  methods: {
    changeSize (chartName) {
      // 1.改变fullScreenStatus的数据
      this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName] // 取反
      // 2.需要调用每一个图表组件的screenAdpter方法，重新渲染图表
//      this.$refs[chartName].screenAdapter()
      this.$nextTick(() => { // 数据改变的时候不能马上执行，nextTick解决
        this.$refs[chartName].screenAdapter()
      })
    }
  }
}
</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
  .screen-container {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    background-color: #161522;
    color: #fff;
    box-sizing: border-box;
    .screen-header {
      width: 100%;
      height: 64px;
      font-size: 20px;
      position: relative;
      .title {
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 20px;
        transform: translate(-50%, -50%);
      }
    }
    .screen-body {
      width: 100%;
      height: calc(100% - 64px);
      display: flex;
      .screen-left {
        height: 100%;
        width: 27.6%;
        #left-top {
          height: 53%;
          position: relative;
        }
        #left-bottom {
          height: 31%;
          margin-top: 25px;
          position: relative;
        }
      }
      .screen-middle {
        height: 100%;
        width: 41.5%;
        margin-left: 1.6%;
        margin-right: 1.6%;
        #middle-top {
          width: 100%;
          height: 56%;
          position: relative;
        }
        #middle-bottom {
          margin-top: 25px;
          width: 100%;
          height: 28%;
          position: relative;
        }
      }
      .screen-right {
        height: 100%;
        width: 27.6%;
        #right-top {
          height: 46%;
          position: relative;
        }
        #right-bottom {
          height: 38%;
          margin-top: 25px;
          position: relative;
        }
      }
    }
  }
  .resize {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  /*// / 全屏样式的定义*/
  .fullscreen {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    z-index: 100;
  }
</style>
