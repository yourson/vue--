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
      <el-table-column prop="uid" label="角色uid"></el-table-column>
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
          <el-button type="primary" size="small" @click="lookUp(scope)">
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
    <roleDrawer :drawerData="drawerData" @drawerClose="drawerClose"></roleDrawer>
    <roleAdd :addVisible="addVisible" @roleAddBox="roleAddBox"></roleAdd>
  </div>
</template>

<script>
import roleAdd from './roleAdd'
import roleDrawer from './roleDrawer'
export default {
  name: 'role',
  components: {
    roleAdd,
    roleDrawer
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
      addVisible: false,
      isEnable: false, // switch是否选中和切换
      drawerData: {
        uid: 0,
        drawer: false,
        defaultExpandedKeys: [], // 默认展开
        defaultCheckedKeys: [], // 默认选中
        treeData:  [], // tree数据容器
      }
    }
  },
  created () {
    this.getTableData() // 获取表格数据
  },
  methods: {
    // 查看函数
    async lookUp (scope) {
      this.drawerData.drawer=true
      let res = await this.$http.get('api/getTreeData',{
        params: scope.row.uid
      })
      this.drawerData.uid = scope.row.uid
      let { treeData, auth } = res.data
      this.drawerData.treeData = treeData
      this.drawerData.defaultCheckedKeys = auth
      this.open(this.drawerData.treeData)
    },
    // 默认展开配置函数
    open (data) {
      data.forEach(item => {
        if (item.children) {
          this.drawerData.defaultExpandedKeys.push(item.id)
          this.open(item.children)
        }
      })
    },
    // 关闭drawer抽屉函数
    drawerClose () {
      this.drawerData.drawer = false
    },
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