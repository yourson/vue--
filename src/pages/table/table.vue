<template>
  <div class="baseTable">
    <el-card class="search-card">
      <div slot="header" class="clearfix">
        <span>基础表格</span>
      </div>
      <div class="select-box" @keyup.enter="getTableData">
        <div class="title">
          按照条件搜索：
        </div>
        <el-input
          v-model="queryInfo.query"
          placeholder="用户名"
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
          添加
        </el-button>
      </div>
    </el-card>
    <!--表格-->
    <el-table
      :data="tableData"
      border
      :highlight-current-row="true"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{ textAlign: 'center' }"
      style="width: 100%;">
      <!--:header-cell-style="{textAlign: 'center'}"：表头文字水平居中-->
      <!--:cell-style="{ textAlign: 'center' }"：内容文字水平居中-->
      <el-table-column fixed type="index" label="#">
      </el-table-column>
      <el-table-column prop="num" label="编号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.name"
            v-focus>
          </el-input>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="150">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.date"
            v-if="scope.row.isEdit"
            type="date"
            :editable="false"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <span v-else>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.province">
          </el-input>
          <span v-else>{{ scope.row.province }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.city">
          </el-input>
          <span v-else>{{ scope.row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.address">
          </el-input>
          <span v-else>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.zip">
          </el-input>
          <span v-else>{{ scope.row.zip }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isEdit" @click="editClick(scope)" type="primary" size="small">
            编辑
          </el-button>
          <el-button v-if="!scope.row.isEdit" @click="delClick(scope)" type="danger" size="small">删除</el-button>
          <el-button v-if="scope.row.isEdit" @click="saveEdit(scope)" type="text" size="small">确定</el-button>
          <el-button v-if="scope.row.isEdit" @click="cancelEdit(scope)" type="text" size="small">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <!--
      分页区域：
      background：分页按钮添加背景色。
      :total：表示总条目数
      @size-change：当点击10条/页就会触发这个函数 - 可以拿到各自里面的数据
        --- 和page-sizes相关
      :current-page：当前页数
      @current-change：当点击(currentPage数据)几页触发函数
      :page-size: 当前页数显示多少条数据
      layout: 表示需要显示的内容，用逗号分隔，布局元素会依次显示。
      :pager-count：当总页数超过 10 页时，Pagination 会折叠多余的页码按钮
      -->
      <el-pagination
        background
        :total="total"
        :page-sizes="[10, 20, 30]"
        :current-page="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        layout="total,sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        >
      </el-pagination>
    </div>
    <!--添加弹框组件-->
    <addDiaLogBox :addVisible="addVisible" @addDiaLogBox="addDiaLogBox">
    </addDiaLogBox>
  </div>
</template>

<script>
import addDiaLogBox from './addDiaLogBox'
export default {
  components: {
    addDiaLogBox
  },
  data () {
    return {
      tableData: [], // 默认table数据
      queryInfo: { // 分页的参数
        query: '', // 搜索的参数
        pageNum: 1, // 当前的页数
        pageSize: 10, // 每页显示多少条数据(默认值，动态改变
      },
      total: 0, // 数据条数
      addVisible: false, // 添加框的提示
    }
  },
  // created进行数据初始化  --- mounted进行DOM操作
  created () {
    this.getTableData() // 获取表格数据
  },
  methods: {
    // 获取table数据
    async getTableData () {
      let res = await this.$http.get('/api/baseTable',{params:this.queryInfo})
      const { total, tableData} = res.data
      this.total = total; // 数据条数
      this.tableData = tableData // 获取table数据
    },
    // 拿到10条/页里面的数据 - 赋值给pageSize中，
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getTableData()
    },
    // 当点击几页时触发的函数 - 默认参数
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getTableData()
    },
    // 添加触发函数
    addDiaLogBox (add) {
      this.addVisible = false
      if (add) {
        this.getTableData()
      }
    },
    // 编辑
    editClick (scope) {
      scope.row.isEdit = true
    },
    // 是否保存编辑
    saveEdit (scope) {
      this.$confirm('是否保存编辑修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.post('/api/edit',{
          form: this.tableData[scope.$index], // 第几横排的数据修改了
          index: scope.$index, // 将索引值传递过去
          pageNum: this.queryInfo.pageNum,
          pageSize: this.queryInfo.pageSize
        })
        scope.row.isEdit = false
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    // 取消保存编辑
    cancelEdit (scope) {
      scope.row.isEdit = false
    },
    // 删除
    delClick (data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.post('/api/delTable',{
          index: data.$index, // 将索引值传递过去
          pageNum: this.queryInfo.pageNum,
          pageSize: this.queryInfo.pageSize
        })
        this.getTableData() // 重新获取数据
        this.$message({type: 'success', message: '删除成功!'}); // 删除成功
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  },

}
</script>

<style lang="scss" scoped>
  .baseTable {
    .search-card {
      margin-bottom: 10px;
    }
  }
  .select-box {
    display: flex;
    height: 40px;
    .title {
      line-height: 40px;
      color: lightseagreen;
      font-weight: 400;
    }
    .handle-select {
      width: 120px;
    }
    .handle-input {
      width: 300px;
      display: inline-block;
      margin: 0 10px;
    }
  }
  .baseTable .el-table td, .el-table th {
    padding: 6px 0;
  }

</style>
