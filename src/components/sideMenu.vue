<template>
  <div class="side-menu">
    <el-menu
      class="side-el-menu"
      router
      :default-active="this.$route.path"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      :collapse="collapse"
      :unique-opened="true"
    >
    <!-- router：通过路由跳转
    this.$route.path: 绑定路由表
    unique-opened: 是否只保持一个子菜单的展开 -->
      <template v-for="item in sideMenu">
        <!-- 加载没有子菜单的 -->
        <template v-if="!item.children">
          <el-menu-item
            :index="item.path"
            :key="item.id"
            @click=clickMenu(item)
          >
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
        <!-- 加载有子菜单的j -->
        <template v-else>
          <!-- 子菜单项 -->
          <el-submenu
            :index="item.id"
            :key="item.id"
          >
          <!-- 含有子菜单的菜单项名称和图标 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
          <!-- 二级菜单 -->
            <template v-for="subItem in item.children">
              <!-- 三级菜单 -->
              <el-submenu
                v-if="subItem.children"
                :key="subItem.id"
                :index="subItem.id"
              >
                <!-- 三级菜单标题 -->
                <template slot="title">
                  {{subItem.title}}
                </template>
                <!-- 三级菜单各项 -->
                <el-menu-item
                  v-for="(threeItem) in subItem.children"
                  :key="threeItem.id"
                  :index="threeItem.path"
                  @click=clickMenu(threeItem)
                >
                  {{threeItem.title}}
                </el-menu-item>
              </el-submenu>
              <!-- 二级菜单各项 -->
              <el-menu-item
                v-else
                :index="subItem.path"
                :key="subItem.id"
                @click=clickMenu(subItem)
              >
                <template slot="title">
                  {{subItem.title}}
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      sideMenu: [],
      open: false
    }
  },
  computed: {
    ...mapState(['collapse','tagList','authRoutes']),
  },
  created () {
    this.sideMenu = this.authRoutes
  },
  watch: {
    authRoutes () {
      this.sideMenu = this.authRoutes
    }
  },
  methods: {
    ...mapMutations({
      addTab: 'addTab',
      changeTab: 'changeTab'
    }),
    clickMenu (menus) {
      // 如果是空数组，直接添加 --- 右边面包屑导航数组
      if (this.tagList.length === 0) {
        this.addTab(menus)
      } else {
        // 判断点击的tab页面是否存在
        // some: 数组，每一项进行检测，有 - true 无 - false ，剩余元素不会再进行检测
        let isExist = this.tagList.some(item => {
          return item.title === menus.title
        })
        if (isExist) {
          this.$router.push(menus.path)
        } else {
          this.$router.push(menus.path)
          this.addTab(menus)
        }
      }
    }
  },
}
</script>

<style scoped>
.side-menu {
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
/* 隐藏滚动条 */
.side-menu::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
/* 菜单的伸缩和展开css */
.side-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.side-menu > ul {
    height: 100%;
}
</style>
