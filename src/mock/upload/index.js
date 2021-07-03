import Mock from 'mockjs';

// 返回数据为一个对象： status 1：成功、0：已经存在、-1：上传失败
// 用户上传文件模板案例
let data = [
  {
    id: '',
    name: '' // 文件名
  }
]

Mock.mock(RegExp('/api/upload' + ".*"), "post", (options) => {
  // 解析FormData参数 - fd.get('参数名')
//  let username = options.body.get('username') // 用户名 暂时没什么用
  let id = options.body.get('id') // 用户id
  let file = options.body.get('file')
  // 获取是否覆盖 - 为字符串类型 - 需要转化为字符串类型
  let isCover = options.body.get('isCover')
  let isExist = data.find(item => item.id === id)
  if (isExist) {
    if (isExist.name === file.name){
      isCover = isCover === 'true'
      console.log(typeof isCover)
      if (isCover) {
        // 找到索引值 - 然后替换原来的文件
        let index = data.findIndex(item => item.name === file.name)
        data.splice(index, 1,{id,name: file.name})
        return {
          status: 1, // 代表上传成功
          msg:'上传成功!'
        }
      } else {
        return {
          status: 0, // 代表文件已经存在
          msg: '文件已经存在是否覆盖?'
        }
      }
    } else {
      data.push({id, name: file.name})
      return {
        status: 1, // 代表上传成功
        msg:'上传成功'
      }
    }
  } else {
      data.push({id, name: file.name})
      return {
        status: 1, // 代表上传成功
        msg:'上传成功'
      }
    }
})
