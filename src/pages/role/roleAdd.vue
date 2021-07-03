<template>
  <div>
    <el-dialog
      title="添加"
      :visible.sync="addVisible"
      :before-close="handleClose"
      width="35%"
    >
      <el-form
        ref="roleForm"
        :model="form"
        label-width="110px"
        :rules="rules"
      >
        <el-form-item label="权限id：" prop="id">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="角色uid：" prop="uid">
          <el-input v-model="form.uid"></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户角色：" prop="roles">
          <el-radio-group v-model="form.roles">
            <el-radio label="admin"></el-radio>
            <el-radio label="经理"></el-radio>
            <el-radio label="员工"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户密码：" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：" prop="isEnable">
          <el-switch v-model="form.isEnable"></el-switch>
        </el-form-item>
        <el-form-item label="用户头像：" prop="avatar">
          <el-input v-model="form.avatar"></el-input>
        </el-form-item>
        <el-form-item label="token值:" prop="token">
          <el-input v-model="form.token"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="sureAddRoles">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'roleAdd',
  props: ['addVisible'],
  data () {
    return {
      form: {
        id: '',
        uid: '',
        username: '',
        roles: '',
        password: '',
        avatar: '',
        token: '',
        isEnable: false
      },
      addOk: true, // 是否可以更新数据的标识
      rules: {
        id: [{required: true, message: '请输入编号', trigger: 'blur'}],
        uid: [{required: true, message: '请输入编号', trigger: 'blur'}],
        username: [{required: true, message: '请输入编号', trigger: 'blur'}],
        roles: [{required: true, message: '请输入编号', trigger: 'blur'}],
        password: [{required: true, message: '请输入编号', trigger: 'blur'}],
        avatar: [{required: true, message: '请输入编号', trigger: 'blur'}],
        token: [{required: true, message: '请输入编号', trigger: 'blur'}],
        isEnable: [
          {required: true, message: '请输入编号', trigger: 'blur'},
          {type: 'boolean', message: '请输入编号', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    sureAddRoles() {
      console.log(111)
      this.$refs.roleForm.validate(async valid => {
        if (valid) {
          await this.$http.post('/api/addRoles',this.form)
          this.$emit('roleAddBox',this.addOk)
        }
      })
    },
    cancel() {
      this.$emit('roleAddBox')
    },
    handleClose () {
      this.$emit('roleAddBox')
    }
  },
}
</script>

<style scoped>

</style>