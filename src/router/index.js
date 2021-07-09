import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import store from '@/store/store'

// 引入组件 - 必须写法
const login = () => import('@/pages/login/login')
const home = () => import('@/pages/home/home')
const homePage = () => import('@/pages/homePage/homePage')
const role = () => import('@/pages/role/role')
const tabs = () => import('@/pages/tabs/tabs')
const table = () => import('@/pages/table/table')

const formRelated = () => import('@/pages/form/formRelated')
const threeLevelMenu = () => import('@/pages/form/threeLevelMenu')
const basicForm = () => import('@/pages/form/basicForm')
const quillEditor = () => import('@/pages/form/quillEditor')
const upload = () => import('@/pages/form/upload')

const drag = () => import('@/pages/drag')
//const dragList = () => import('@/pages/drag/dragList')
const dragListTable = () => import('@/pages/drag/dragListTable')

//const dragTable = () => import('@/pages/drag/dragTable')

const dragDialog = () => import('@/pages/drag/dragDialog')

const personalHomePage = () => import('@/components/personalHomePage')
const setUp = () => import('@/components/setUp')

const eCharts = () => import('@/pages/eCharts/index')
const notFound = () => import("@/components/common/notFound")
const authorC = () => import("@/pages/authorC/authorC")


// 设置不需要权限的菜单
let routes = [
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
        component: setUp,
        meta: {
          icon: '',
          title: ''
        }
      },

    ]
  }
]

// 异步路由 - 需要权限验证的路由列表
let asyncRouter = [
  {
    path: '/homePage',
    name: 'homePage',
    component: homePage,
    meta: {
      icon: 'el-icon-s-home',
      title: '系统首页'
    }
  },
  {
    path: '/roles',
    name: 'roles',
    component: role,
    meta: {
      icon: 'el-icon-s-custom',
      title: '角色控制'
    }
  },
  {
    path: '/table',
    name: 'table',
    component: table,
    meta: {
      icon: 'el-icon-menu',
      title: '基础表格'
    }
  },
  {
    path: '/tabs',
    name: 'tabs',
    component: tabs,
    meta: {
      icon: 'el-icon-document-copy',
      title: 'tab选项卡'
    }
  },
  {
    path: '/formRelated',
    name: 'formRelated',
    component: formRelated,
//    redirect: '/basicForm',
    meta: {
      icon: 'el-icon-menu',
      title: '表单相关'
    },
    children: [
      {
        path: '/basicForm',
        name: 'basicForm',
        component: basicForm,
        meta: {
          title: '基本表单'
        }
      },
      {
        path: '/threeLevelMenu',
        name: 'threeLevelMenu',
//        redirect: '/editor',
        component: threeLevelMenu,
        meta: {
          title: '三级菜单'
        },
        children: [
          {
            path: '/editor',
            name: 'editor',
            component: quillEditor,
            meta: {
              title: '富文本编辑器'
            }
          },
        ]
      },
      {
        path: '/upload',
        name: 'upload',
        component: upload,
        meta: {
          title: '文件上传'
        }
      },
    ]
  },
  {
    path: '/eCharts',
    name: 'eCharts',
    component: eCharts,
    meta: {
      icon: 'el-icon-pie-chart',
      title: 'eCharts图表'
    }
  },
  {
    path: '/drag',
    name: 'drag',
    component: drag,
    meta: {
      icon: 'el-icon-rank',
      title: '拖拽组件'
    },
    children: [
      {
        path: '/dragListTable',
        name: 'dragListTable',
        component: dragListTable,
        meta: {
          title: '拖拽列表和表格'
        },
      },
      {
        path: '/dragDialog',
        name: 'dragDialog',
        component: dragDialog,
        meta: {
          title: '拖拽弹框'
        }
      },
    ]
  },
  {
    path: '/authorC',
    name: 'authorC',
    component: authorC,
    meta: {
      icon: 'el-icon-help',
      title: '支持作者'
    }
  }
]
//console.log(store.state.authRoutes)
// 将后台返回路由与前台路由做对比 - 利用回调函数
function aaa (userRoutes, allRoutes) {
  let newData = []
  userRoutes.forEach(a => {
    allRoutes.forEach(b => {
      if (b.meta.title === a.title) {
        if (a.children && a.children.length > 0) {
          b.children = aaa(a.children, b.children)
        }
        newData.push(b)
      }
    })
  })
  return newData
}
//console.log(store.state.authRoutes)

if (store.state.authRoutes) {
  let realRouter = aaa(store.state.authRoutes,asyncRouter)
  // 将筛选出来的异步路由添加到默认路由中
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].name === 'home') {
      routes[i].children = routes[i].children.concat(realRouter)
    }
  }
}

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
