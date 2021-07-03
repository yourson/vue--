<template>
  <div class="role">
    <el-card>
      <div slot="header" class="search-card">
        <span>权限人员管理</span>
      </div>
      <div class="select-box" @keyup.enter="getTableData">
        <div class="title">
          按照条件搜索：
        </div>
        <el-input
          v-model="queryInfo.query"
          placeholder="请输入用户名"
          class="handle-input mr10"
          clearable
          @clear="getTableData">
        </el-input>
        <el-button
          type="primary"
          @click="getTableData">
          搜索
        </el-button>
        <el-button
          style="margin-left:auto;"
          type="primary"
          @click="addVisible = true">
          添加用户
        </el-button>
      </div>
    </el-card>
    <el-table
      :data="tableData"
      border
      :highlight-current-row="true"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{ textAlign: 'center' }"
      style="width: 100%"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="id" label="用户id"></el-table-column>
      <el-table-column prop="id" label="角色uid"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="roles" label="角色"></el-table-column>
      <el-table-column prop="password" label="密码" ></el-table-column>
      <el-table-column label="启用" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isEnable"
            @change="enableChange(scope)"
            >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="头像" ></el-table-column>
      <el-table-column prop="token" label="token值" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="drawer=true">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      :total="total"
      :page-sizes="[2, 4, 10]"
      :current-page="queryInfo.pageNum"
      :page-size="queryInfo.pageSize"
      layout="total,sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!--抽屉-->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
      <span>我来啦!</span>
    </el-drawer>
    <roleAdd :addVisible="addVisible" @roleAddBox="roleAddBox"></roleAdd>
  </div>
</template>

<script>
import roleAdd from './roleAdd'
export default {
  name: 'role',
  components: {
    roleAdd
  },
  data () {
    return {
      queryInfo: { // 分页的参数
        query: '', // 搜索的参数
        pageNum: 1, // 当前的页数
        pageSize: 2, // 每页显示多少条数据(默认值，动态改变
      },
      total: 0,
      tableData: [], // 表格数据
      drawer: false, // 抽屉关闭与打开标识
      addVisible: false,
      isEnable: false,
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    async getTableData () {
      let res = await this.$http.get('/api/roles',{params:this.queryInfo})
      const { total, tableData} = res.data
      this.total = total; // 数据条数
      this.tableData = tableData // 获取table数据

    },
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getTableData()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getTableData()
    },
    async enableChange (scope) {
      await this.$http.post('/api/isEnable',{
        index: scope.$index,
        isEnable: scope.row.isEnable
      })
//      this.getTableData() // 好像不用重新获取数据了
    },
    roleAddBox (addOk) {
      this.addVisible = false
      if (addOk) {
        this.getTableData()
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .role {
    .search-card {
      margin-bottom: 10px;
    }
    .select-box {
      display: flex;
      height: 40px;
      .title {
        line-height: 40px;
        color: lightseagreen;
        font-weight: 400;
      }
      .handle-input {
        width: 300px;
        display: inline-block;
        margin: 0 10px;
      }
    }
  }

</style>