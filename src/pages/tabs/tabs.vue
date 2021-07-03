<template>
  <div class="tabs">
    <el-card class="card-demo">
      <el-tabs :tab-position="tabPosition1" style="height: 160px;">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">
          <div>这是定时任务补偿页面，</div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card>
      <el-tabs :tab-position="tabPosition2" style="width: 400px;height: 150px;">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">
          <div>这是定时任务补偿页面，</div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  data () {
    return {
      tabPosition1: 'left',
      tabPosition2: 'top'
    }
  },
  methods: {},
}
</script>

<style scoped>
  .card-demo {
    margin-bottom: 10px;
  }
</style>