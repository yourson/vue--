<template>
  <div>
    <!--抽屉-->
    <el-drawer
      title="菜单配置"
      :modal="false"
      size="25%"
      :visible.sync="drawerData.drawer"
      :with-header="false"
      :before-close="drawerHandleClose"
    >
      <el-tree
        ref="treeMenu"
        :data="drawerData.treeData"
        show-checkbox
        node-key="id"
        props="defaultProps"
        :default-expanded-keys="drawerData.defaultExpandedKeys"
        :default-checked-keys="drawerData.defaultCheckedKeys"
        @check="isChecked"
      >
      </el-tree>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: '',
  props: [
    'drawerData'
  ],
  data () {
    return {
//      drawer: false, // 抽屉关闭与打开标识
      defaultProps: { // 关联data - 句体作用：收集信息
        label: 'label',
        children: 'children',
        disabled: function (data) {
          return data.disabled
        }
      },
      authParams: [], // 山川tree变动参数
    }
  },
  methods: {
    isChecked (curNode,checked ) {
      // 将全部选中的节点传递给后台
      this.authParams = checked.checkedKeys.concat(checked.halfCheckedKeys)
    },
    // 抽屉关闭前触发
    drawerHandleClose () {
      // 获取getHalfCheckedKeys - 优化操作
      let key1 = this.$refs.treeMenu.getCheckedKeys()
      let key2 = this.$refs.treeMenu.getHalfCheckedKeys()
      let checkKeys = key1.concat(key2)
      if (checkKeys.toString() === this.drawerData.defaultCheckedKeys.toString()) {
        this.$emit('drawerClose')
      } else {
        this.$confirm('是否保存操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.post('/api/changeTreeData',{
            uid: this.drawerData.uid,
            changeTreeData: this.authParams
          })
          this.$emit('drawerClose')
          this.$message({
            type: 'success',
            message: '更改成功!'
          });
          this.$store.dispatch('getAuthRouter', this.drawerData.uid)
        }).catch(() => {
          this.$emit('drawerClose')
          this.$message({
            type: 'info',
            message: '已取消更改'
          });
        });
      }
    },
  },
}
</script>

<style scoped>

</style>