import Mock from 'mockjs';
import users,{changeUser} from './user' // 导入用户信息
import { formatRouterTree } from '@/utils/formatRouterTree' // 导入路由工具函数

Mock.mock(RegExp('/api/getMenuData' + ".*"), "get", menu)

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
    name: 'dragListTable',
    path: '/dragListTable',
    title: '拖拽列表和表格',
    disabled: false
  },
  {
    id: 14,
    pid: 12,
    name: 'dragDialog',
    path: '/dragDialog',
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
    name: 'authorC',
    path: '/authorC',
    title: '支持作者',
    icon: 'el-icon-help',
    disabled: false
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

  let userInfo = users.find(item => item.id === parseInt(params.uid));
  if (userInfo) {
    userInfo.auth.forEach(id => { // 相应角色匹配 菜单 - 路由 信息
      routers.forEach(router => {
        if (router.id === id) {
          authRouter.push(router)
        }
      })
    })
    return authRouter // 返回数据
  } else {
    return authRouter // 有问题存在优化
  }
}
// 树状菜单返回api数据
let allTreeData = {
  status: 200,
  data: {
    treeData: [],
    auth: []
  },
  msg: '成功！'
}

// tree树形菜单api
Mock.mock(RegExp('/api/getTreeData' + ".*"), "get", (options) => {
  let par = options.url.split("?")[1].split("=");
  let params = {};
  for (let i = 0;i < par.length; i++) {
    params[par[0]] = decodeURI(par[1]) // 对参数进行解码
  }
  // 将所有菜单转化为需要的对象 - 形成整棵tree
  let data = routers.map(item => {
    return {
      id: item.id,
      pid: item.pid,
      disabled: item.disabled,
      label: item.title
    }
  })
  allTreeData.data.treeData = formatRouterTree(data)
  let userInfo = users.find(item => item.id === parseInt(params.params));
  allTreeData.data.auth = userInfo.auth
  return allTreeData
})

Mock.mock(RegExp('/api/changeTreeData' + ".*"), "post", (options) => {
  let { uid, changeTreeData } = JSON.parse(options.body)
  console.log(uid)
  changeUser(parseInt(uid), changeTreeData) // 修改user文件的auth
})
