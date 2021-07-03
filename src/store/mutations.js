const mutations = {
  // 首页名字
  setUserName (state, data) {
    state.username = data
    sessionStorage.setItem("username",JSON.stringify(data))
  },

  // 用户头像
  setUserAvatar (state, data) {
    state.avatar = data
    sessionStorage.setItem("avatar",JSON.stringify(data))
  },

  // 用户权限id -uid
  getUserUid (state, data) {
    state.uid = data
    sessionStorage.setItem("uid",JSON.stringify(data))
  },

  // 权限路由 - 菜单
  getAuthRouter (state, payLoad) {
    state.authRoutes = payLoad
    sessionStorage.setItem("authRoutes",JSON.stringify(payLoad))
  },
  // 菜单折叠
  isFold (state) {
    state.collapse = !state.collapse
    sessionStorage.setItem("collapse", JSON.stringify(state.collapse))
  },

  // 添加tab导航栏
  addTab (state,menus) {
    state.tagList.push({
      path: menus.path,
      title: menus.title
    })
    sessionStorage.setItem("tagList", JSON.stringify(state.tagList))
  },
  // 删除导航栏
  delTab (state, tag) {
    // findIndex：找到相应元素的索引值 - 符合条件的第一个值
    let index = state.tagList.findIndex(item => item.title === tag.title)
    state.tagList.splice(index,1)
    sessionStorage.setItem("tagList", JSON.stringify(state.tagList))
  },
  // 对权限菜单进行改变
  setRightList (state, data) {
    console.log(data)
    state.rightList = data
    /*
    * 刷新界面菜单消失：
    * 存储在vuex中，刷新时变成空数组，所以需要将菜单数据保存在sessionStorage中，
    * 保持sessionStorage数据和vuex数据同步
    * */
    sessionStorage.setItem("rightList",JSON.stringify(data))
  },

  // 关闭其他 ---- 关闭所有
  closeOther (state, data) {
    const curItem = state.tagList.filter(item => {
      return item.path === data
    });
    state.tagList = curItem;
    sessionStorage.setItem("tagList",JSON.stringify(curItem))
  },
  // 关闭所有
  closeAll (state) {
    state.tagList = [];
    sessionStorage.setItem("tagList",JSON.stringify(state.tagList))
  }
}
export default mutations
