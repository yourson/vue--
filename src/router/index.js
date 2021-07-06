import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//import store from '@/store/store'

const routers = [
  {
    id: 1,
    pid: 0, // 代表一级路由
    path: '/homePage',
    name: 'homePage',
    title: '系统首页',
    icon: 'el-icon-s-home',
    disabled: true
  },
  {
    id: 2,
    pid: 0,
    path: '/roles',
    name: 'roles',
    title: '角色控制',
    icon: 'el-icon-s-custom',
    disabled: false
  },
  {
    id: 3,
    pid: 0,
    path: '/table',
    name: 'table',
    title: '基础表格',
    icon: 'el-icon-menu',
    disabled: false
  },
  {
    id: 4,
    pid: 0,
    path: '/tabs',
    name: 'tabs',
    title: 'tab选项卡',
    icon: 'el-icon-document-copy',
    disabled: false
  },
  {
    id: 5,
    pid: 0,
    title: '表单相关',
    icon: 'el-icon-menu',
    disabled: false
  },
  {
    id: 6,
    pid: 5,
    path: '/basicForm',
    name: 'basicForm',
    title: '基本表单',
    disabled: false
  },
  {
    id: 7,
    pid: 5,
    title: '三级菜单',
    disabled: false
  },
  {
    id: 8,
    pid: 7,
    path: '/editor',
    name: 'editor',
    title: '富文本编辑器',
    disabled: false
  },
  {
    id: 9,
    pid: 7,
    path: '/markdown',
    name: 'markdown',
    title: 'markdown编辑器',
    disabled: false
  },
  {
    id: 10,
    pid: 5,
    path: '/upload',
    name: 'upload',
    title: '文件上传',
    disabled: false
  },
  {
    id: 11,
    pid: 0,
    path: '/eCharts',
    name: 'eCharts',
    title: 'eCharts图表',
    icon: 'el-icon-pie-chart',
    disabled: false
  },
  {
    id: 12,
    pid: 0,
    title: '拖拽组件',
    icon: 'el-icon-rank',
    disabled: false
  },
  {
    id: 13,
    pid: 12,
    name: 'drag',
    path: '/drag',
    title: '拖拽列表',
    disabled: false
  },
  {
    id: 14,
    pid: 12,
    name: 'dialog',
    path: '/dialog',
    title: '拖拽弹框',
    disabled: false
  },
  {
    id: 15,
    pid: 0,
    name: 'i18n',
    path: '/i18n',
    title: '国际化功能',
    icon: 'el-icon-place',
    disabled: false
  },
  {
    id: 16,
    pid: 0,
    title: '错误处理',
    icon: 'el-icon-warning-outline',
    disabled: false
  },
  {
    id: 17,
    pid: 16,
    name: 'permission',
    path: '/permission',
    title: '权限测试',
    disabled: false
  },
  {
    id: 18,
    pid: 16,
    name: 'notFound',
    path: '/notFound',
    title: '404页面',
    disabled: false
  },
  {
    id: 19,
    pid: 0,
    name: 'donate',
    path: '/donate',
    title: '支持作者',
    icon: 'el-icon-help',
    disabled: false
  },
]

// 引入组件 - 必须写法
const login = () => import('@/pages/login/login')
const home = () => import('@/pages/home/home')
const homePage = () => import('@/pages/homePage/homePage')
const role = () => import('@/pages/role/role')
const tabs = () => import('@/pages/tabs/tabs')
const table = () => import('@/pages/table/table')
const basicForm = () => import('@/pages/form/basicForm')
const quillEditor = () => import('@/pages/form/quillEditor')
const upload = () => import('@/pages/form/upload')

const personalHomePage = () => import('@/components/personalHomePage')
const setUp = () => import('@/components/setUp')

const eCharts = () => import('@/pages/eCharts/index')
const notFound = () => import("@/components/common/notFound")

// 设置不需要权限的菜单
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '*',
    name: 'notFound',
    component: notFound
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    redirect: '/homePage',
    children: [ // 后面的异步路由选择
      {
        path: '/personalHomePage',
        name: 'personalHomePage',
        component: personalHomePage
      },
      {
        path: '/setUp',
        name: 'setUp',
        component: setUp
      },
      {
        path: '/homePage',
        name: 'homePage',
        component: homePage,
      },
      {
        path: '/roles',
        name: 'roles',
        component: role,
      },
      {
        path: '/tabs',
        name: 'tabs',
        component: tabs,
      },
      {
        path: '/table',
        name: 'table',
        component: table,
      },
      {
        path: '/basicForm',
        name: 'basicForm',
        component: basicForm,
      },
      {
        path: '/editor',
        name: 'editor',
        component: quillEditor,
      },
      {
        path: '/upload',
        name: 'upload',
        component: upload
      },
      {
        path: '/eCharts',
        name: 'eCharts',
        component: eCharts,
      },
    ]
  }
]



let newData = []

function aaa (data) {
  newData = routers.filter(a => {
    data.forEach(b => {
      if (b.children) {
        aaa(b.children)
      }
      return a.name === b.name
    })
  })
}
aaa(routes)

console.log(newData)

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL, //
  routes: routes
});

// 根据token对是否登录做权限
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next()
  } else {
    const token = sessionStorage.getItem('token');
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router;
