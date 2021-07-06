import Mock from 'mockjs';

//const baseURL = 'http://localhost:8080';
// ${baseURL}/api/getLogin?username=admin&password=12345
//登录数据
Mock.mock(RegExp('/api/getLogin' + ".*"), "post", user)
let allData = { // 这是登录模板
  'code': 200,
  'data': [],
  'msg': '登录成功！'
}

// 匹配用户
let allUser = [
  {
    id: '123123',
    uid: '0',
    username: 'admin',
    roles: 'admin',
    password: '123456',
    avatar: 'https://pic2.zhimg.com/da8e974dc_is.jpg',
    token: '12313312adasq3',
    isEnable: true // 是否启用
  },
  {
    id: '212333',
    uid: '1',
    username: '张三',
    roles: '经理',
    password: '123456',
    avatar: 'https://pic2.zhimg.com/da8e974dc_is.jpg',
    token: '123133qecxc123',
    isEnable: true // 是否启用
  },
  {
    id: '345677',
    uid: '2',
    username: '李四',
    roles: '员工',
    password: '123456',
    avatar: 'https://pic2.zhimg.com/da8e974dc_is.jpg',
    token: 'xzc345xcvsdfc',
    isEnable: true // 是否启用
  }
]

function user (options) {
  // 拿到传递的参数
  let params = JSON.parse(options.body)
  // 对输入的用户名进行匹配
  let data = allUser.find(item => {
    return params.username === item.username &&
      params.password === item.password
  })
  // 对用户是否存在进行判断
  if (!data) {
    return {
      "code": 400,
      'data': [],
      "msg": "密码或者用户名错误！"
    }
  } else {
    // 拷贝复制一份防止污染allUser里面的数据
    let newData = JSON.parse(JSON.stringify(data))
    // 返回登录数据不能有密码，这样可以删除对象里面的password
    newData.password = undefined
    allData.data = newData
    return allData
  }
}

let roleData = { // 这是登录模板
  'code': 200,
  'data': {
    total: 0,
    tableData: [],
  },
  'msg': '登录成功！'
}

// roles的api 结合搜索接口
Mock.mock(RegExp('/api/roles' + ".*"), "get", (options) => {
  let par = options.url.split("?")[1].split("&");
  let backParams = {}; // 后台参数
  for (let i = 0;i < par.length; i++) {
    let item = par[i].split("=");
    backParams[item[0]] = decodeURI(item[1]) // 对参数进行解码
  }
  backParams = JSON.parse(backParams.params) // 需要化为对象
  let {query, pageSize, pageNum} = backParams
  let newData = []
  if (query) {
    let filterData = allUser.filter(item => {
      // 注意test的用法 - 字符串检索 很强大
      // RegExp() 里面是输入值 - test是数据库值
      let reg = new RegExp(query)
      return reg.test(item.username)
    })
    newData =filterData.slice(pageSize*pageNum-pageSize,pageSize*pageNum)
    roleData.data.total = newData.length
  } else {
    newData = allUser.slice(pageSize*pageNum-pageSize,pageSize*pageNum)
    roleData.data.total = allUser.length
  }
  roleData.data.tableData = newData;
  return roleData
})

// 是否禁用
Mock.mock(RegExp('/api/isEnable' + ".*"), "post", (options) => {
  const { index, isEnable } = JSON.parse(options.body)
  allUser[index].isEnable = isEnable
})
// 添加人员
Mock.mock(RegExp('/api/addRoles' + ".*"), "post", (options) => {
//  将传进来的isEnable转化为布尔值
  let form = JSON.parse(options.body)
//  console.log(typeof form.isEnable)
  allUser.unshift(form)
})