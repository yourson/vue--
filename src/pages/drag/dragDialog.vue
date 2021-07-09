<template>
  <div class="dragDialog">
    <el-button type="primary" @click="showDialog">点击</el-button>
    <div v-show="dialogVisible" class="dragAll">
      <el-dialog
        title="提示"
        class="dialog"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  name: 'dragDialog',
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    dragDialog() {
      let node1 = document.querySelector('.dragDialog .dialog')
      let sortDialog = new Sortable(node1, {
        sort: true, // 是否允许列内部排序，如果为false当有多个排序组时,多个组之间可以拖拽，本身不能拖拽
        delay: 0, // 按下鼠标后多久可以拖拽 1000表示1秒
        animation: 250, // 动画效果
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogVisible = false
          done();
        })
        .catch(_ => {});
    },
    showDialog () {
      this.dialogVisible = true
    }
  },
}
</script>

<style scoped>
  .dragDialog {
    width: 100%;
    height: 100%;
  }
</style>