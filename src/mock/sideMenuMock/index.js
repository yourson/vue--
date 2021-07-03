import Mock from 'mockjs';
import users from './user'

let menuData = Mock.mock(RegExp('/api/getMenuData' + ".*"), "get", menu)

const routers = [
  {
    id: '1',
    pid: '0', // 代表一级路由
    path: '/homePage',
    name: 'homePage',
    title: '系统首页',
    icon: 'el-icon-s-home'
  },
  {
    id: '2',
    pid: '0',
    path: '/roles',
    name: 'roles',
    title: '角色控制',
    icon: 'el-icon-s-custom'
  },
  {
    id: '3',
    pid: '0',
    path: '/table',
    name: 'table',
    title: '基础表格',
    icon: 'el-icon-menu'
  },
  {
    id: '4',
    pid: '0',
    path: '/tabs',
    name: 'tabs',
    title: 'tab选项卡',
    icon: 'el-icon-document-copy'
  },
  {
    id: '5',
    pid: '0',
    title: '表单相关',
    icon: 'el-icon-menu'
  },
  {
    id: '6',
    pid: '5',
    path: '/basicForm',
    name: 'basicForm',
    title: '基本表单'
  },
  {
    id: '7',
    pid: '5',
    title: '三级菜单'
  },
  {
    id: '8',
    pid: '7',
    path: '/editor',
    name: 'editor',
    title: '富文本编辑器'
  },
  {
    id: '9',
    pid: '7',
    path: '/markdown',
    name: 'markdown',
    title: 'markdown编辑器'
  },
  {
    id: '10',
    pid: '5',
    path: '/upload',
    name: 'upload',
    title: '文件上传'
  },
  {
    id: '11',
    pid: '0',
    path: '/eCharts',
    name: 'eCharts',
    title: 'eCharts图表',
    icon: 'el-icon-pie-chart'
  },
  {
    id: '12',
    pid: '0',
    title: '拖拽组件',
    icon: 'el-icon-rank'
  },
  {
    id: '13',
    pid: '12',
    name: 'drag',
    path: '/drag',
    title: '拖拽列表',
  },
  {
    id: '14',
    pid: '12',
    name: 'dialog',
    path: '/dialog',
    title: '拖拽弹框',
  },
  {
    id: '15',
    pid: '0',
    name: 'i18n',
    path: '/i18n',
    title: '国际化功能',
    icon: 'el-icon-place'
  },
  {
    id: '16',
    pid: '0',
    title: '错误处理',
    icon: 'el-icon-warning-outline'
  },
  {
    id: '17',
    pid: '16',
    name: 'permission',
    path: '/permission',
    title: '权限测试',
  },
  {
    id: '18',
    pid: '16',
    name: 'notFound',
    path: '/notFound',
    title: '404页面',
  },
  {
    id: '19',
    pid: '0',
    name: 'donate',
    path: '/donate',
    title: '支持作者',
    icon: 'el-icon-help'
  },
]

function menu (options) {
  // 拿到传递的参数
  let par = options.url.split("?")[1].split("=");
  let params = {};
  for (let i = 0;i < par.length; i++) {
    params[par[0]] = decodeURI(par[1]) // 对参数进行解码
  }
  let authRouter = []
  // 拿到用户对应的user角色的对象
  let userInfo = users.filter(item => item.id === params.uid)[0];
  userInfo.auth.map(id => { // 相应角色匹配 菜单 - 路由 信息
    routers.map(router => {
      if (router.id === id) {
        authRouter.push(router)
      }
    })
  })
  return routers // 返回数据
}

export default menuData