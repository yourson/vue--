import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//import store from '@/store/store'

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
