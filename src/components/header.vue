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
      <div class="header-user-con">
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
            class="user-name"
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
    position: relative;
    width: 100%;
    height: 70px;
    font-size: 22px;
    background-color: #242f42;
    color: #fff;
  }
  .menu-select {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }
  .menu-icon {
    float: left;
    padding: 0 20px;
    line-height: 70px;
  }
  .menu-title {
    float: left;
    line-height: 70px;
  }
  .header-right {
    float: right;
    padding-right: 50px;
  }
  .header-user-con {
    display: flex;
    align-items: center;
    line-height: 70px;
  }
  .fullScreen,.tip,.user-avator {
    /* float: left; */
    padding: 0 10px;
    cursor: pointer;
  }
  .user-avator {
    border-radius: 50%;
    overflow: hidden;
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
