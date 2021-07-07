import {get} from '../utils/ajax' // 导入axios
import { formatRouterTree, generateRouter } from '@/utils/formatRouterTree' // 导入路由工具函数

const actions = {
  // 获取路由数据 - 传递数据uid获得不同权限菜单
  // 第一个参数相当于 store， 第二个参数 = 传递的参数
  async getAuthRouter (context, uid) {
    let res = await get('/api/getMenuData', {uid}) // 获取路由菜单数据
    let payLoad = formatRouterTree(res) // 第一次加工 - 生成含有children的数组
//    console.log(payLoad)
//    let asyncRoutes = generateRouter(payLoad) // 第二次加工 - 生成路由
    context.commit('getAuthRouter', payLoad)
  }
}
export default actions