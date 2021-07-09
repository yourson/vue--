<template>
  <div class="dragListTable">
    <div class="tip">此拖拽功能实现基于：sortablejs,学习地址：
      <el-link type="primary" href="http://www.itxst.com/sortablejs/neuinffi.html" target="_blank">
        地址访问
      </el-link>
    </div>
    <div class="tabs">
      <el-tabs stretch v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="拖拽列表" name="dragList">
          <dragList></dragList>
        </el-tab-pane>
        <el-tab-pane label="拖拽表格" name="dragTable">
          <dragTable></dragTable>
        </el-tab-pane>
      </el-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
const dragList = () => import('@/pages/drag/dragList')
const dragTable = () => import('@/pages/drag/dragTable')

export default {
  name: 'dragListTable',
  components: {
    dragList,dragTable
  },
  data () {
    return {
      activeName: 'dragList', // 默认激活的菜单项
    }
  },
  methods: {
    handleClick (index) {
      console.log(index)
    }
  },
}
</script>

<style lang="scss" scoped>
  .dragListTable {
    .tip {
      height: 60px;
      line-height: 60px;
    }
  }
  ::v-deep .el-tabs__nav-scroll{
    width: 30% !important;
    margin: 0 auto !important;
  }
  .el-menu-demo {
    margin: 10px 0;
  }
</style>