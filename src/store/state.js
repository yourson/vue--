const state = {
  roles: '',
  // 用户的名字
  username: JSON.parse(sessionStorage.getItem("username")),
  // 用户的头像
  avatar: JSON.parse(sessionStorage.getItem("avatar")),
  // 用户权限id
  uid: JSON.parse(sessionStorage.getItem("uid")),

  // 菜单切换
  collapse: JSON.parse(sessionStorage.getItem("collapse") || "true"),
  // tags面包屑导航
  tagList: JSON.parse(sessionStorage.getItem("tagList") || '[]'),
  // 在router文件中使用的路由
  authRoutes: JSON.parse(sessionStorage.getItem("authRoutes") || '[]'),
}

export default state
