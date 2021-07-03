<template>
  <div class="home-page">
    <el-row :gutter="20">
      <!--
      左边部分
      :gutter：栅格间隔 - 属性来指定每一栏之间的间隔
      -->
      <el-col :span="8">
        <el-card shadow="hover" class="space" style="height: 252px;">
          <div class="user-info">
            <img src="../../assets/imgs/img.jpg" class="user-avator" alt=""/>
            <div class="user-info-content">
              <div class="user-info-name">{{ username }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2019-11-01</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>东莞</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:252px;">
          <div slot="header" class="clearfix">
            <span>语言详情</span>
          </div>Vue
          <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
          <el-progress :percentage="13.7"></el-progress>HTML
          <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <!--右边部分-->
      <el-col :span="16">
        <!--上面部分-->
        <el-row :gutter="20" class="space">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-bell grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!--代办事项-->
        <el-card shadow="hover" style="height:403px;">
          <!--header：表头插入-->
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
          </div>
          <el-table
            :show-header="false"
            :data="todoList"
            style="width:100%;"
          >
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div
                  class="todo-item"
                  :class="{'todo-item-del': scope.row.status}"
                >{{scope.row.title}}</div>
              </template>
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!--柱状图区域-->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div id="skill" class="eCharts" ></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div id="sell" class="eCharts" ></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script scoped>
import { mapState } from 'vuex';
export default {
  data () {
    return {
      // 表格数据
      todoList: [
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: true
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: true
        }
      ],
      originaldata: [ // 第一个图的数据
        { "value": 60, "name": "移动端",
          "children": [
            { "value": 40, "name": "苹果"},
            { "value": 10, "name": "安卓"},
            { "value": 10, "name": "塞班"}
          ]
        },
        {"value": 20, "name": "PC"},
        {"value": 20, "name": "平板"}
      ],
      // 销售数据
      sellData: [120, 200, 150, 80, 70, 110, 130]
    }
  },
  computed: {
    ...mapState(['username']),
    role () {
      return this.username === '管理员'? '超级管理员': '普通用户';
    }
  },
  mounted () {
    this.skill(); // 渲染图表
    this.sell(); // 柱状图函数
  },
  methods: {
    skill () {
      // 获取画布
      let myChart = this.$echarts.init(document.getElementById('skill'));
      let data0 = []; // 内圈
      let data1 = []; // 外圈圈
      for (let i = 0; i < this.originaldata.length; i++) {
        data0.push({ // 内圈数组
          value: this.originaldata[i].value,
          name: this.originaldata[i].name
        });
        let children = this.originaldata[i].children;
        if (typeof (children)==='undefined') {
          // 没有子项
          data1.push({ // 内圈数组
            value: this.originaldata[i].value,
            name: this.originaldata[i].name,
            itemStyle: { // 该对象设置饼图图形样式
              normal: {
                // 没有子数据，将其设置为透明
                color: 'rgba(0, 0, 0, 0)',
              }
            }
          });

        } else {
          for (let k = 0; k < children.length; k++) {
            data1.push({
              value: children[k].value,
              name: children[k].name,
              label: { // 单个扇区的标签进行配置。
                normal: {
                  position: 'outside',
                  formatter: '{b} {d}% ',
                  color: '#909090'
                },
                emphasis: {
                  fontSize: '30',
                  fontWeight: 400
                }
              }
            })
          }
        }
      }

      let option = {
        backgroundColor: '#0A2E5D', // 全局背景色
        title: { // 标题信息 --- 也可以是对象
          text: "技能掌握",
          x: 'center',
          y: 'center',
          textStyle: { // 文字样式
            color: '#fff',
            fontSize: 22,
            fontWeight: '400'
          }
        },
        // color：色板
        // color: ['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000'],
        legend: { //图例，表述数据和图形的关联,每个图表最多仅有一个图例
          // orient: 'horizontal', // 模式
          x: 'center',
          y: 'bottom',
          icon: 'circle', // 图表的形状
          textStyle: {
            color: '#fff' // 文字颜色
          },
          itemGap: 20, // 各个item之间的间隔，单位px，默认为10
        },
        series: [ // 系列列表,每个系列通过 type 决定自己的图表类型
          { // 内圈
            name: '技能元饼图',
            type: 'pie', // 必须，图形类型
            radius: ['47%', '74%'], // 圆的半径
            // label: { // 设置值域的标签
            //   show: false, // 是否将数据文字显示在圆环内
            //   position: 'outer' // 设置标签位置，默认在饼状图外 可选值：'center' ¦ 'inner（饼状图上）'
            // },
            label: { // 饼图图形上的文本标签,说明图形的一些数据信息
              // emphasis：代表鼠标接触时的css
              normal: {
                position: 'outside',
                formatter: '{b} {d}% ',
                color: '#fff'
              },
              emphasis: {
                fontSize: '30',
                fontWeight: 400
              }
            },
            labelLine: { // 引导线设置
              normal: {
                show: true, // 引导线显示
                smooth: 0.1, // 转折处的倾斜角
                length: 20, // 第一条线
                length2: 50 // 第二条线
              },
            },
            hoverAnimation:false, // 鼠标移入扇形不放大
            data: data0,
          },
          { // 外圈
            name: "访问来源",
            type: 'pie',
            radius: ['74%', '84%'],//外环尺寸
            hoverAnimation:false,
            data: data1
          }
        ]
      };
      myChart.setOption(option) // 初始化接口,绘制图表
    },
    sell () {
      let option = {
        title: {
          text: '销量图'
        },
        xAxis: { // x轴
          type: 'category',
          name: "月份",
          // data ：x轴的坐标
          data: ['1','2','3','4','5','6','7','8','9','10','11','12',]
        },
        yAxis: {
          type: 'value',
          name: '销量' // y轴的名称
        },
        series: [
          {
            type: 'bar',
            data: [120, 200, 150, 80, 70, 110, 130,23,45,56,54,200]
          }
        ]
      }
      let myChart = this.$echarts.init(document.getElementById('sell'));
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  /*管理员和语言详情的css*/
  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    /*下面的短横线*/
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }
  .user-info-content {
    padding-left: 50px;
    font-size: 14px;
    color: #999;
    flex: 1;
  }
  /*间隔*/
  .space {
    margin-bottom: 20px;
  }
  .user-avator {
    display: block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-info-name {
    font-size: 20px;
    color: #222;
  }
  /*登录css*/
  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }
  .user-info-list span {
    margin-left: 70px;
  }

  /*右边的样式 - 用户访问量*/
  .grid-content {
    display: flex;
    /*align-items:定义项目在交叉轴上如何对齐 - 在Y轴上的对齐*/
    align-items: center;
    height: 100px;
  }
  /*头像css*/
  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }
  .grid-cont-right {
    /*flex: 1; 会自动填充文字部分div的宽度*/
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }
  /*头像和文字的颜色一样*/
  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(100, 213, 114);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }
  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }
  .eCharts {
    width: 100%;
    height: 300px;
  }
</style>
