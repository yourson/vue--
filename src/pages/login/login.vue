<template>
  <div class="login">
    <div class="login-title">
      <span>
        欢迎来到后台管理系统
      </span>
    </div>
    <div class="login-location">
      <!-- 账号登录 -->
      <div class="login-location__form">
        <el-form
          ref="login"
          :model="form"
          :rules="rules">
          <!-- prop的作用：验证时候的标识 -->
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="username"
            >
              <i slot="prefix" class="el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                    type='password'
                    v-model="form.password"
                    placeholder="password"
                    @keyup.enter.native="submit"
            >
              <i slot="prefix" class="el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submit"
            >登录</el-button>
            <el-button
              type="primary"
              @click="resetForm('login')"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--扫码登录-->
      <!-- <div v-if="!loginShow" class="login-image">
        <img :src="loginImgeUrl"/>
      </div> -->
      <div class="login-tip">
        <p class="tip">温馨提示：</p>
        <p class="tip">未登录过的新用户，自动注册</p>
        <p class="tip">注册过的用户可凭账号密码登录</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: 'login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      loginShow: false,
      loginImgeUrl: '',
      rules: {
        username: [
          // trigger:blur: 鼠标失去焦点的时候验证
          {required: true, message: '请输入姓名', trigger: blur},
          {validator: this.checkName, trigger: blur},

        ],
        password: [
          {required: true, message: '请输入密码', trigger: blur},
          {validator: this.checkPassword, trigger: blur},

        ],
      }
    }
  },
  mounted () {
    this.userInfo()
  },
  methods: {
    ...mapMutations([
      'setRightList', 'setUserName', 'setUserAvatar', 'getUserUid'
    ]),
    // 数据清空
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    userInfo () {
      const h = this.$createElement;
      this.$notify({
        title: '提示',
        message: h('i', { style: 'color: teal'},
          '目前有三个用户：admin、张三、李四，密码都是：123456！，后台提供密码修改功能'),
        position: 'bottom-left'
      });
    },
    // 用户名自定义验证
    checkName (rule, value, callback) {
      if (value === 'sb') {
        callback('输入名不合适')
      } else {
        callback()
      }
    },
    // 登录 显示
    submit () {
      this.$refs.login.validate(async valid => {
        if (valid) {
          const res = await this.$http.post('/api/getLogin', this.form)
          if (res.code !== 200) return this.$message.error(res.msg);
          // 存储名字
          this.setUserName(res.data.username)
          this.setUserAvatar(res.data.avatar)
          this.getUserUid(res.data.uid)
          // 触发action异步获取权限菜单 - 路由
          this.$store.dispatch('getAuthRouter', res.data.uid)
          // 存储token token有效时间通常是2小时
          sessionStorage.setItem('token', res.data.token)
          this.$message({
            type: 'success',
            message: '登录成功！'
          })
          this.$router.replace({path: '/home'})
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" type="text/css" scoped>
  .login {
    width: 100%;
    height: 100%;
    /*
    radial-gradient:径向渐变
    */
    background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92,
    #1b2947
    );
    background: radial-gradient(220% 105% at top center, #1b2947 10%,
    #75517d 40%, #e96f92 65%
    );
    /*background-attachment 属性设置背景图像是否固定或者随着页面的其余部分滚动*/
    background-attachment: fixed;
    overflow: hidden;
  }

  @keyframes rotate {
    0% {
      /*perspective属性设置镜头到元素平面的距离。所有元素都是放置在z=0的平面上。*/
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0deg);
    }
    100% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
    }
  }

  /*标题*/
  .login-title {
    text-align: center;
  }

  .login-title span {
    position: relative;
    top: 80px;
    left: 0;
    font-size: 60px;
    font-weight: 800;
    color: #333333;
  }

  .login-title span:after {
    content: '欢迎来到后台管理系统';
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    /*文字透明*/
    color: transparent;
    /*linear-gradient：图形渐变 - 从左边到右边依次渐变颜色*/
    background-image: linear-gradient(to right,
    #c23616, #192a56, #00d2d3, yellow,
    #6d214f, #2e86de, #4cd137, #e84118);
    /*background-clip 属性规定背景的绘制区域
    -webkit-background-clip:text;文字的背景即为区块的背景，
    文字之外的区域都将被裁剪掉。 --- 谷歌浏览器的私有属性
    */
    /*背景绘制区域，文字的镂空效果，前提是文字颜色为透明色*/
    -webkit-background-clip: text;
    /*clip-path：使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。
    circle：标识创建了圆形 100px = 直径 0%和50%标识圆形的圆心
    */
    clip-path: circle(60px at 0% 50%);
    /*infinite：表示无限次播放*/
    -webkit-animation: move 5s infinite;
    -o-animation: move 5s infinite;
    animation: move 5s infinite;
  }

  /*圆形移动效果*/
  @keyframes move {
    0% {
      clip-path: circle(60px at 0% 50%);
    }
    50% {
      clip-path: circle(60px at 100% 50%);
    }
    100% {
      clip-path: circle(60px at 0% 50%);
    }
  }

  .login-location {
    width: 420px;
    height: 310px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
  }

  .login-location__form {
    margin-top: 20px;
  }

  .login-tip {
    margin-top: 40px;
  }

  .tip {
    text-align: center;
    color: red;
  }
</style>
