import Mock from 'mockjs';

Mock.mock(RegExp('/api/map'+".*"), "get",dataRull)

// 数据
const data =Mock.mock({
  code: 'OK',
  message: '成功',
  data: [
    {
      name: '黄金用户',
      children: [
        {
          name: '武汉',
          value: [114.31,30.52]
        },
        {
          name: '哈尔滨',
          value: [126.13,45.75]
        }
      ]
    },
    {
      name: '白金用户',
      children: [
        {
          name: '重庆',
          value: [106.45,29.56]
        },
      ]
    },
    {
      name: '钻石用户',
      children: [
        {
          name: '广州',
          value: [113.23,23.16]
        },
      ]
    }
  ]
});

function dataRull() {
  return data
}
