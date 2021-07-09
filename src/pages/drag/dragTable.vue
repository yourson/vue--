<template>
  <div class="dragTable">
    <el-table
      row-key="id"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="不可拖动列"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="可以拖动列"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="可以拖动列">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="不可拖动列">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  name: 'dragTable',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex: '男'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        sex: '男'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        sex: '男'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        sex: '男'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        sex: '男'
      }
      ]
    }
  },
  mounted() {
    this.dragTable()
  },
  methods: {
    dragTable () {
//    .dragTable .el-table__header-wrapper tr
      let bodyNode = document.querySelector('.el-table__body-wrapper tbody')
      let columnNode = document.querySelector('.dragTable .el-table__header-wrapper tr')
      let _this = this
      let dragBody = new Sortable(bodyNode,{
        sort: true, // 是否允许列内部排序，如果为false当有多个排序组时,多个组之间可以拖拽，本身不能拖拽
        delay: 0, // 按下鼠标后多久可以拖拽 1000表示1秒
        animation: 250, // 动画效果
        onEnd: function ({newIndex, oldIndex}) {
          [_this.tableData[oldIndex], _this.tableData[newIndex]] =
            [_this.tableData[newIndex],_this.tableData[oldIndex]];
        }
      })
      let dragColumn = new Sortable(columnNode, {
        sort: true, // 是否允许列内部排序，如果为false当有多个排序组时,多个组之间可以拖拽，本身不能拖拽
        delay: 0, // 按下鼠标后多久可以拖拽 1000表示1秒
        animation: 250, // 动画效果
        filter: '.el-table_1_column_1, .el-table_1_column_4',
        onFilter: function (ret) {
          console.log(ret)
          _this.$message({
            message: '不能拖拽此列',
            type: 'warning'
          })
        },
      })
    }
  },
}
</script>

<style scoped>

</style>