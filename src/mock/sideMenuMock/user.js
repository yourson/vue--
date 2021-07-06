// 用户权限 - 后端模拟
let users = [
  {
    id: 0, // 对应uid
    name: 'admin',
    auth: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
  },
  {
    id: 1,
    name: '张三',
    auth: [1,2,19]
  },
  {
    id: 2,
    name: '李四',
    auth: [1,2,3,4,5,6,7,8,9,10,19]
  }
]

// tree菜单修改函数
export const changeUser = (uid, changeTreeData) => {
  users.forEach(item => {
    if (item.id === uid) {
      item.auth = changeTreeData
    }
  })
}


export default users