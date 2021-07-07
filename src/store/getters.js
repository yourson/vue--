import { formatRouterTree, generateRouter } from '@/utils/formatRouterTree' // 导入路由工具函数

const getters = {
  authRoutes (state, getters) {
    // 形成含有children的数组
    let payLoad = formatRouterTree(state.baseRoutes)
    return generateRouter(payLoad)
  }
}
export default getters
