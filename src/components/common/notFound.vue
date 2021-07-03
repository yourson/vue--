<template>
  <div class="error-page">
    <div class="error-code">
      <span>4</span>
      <span class="middle"></span>
      <span>4</span>
    </div>
    <div class="error-desc">啊哦~ 你所访问的页面不存在</div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large">返回首页</el-button>
      </router-link>
      <el-button
        class="error-btn"
        type="primary"
        size="large"
        @click="goBack"
      >
        返回上一页
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "not-found",
  methods: {
    // 返回上一页
    goBack () {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="scss">
  .error-page{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    box-sizing: border-box;
    .error-code {
      width: 600px;
      display: flex;
      justify-content: space-between;
      align-content: center;
      span {
        display: inline-block;
        width: 200px;
        line-height: 200px;
        font-size: 240px;
        text-align: center;
        font-weight: 800;
      }
      .middle {
        width: 200px;
        height: 200px;
        position: relative;
        &:before,&:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 200px;
          height: 200px;
          /*
          重点：四个内阴影
          inset: 内部阴影
          x 的距离
          y 的距离
          模糊距离。
          颜色
          透明度：66（16进制）
          */
          -webkit-box-shadow:
          /*左侧*/
            inset 30px 0 0 #fd79a866,
          /*上方*/
            inset 0 30px 0 #0984e366,
          /*右侧*/
            inset -30px 0 0 #00b89466,
          /*下方*/
            inset 0 -30px 0 #fdcb6e66;
          -moz-box-shadow:
            inset 30px 0 0 #fd79a866,
            inset 0 30px 0 #0984e366,
            inset -30px 0 0 #00b89466,
            inset 0 -30px 0 #fdcb6e66;
          box-shadow:
            inset 30px 0 0 #fd79a866,
            inset 0 30px 0 #0984e366,
            inset -30px 0 0 #00b89466,
            inset 0 -30px 0 #fdcb6e66;
          -webkit-animation: rot 4s linear infinite;
          -o-animation: rot 4s linear infinite;
          animation: rot 4s linear infinite;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
        &:after {
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
        @keyframes rot {
          0% {
            -webkit-box-shadow:
              /*左侧*/
              inset 30px 0 0 #fd79a866,
                /*上方*/
              inset 0 30px 0 #0984e366,
                /*右侧*/
              inset -30px 0 0 #00b89466,
                /*下方*/
              inset 0 -30px 0 #fdcb6e66;
            -moz-box-shadow:
              inset 30px 0 0 #fd79a866,
              inset 0 30px 0 #0984e366,
              inset -30px 0 0 #00b89466,
              inset 0 -30px 0 #fdcb6e66;
            box-shadow:
              inset 30px 0 0 #fd79a866,
              inset 0 30px 0 #0984e366,
              inset -30px 0 0 #00b89466,
              inset 0 -30px 0 #fdcb6e66;
          }
          25% {
            -webkit-box-shadow:
              inset 30px 0 0 #fdcb6e66,
              inset 0 30px 0 #fd79a866,
              inset -30px 0 0 #0984e366,
              inset 0 -30px 0 #00b89466;
            -moz-box-shadow:
              inset 30px 0 0 #fdcb6e66,
              inset 0 30px 0 #fd79a866,
              inset -30px 0 0 #0984e366,
              inset 0 -30px 0 #00b89466;
            box-shadow:
              inset 30px 0 0 #fdcb6e66,
              inset 0 30px 0 #fd79a866,
              inset -30px 0 0 #0984e366,
              inset 0 -30px 0 #00b89466;
          }
          50% {
            -webkit-box-shadow:
              inset 30px 0 0 #00b89466,
              inset 0 30px 0 #fdcb6e66,
              inset -30px 0 0 #fd79a866,
              inset 0 -30px 0 #0984e366;
            -moz-box-shadow:
              inset 30px 0 0 #00b89466,
              inset 0 30px 0 #fdcb6e66,
              inset -30px 0 0 #fd79a866,
              inset 0 -30px 0 #0984e366;
            box-shadow:
              inset 30px 0 0 #00b89466,
              inset 0 30px 0 #fdcb6e66,
              inset -30px 0 0 #fd79a866,
              inset 0 -30px 0 #0984e366;
          }
          75% {
            -webkit-box-shadow:
              inset 30px 0 0 #0984e366,
              inset 0 30px 0 #00b89466,
              inset -30px 0 0 #fdcb6e66,
              inset 0 -30px 0 #fd79a866;
            -moz-box-shadow:
              inset 30px 0 0 #0984e366,
              inset 0 30px 0 #00b89466,
              inset -30px 0 0 #fdcb6e66,
              inset 0 -30px 0 #fd79a866;
            box-shadow:
              inset 30px 0 0 #0984e366,
              inset 0 30px 0 #00b89466,
              inset -30px 0 0 #fdcb6e66,
              inset 0 -30px 0 #fd79a866;
          }
          100% {
            -webkit-box-shadow:
              /*左侧*/
              inset 30px 0 0 #fd79a866,
                /*上方*/
              inset 0 30px 0 #0984e366,
                /*右侧*/
              inset -30px 0 0 #00b89466,
                /*下方*/
              inset 0 -30px 0 #fdcb6e66;
            -moz-box-shadow:
              inset 30px 0 0 #fd79a866,
              inset 0 30px 0 #0984e366,
              inset -30px 0 0 #00b89466,
              inset 0 -30px 0 #fdcb6e66;
            box-shadow:
              inset 30px 0 0 #fd79a866,
              inset 0 30px 0 #0984e366,
              inset -30px 0 0 #00b89466,
              inset 0 -30px 0 #fdcb6e66;
          }
        }
      }
      /*左侧文字效果：同样分四次将当前文字颜色变换为 左侧内部阴影的颜色*/
      :first-child {
        -webkit-animation: lCol 4s linear infinite;
        -o-animation: lCol 4s linear infinite;
        animation: lCol 4s linear infinite;
      }
      @keyframes lCol {
        0% {
          color: #fd79a8;
        }
        25% {
          color: #fdcb6e;
        }
        50% {
          color: #00b894;
        }
        75% {
          color: #0984e3;
        }
        100% {
          color: #fd79a8;
        }
      }
      /*右侧文字*/
      :nth-child(3) {
        -webkit-animation: rCol 4s linear infinite;
        -o-animation: rCol 4s linear infinite;
        animation: rCol 4s linear infinite;
      }
      @keyframes rCol {
      0% {
        color: #00b894;
        }
      25% {
        color: #0984e3;
        }
      50% {
        color: #fd79a8;
        }
      75% {
        color: #fdcb6e;
        }
      100% {
        color: #00b894;
        }
      }
    }
  }
  .error-desc {
    margin-top: 30px;
  }

  .error-handle{
    margin-top: 30px;
  }
  .error-btn{
    margin-left: 100px;
  }

</style>
