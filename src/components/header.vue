<template>
  <div class="header">
    <div class="menu-select" @click="menuChange">
      <div class="menu-icon clearfix">
        <i v-show="collapse" class="el-icon-s-fold"></i>
        <i v-show="!collapse" class="el-icon-s-unfold"></i>
      </div>
      <div class="menu-title clearfix">菜单选择</div>
    </div>
    <div class="header-right">
        <!--面包屑-->
        <div class="bread-crumb">
          <el-breadcrumb class="color-bread-crumb" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item >活动列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="userInfo">
          <!-- 全屏显示 -->
          <div class="fullScreen" @click="handleFullScreen">
            <el-tooltip effect="dark" :content="fullscreen?'取消全屏':'全屏显示'">
              <i class="el-icon-rank"></i>
            </el-toolTip>
          </div>
          <!-- 消息中心 -->
          <div class="tip">
            <el-tooltip
              effect="dark"
              :content="message?`有${message}条消息`:'消息中心'"
              placement="top"
            >
              <i class="el-icon-message"></i>
            </el-tooltip>
          </div>
          <!-- 用户头像 -->
          <div class="user-avator">
            <img src="../assets/imgs/img.jpg" />
          </div>
          <!-- 用户名下拉菜单 -->
          <div class="user-name">
            <el-dropdown
              size="small"
              trigger="click"
              @command="handleClick"
            >
              <span class="el-dropdown-link">
                  {{username}}
                  <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personalHomePage">个人主页</el-dropdown-item>
                <el-dropdown-item command="setUp">设置</el-dropdown-item>
                <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data () {
    return {
      fullscreen: false,
      message: 1,
    }
  },
  computed:{
    // 获取vuex中的名字
    ...mapState(['username', "collapse"])
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    ...mapMutations({
      isFold: 'isFold'
    }),
    menuChange () {
      // 切换菜单
      this.isFold()
    },
    // 全屏显示
    handleFullScreen () {
      let element = document.documentElement; // 获取需要全屏的元素
      if (this.fullscreen) { // 退出全屏
          if (document.exitFullscreen) { // w3c
              document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) { // Chrom
              document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) { // FireFox
              document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) { // IE
              document.msExitFullscreen();
          }
      } else { // 实现全屏显示
          if (element.requestFullscreen) {
              element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
              // IE11
              element.msRequestFullscreen();
          }
      }
      this.fullscreen = !this.fullscreen;
    },

    // 退出登录
    handleClick (command) {
      // 删除sessionStorage中的数据
      if (command === "loginout") {
        this.$router.replace('/login')
        sessionStorage.clear();
      } else if (command === 'personalHomePage') {
        this.$router.push('/personalHomePage')
      } else if (command === 'setUp') {
        this.$router.push('/setUp')
      }
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    height: 70px;
    font-size: 22px;
    background-color: #242f42;
    color: #fff;
  }
  .header .el-breadcrumb__item >>> .el-breadcrumb__inner
  {
    /*color: #fff !important;*/
    color: #fff;
  }
  /*.header .el-breadcrumb__item >>> .el-breadcrumb__inner .is-link:hover {*/
    /*color: #409EFF !important;*/
  /*}*/
  .menu-select {
    width: 250px;
    cursor: pointer;
    display: flex;
  }
  .menu-icon {
    padding: 0 20px;
    line-height: 70px;
  }
  .menu-title {
    line-height: 70px;
  }
  .header-right {
    width: calc(100% - 250px);
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    line-height: 70px;
  }
  .bread-crumb {
    line-height: 70px;
  }
  .userInfo {
    display: inline-flex;
    align-items: center;
    line-height: 70px;
  }
  .fullScreen,.tip,.user-avator {
    padding: 0 10px;
    cursor: pointer;
  }
  .user-avator {
    border-radius: 50%;
    overflow: hidden;
  }
  .user-name {
    margin-right: 10px;
  }
  .user-avator img{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .header .el-dropdown-link {
    cursor: pointer;
    font-size: 14px;
    color: #fff;
  }
</style>
