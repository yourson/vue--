<template>
  <div class="tags" v-if="isShow">
    <!--这是面包屑菜单组件-->
    <ul>
        <li
          class="el-tag"
          v-for="(item,index) in tagList"
          :class="{activeTab: isActive(item.path)}"
          :key="index"
        >
            <router-link :to="item.path" class="tags-li-title">
                {{item.title}}
            </router-link>
            <span @click="handleClose(item)">
              <i class="el-icon-close" :class="{activeIcon: isActive(item.path)}"></i>
            </span>
        </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          <span>标签选项</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['tagList']), // 获取面包屑的数组
    isShow () {
      return this.tagList.length === 0 ? false: true
    },
  },
  methods: {
    ...mapMutations({
      delTab: 'delTab',
      closeOther: "closeOther",
      closeAll: 'closeAll'
    }),
    // 高亮显示
    isActive (path) {
      // this.$route.fullPath: 当前路由 --- 当前路由对应搞高亮
      // includes - 可以检测数组和字符串 - 包含返回true，否则false
      return this.$route.fullPath.includes(path);
    },
    // 关闭单个tag
    handleClose (tag) {
      this.delTab(tag); // 删除点击对应的tab
      // 路由转换到数组的最后一个
      let length = this.tagList.length;
      if (length === 0) {
        this.$router.push({path: '/homePage'})
      } else {
        // 否则返回前一个页面
        this.$router.push(this.tagList[length-1].path)
      }
    },
    // 关闭所有  --- 关闭其他
    handleTags (command) {
      command === 'other' ? this.closeOther(this.$route.fullPath) : this.closeAll()
      if (this.tagList.length === 0) {
        this.$router.push('/homePage')
      }
    },
  }
}
</script>

<style>
.tags {
   position: relative;
  height: 40px;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
}
.el-tag {
  float: left;
  padding: 0 10px 0 12px;
  margin: 5px 2px 5px 2px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
  background-color: #fff;
}
.tags-li-icon {

}
/* 当前显示高亮 */
.activeIcon {
  color: #fff;
}
.activeTab {
  background-color: #409eff;
}
.activeTab a {
  color: #fff;
}
/*关闭选项*/
.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  text-align: center;
  width: 110px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
  z-index: 10;
}
.el-dropdown-menu__item {
  font-size: 12px;
}
</style>
