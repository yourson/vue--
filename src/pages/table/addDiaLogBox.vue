<template>
  <div>
    <el-dialog
      title="添加"
      :visible.sync="addVisible"
      :before-close="handleClose"
      width="40%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="70px"
        :rules="rules"
      >
        <!--label-width: 表单域标签的的宽度-->
        <el-form-item label="编号：" prop="num">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item label="日期：" prop="date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            style="width: 100%;"
            :editable="false"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="省份：">
          <el-input v-model="form.province"></el-input>
        </el-form-item>
        <el-form-item label="市区：">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="邮编:">
          <el-input v-model="form.zip"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="addDef">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addDiaLog',
  props: [
    'addVisible'
  ],
  data () {
    return {
      form: { // 添加提示框的表单
        num: '',
        date: '',
        name: '',
        province: '',
        city: '',
        address: '',
        zip: ''
      },
      rules: { // 验证规则
        num:[{required: true, message: '请输入编号', trigger: 'blur'}],
        date:[{ required: true, message: '请输入时间', trigger: 'blur' }],
        name:[{ required: true, message: '请输入名字', trigger: 'blur' }],
      },
      add: true // 判断是否添加
    }
  },
  methods: {
    // 确定添加
    addDef () {
      // 验证规则完成通过
      this.$refs.form.validate(async valid => {
        if (valid) {
          await this.$http.post('/api/addTable',{
            form: this.form
          })
          this.$emit('addDiaLogBox', this.add)
          this.$refs.form.resetFields(); // 清空数据
        }
      });
    },
    handleClose () { // 点击遮罩层触发的函数
      this.$emit('addDiaLogBox')
    },
    cancel () { // 取消
      this.$emit('addDiaLogBox')
    }
  },
}
</script>

<style scoped>

</style>