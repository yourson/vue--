// 将得到的菜单数据格式化

function formatRouterTree (data) {
  let parent = data.filter(p => p.pid === '0') // 获取第一层路由
  let children = data.filter(p => p.pid !== '0') // 获取第二层子路由
  dataToTree (parent, children) // 调用
  function dataToTree (parent, children) {
    parent.map(p => {
      children.map((c, index) => {
        // 子pid === 父id 将其加入父的children中
        if (p.id === c.pid)  {
          // 复制一份子
          let _c = JSON.parse(JSON.stringify(children))
          // 将加入父children的删除
          _c.splice(index, 1)
          // 递归 - 父：每一个子 - 子：删除后的子
          dataToTree([c], _c)
          if (p.children) {
            // 父有children，就push进去
            p.children.push(c) // 增加children数组填充
          } else {
            // 将子路由给到父的children中
            p.children = [c]
          }
        }
      })
    })
  }
  return parent
}

// 生成routes的路由工具函数
function generateRouter (userRouter) {
  let newRouters = userRouter.map(r => {
    let routes = {
      path: r.path,
      name: r.name,
      component: () => import(`@/pages/${r.name}/${r.name}`),
      meta: {
        title: r.title,
        icon: r.icon
      }
    }
    // 如果存在子菜单 就继续进行上面的操作
    if (r.children) {
      routes.children = generateRouter(r.children)
    }
    return routes
  })
  return newRouters
}


export { formatRouterTree, generateRouter };