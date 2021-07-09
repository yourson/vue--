<template>
  <div class="dragList">
    <div class="dragList-box">
      <el-card class="box-card">
        <div slot="header">需要开发的功能</div>
        <div class="dragBox1 defaultH">
          <div v-for="item in list1" :key="item.index" class="item1">
            {{item.index}} - {{item.title}}
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header">正在开发的功能</div>
        <div class="dragBox2 defaultH">
          <div v-for="item in list2" :key="item.index" class="item2">
            {{item.index}} - {{item.title}}
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header">开发完成的功能</div>
        <div class="dragBox3 defaultH">
          <div v-for="item in list3" :key="item.index" class="item3">
            {{item.index}} - {{item.title}}
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  name: 'dragList',
  data () {
    return {
      list1: [
        { index: 0, title: '登录页面'},
        { index: 1, title: 'home页面'},
        { index: 2, title: '首页'},
        { index: 3, title: 'eCharts'},
        { index: 4, title: '权限'},
      ],
      list2: [
        { index: 0, title: 'sortable拖拽'},
        { index: 1, title: '拖拽dialog'},
        { index: 2, title: '表格拖拽'},
      ],
      list3: [
        { index: 0, title: '国际化'},
        { index: 1, title: '感谢作者'},
        { index: 2, title: '错误页面'},
        { index: 3, title: '设置页面'},
      ],
      curText: '',
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.dragFunc()
    })
  },
  methods: {
    dragFunc () {
      // 获取节点
      let node1 = document.querySelector('.dragList .dragBox1')
      let node2 = document.querySelector('.dragList .dragBox2')
      let node3 = document.querySelector('.dragList .dragBox3')
      let options = {
        group: "todoList", // 不同区域互相拖动标识（必须）
        sort: true, // 是否允许列内部排序，如果为false当有多个排序组时,多个组之间可以拖拽，本身不能拖拽
        delay: 0, // 按下鼠标后多久可以拖拽 1000表示1秒
        animation: 250, // 动画效果
        chosenClass: "list-choice", //设置选中样式类名
        dragClass: "list-drag", //设置拖拽样式类名
        ghostClass: "list-ghost", //设置拖拽停靠样式类名
        pull: true, // 是否允许拖入当前组
        put: true, // 是否允许拖出当前组
//        forceFallback: true, // 禁用h5拖拽模式
      }
      let _this = this
      let itemNode1 = document.querySelectorAll('.item1')
      let sortable1 = new Sortable(node1, {
        ...options, // 将基础配置引入（es6语法）
        onEnd: function ({ newIndex, oldIndex }) {
          if (oldIndex !==newIndex) {
            // 两个数据位置交换
            [_this.list1[oldIndex], _this.list1[newIndex]] = [_this.list1[newIndex],_this.list1[oldIndex]];
          }
        },
        onRemove: function ({to}) {
        }
      })

      let sortable2 = new Sortable(node2, {
        ...options, // 将基础配置引入（es6语法）
        onEnd: function ({ newIndex, oldIndex }) {
          if (oldIndex !==newIndex) {
            // 两个数据位置交换
            [_this.list2[oldIndex], _this.list2[newIndex]] =
              [_this.list2[newIndex],_this.list2[oldIndex]];
          }
        },
        onAdd: function (vet) {
//          _this.list3.slice(newIndex, 0, )
        }
      })

      let sortable3 = new Sortable(node3, {
        ...options, // 将基础配置引入（es6语法）
        onEnd: function ({ newIndex, oldIndex }) {
          if (oldIndex !==newIndex) {
            // 两个数据位置交换
            [_this.list3[oldIndex], _this.list3[newIndex]] =
              [_this.list3[newIndex],_this.list3[oldIndex]];
          }
        }})
    }
  },
}
</script>

<style scoped>
  .dragList-box {
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
  }
  .item1,.item2,.item3 {
    height: 40px;
    line-height: 30px;
    padding: 0 5px;
    margin: 4px 0;
    border-radius: 5px;
    border: 2px solid #ccc;
  }
  .box-card {
    width: 300px;
  }
  .defaultH {
    height: 500px;
  }
  .dragBox .list-drag {
    border: 1px solid deepskyblue;
  }
  .dragBox .list-choice {
    border: 1px solid deepskyblue;
  }
  .dragBox .list-ghost {
    border: 1px dotted #b3e19d;
  }
</style>