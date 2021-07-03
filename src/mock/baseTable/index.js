/*
* 这是表格模拟数据
* */
import Mock from 'mockjs';

// 获取table数据api + 搜索的api
Mock.mock(RegExp('/api/baseTable' + ".*"),'get',defaultData);
// 模拟table列表数据
let data = Mock.mock({
  'list|40': [{
    'num': '@id',
    'date': '@date("yyyy-MM-dd")',
    'name': '@cname',
    'province': '@province',
    'city': '@city',
    'address': '上海市普陀区金沙江路 1518弄',
    'zip': 200333,
    'isEdit': false
  }]
})
let allData = {
  state: 200,
  data: {
    total: 0,
    tableData: data,
  },
  msg: '成功'
};
function defaultData(options) {
  // 拿到传递的参数
  let par = options.url.split("?")[1].split("&");
  let backParams = {}; // 后台参数
  for (let i = 0;i < par.length; i++) {
    let item = par[i].split("=");
    backParams[item[0]] = decodeURI(item[1]) // 对参数进行解码
  }
  backParams = JSON.parse(backParams.params) // 需要花为对象
//  { // 分页的参数
  //  query: 搜索的参数（可选择）
//    pageNum: 1, // 当前的页数
//    pageSize: 10, // 每页显示多少条数据(默认值，动态改变)
//  }
  let {query, pageSize, pageNum} = backParams
  // slice: 返回指定的数据 - 返回一个新数组，不会破坏原数组
  let newData = []
  if (query) {
    let filterData = data.list.filter(item => {
      // 注意test的用法 - 字符串检索 很强大
      // RegExp() 里面是输入值 - test是数据库值
      let reg = new RegExp(query)
      return reg.test(item.name)
    })
    newData =filterData.slice(pageSize*pageNum-pageSize,pageSize*pageNum)
    allData.data.total = newData.length
  } else {
    newData = data.list.slice(pageSize*pageNum-pageSize,pageSize*pageNum)
    allData.data.total = data.list.length
  }
  allData.data.tableData = newData
  return allData
}

// 删除api
Mock.mock(RegExp('/api/delTable' + ".*"), 'post',delData);
function delData(options) {
  // 传递 索引值和第几页
  const { index, pageNum, pageSize } = JSON.parse(options.body)
  // splice 会修改原数组
  data.list.splice(pageNum*pageSize-pageSize+index,1) // 删除指定项
  let newData = data.list.slice(pageSize*pageNum-pageSize,pageSize*pageNum)
  allData.data.tableData = newData
  allData.data.total = data.list.length
}

// 添加api
Mock.mock(RegExp('/api/addTable' + ".*"), 'post',addData);
function addData(options) {
//  console.log(options)
  let { form } = JSON.parse(options.body)
  form.isEdit = false
  data.list.unshift(form) // 添加到table数据第一项
}

// 编辑api
Mock.mock(RegExp('/api/edit' + ".*"), 'post',(options) => {
  let { form, index, pageNum, pageSize } = JSON.parse(options.body)
//  修改被修改的数据
  data.list[pageNum*pageSize-pageSize+index] = form
});



